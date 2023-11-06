import { Router } from 'express';
import { fetchUsers } from '../../database/User';
const router = Router();

export function run() {
	router.get('/', async (req, res) => {
		const page = req.query.page;

		// Fetch users from database
		try {
			const users = await fetchUsers({ page: Number.isInteger(page) ? Number(page) : 0 });
			res.json({ users });
		} catch (err) {
			console.log(err);
			res.json({ users: [] });
		}
	});

	return router;
}
