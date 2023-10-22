import { Router } from 'express';
import { getAllPlaylists } from '../../database/Playlist';

const router = Router();

export function run() {
	router.get('/', async (_req, res) => {
		// Fetch all videos from database
		try {
			const playlists = await getAllPlaylists();
			res.json({ playlists });
		} catch (err) {
			console.log(err);
			res.json({ playlists: [] });
		}
	});

	return router;
}
