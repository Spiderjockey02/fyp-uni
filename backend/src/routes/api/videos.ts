import { Router } from 'express';
import { fetchVideos, fetchVideoById, fetchVideoCount, createVideo } from '../../database/Video';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { isInfluencer } from '../../utils/middleware';
import { getSession } from '../../utils';
import type { JWT } from 'next-auth/jwt';
import { spawn } from 'child_process';
const router = Router();

export function run() {
	router.get('/', async (req, res) => {
		const page = req.query.page;

		// Fetch all videos from database
		try {
			const [videos, total] = await Promise.all([fetchVideos({ page: Number.isInteger(page) ? Number(page) : 0, includeOwner: true }), fetchVideoCount()]);
			res.json({ videos, total });
		} catch (err) {
			console.log(err);
			res.json({ videos: [], total: 0 });
		}
	});

	router.get('/:id', async (req, res) => {
		// Get ID and validate
		const id = req.params.id;
		if (Number.isInteger(id)) return res.json({ error: 'Parameter: id must be a number.' });

		try {
			const video = await fetchVideoById({ id: parseInt(id) });
			res.json({ video });
		} catch (err) {
			console.log(err);
			res.json({ video: {} });
		}
	});

	router.post('/upload', isInfluencer, async (req, res) => {
		const { user } = await getSession(req) as JWT;

		const form = new IncomingForm({
			multiples: false,
			allowEmptyFiles: false,
			uploadDir: `${process.cwd()}/uploads/temps`,
			maxFileSize: 1024 * 1024 * 1024,
			filter: function({ mimetype }) {
				// Make sure I only keep videos
				return mimetype?.includes('video') ?? false;
			},
		});

		// File has been uploaded (create folders if neccessary)
		form.on('file', async function(_, file) {
			// First DOUBLE CHECK it's a video file
			if (file.mimetype && file.mimetype.split('/')[0] !== 'video') {
				return res
					.status(400)
					.json({ error: 'Not a video' });
			}

			// create user folder (if user has uploaded for first time)
			if (!fs.existsSync(`${process.cwd()}/uploads/${user.id}`)) await fs.mkdirSync(`${process.cwd()}/uploads/${user.id}`, { recursive: true });

			// Create entry on database for video
			const video = await createVideo({
				title: file.originalFilename ?? 'Untitled',
				userId: user.id,
				playlistId: 1,
			});

			const args = [
				'-i', file.filepath,
				'-c:v', 'libvpx',
				'-crf', '10',
				'-b:v', '1M',
				'-c:a', 'libvorbis',
				'-cpu-used', '-5',
				'-deadline', 'realtime',
				`${process.cwd()}/uploads/${user.id}/${video.id}.webm`,
			];

			const proc = spawn('ffmpeg', args);

			proc.stdout.on('data', function(data) {
				console.log(data);
			});

			proc.stderr.setEncoding('utf8');
			proc.stderr.on('data', function(data) {
				console.log(data);
			});

			proc.on('close', function() {
				// create thumbnail
				spawn('ffmpeg', ['-i', `${process.cwd()}/uploads/${user.id}/${video.id}.webm`, '-ss', '00:00:01.000', '-vframes', '1', `${process.cwd()}/uploads/${user.id}/${video.id}.png`]);
			});
		});

		// log any errors that occur
		form.once('error', function(err) {
			console.log(err);
			res.redirect('/upload?error=Error occured');
		});

		// parse the incoming request containing the form data
		form.parse(req);
	});

	return router;
}
