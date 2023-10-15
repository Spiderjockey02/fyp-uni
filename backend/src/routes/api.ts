import { Router } from 'express';
import { getVideos } from '../database/Video';
const router = Router();

export function run() {
	router.get('/videos', async (_req, res) => {
		// Fetch all videos from database
		try {
			const videos = await getVideos();
			res.json({ videos });
		} catch (err) {
			console.log(err);
			res.json({ videos: [] });
		}
	});

	return router;
}