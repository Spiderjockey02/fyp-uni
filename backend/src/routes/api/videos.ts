import { Router } from 'express';
import { getAllVideos, getVideoById } from '../../database/Video';
const router = Router();

export function run() {
	router.get('/:id/comments', (_req, res) => {
		res.json({ error: 'coming soon' });
	});

	// Return all videos
	router.get('/all', async (_req, res) => {
		// Fetch all videos from database
		try {
			const videos = await getAllVideos();
			res.json({ videos });
		} catch (err) {
			console.log(err);
			res.json({ videos: [] });
		}
	});

	router.get('/:id', async (req, res) => {
		// Get ID and validate
		const id = req.params.id;
		if (Number.isInteger(id)) return res.json({ error: 'Parameter: id must be a number.' });

		try {
			const video = await getVideoById(parseInt(id));
			res.json({ video });
		} catch (err: any) {
			console.log(err);
			res.json({ error: err.message });
		}

	});

	return router;
}