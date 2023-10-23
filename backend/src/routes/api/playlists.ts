import { Router } from 'express';
import { fetchPlaylists, fetchPlaylistById, fetchPlaylistCount } from '../../database/Playlist';

const router = Router();

export function run() {
	router.get('/', async (req, res) => {
		const page = req.query.page;

		// Fetch playlists from database
		try {
			const [playlists, total] = await Promise.all([fetchPlaylists({ page: Number.isInteger(page) ? Number(page) : 0 }), fetchPlaylistCount()]);
			res.json({ playlists, total });
		} catch (err) {
			console.log(err);
			res.json({ playlists: [], total: 0 });
		}
	});

	router.get('/:id', async (req, res) => {
		const id = req.params.id;
		if (isNaN(parseInt(id))) return res.json({ error: 'id must be a number' });

		// Fetch playlist by ID
		try {
			const playlist = await fetchPlaylistById({ id: parseInt(id) });
			res.json(playlist == null ? { error: `Playlist: ${id} does not exist.` } : playlist);
		} catch (err) {
			console.log(err);
			res.json({});
		}
	});

	return router;
}
