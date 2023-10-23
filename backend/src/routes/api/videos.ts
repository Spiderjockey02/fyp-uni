import { Router } from 'express';
import { fetchVideos, fetchVideoById, fetchVideoCount } from '../../database/Video';
const router = Router();

export function run() {
	router.get('/', async (req, res) => {
		const page = req.query.page;

		// Fetch all videos from database
		try {
			const [videos, total] = await Promise.all([fetchVideos({ page: Number.isInteger(page) ? Number(page) : 0 }), fetchVideoCount()]);
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

	return router;
}
