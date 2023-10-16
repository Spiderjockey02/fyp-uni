import { Router } from 'express';
import { getAllUsers } from '../../database/User';

const router = Router();

export function run() {
	router.get('/', async (_req, res) => {
		// Fetch all videos from database
		try {
			const users = await getAllUsers();
			res.json({ users });
		} catch (err) {
			console.log(err);
			res.json({ users: [] });
		}
	});

	return router;
}