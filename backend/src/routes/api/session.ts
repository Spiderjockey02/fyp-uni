import { Router } from 'express';
import { createUser, fetchUserByEmail } from '../../database/User';
import * as bcrypt from 'bcrypt';
const router = Router();

export function run() {
	router.get('/', async (_req, res) => {
		res.json({ error: 'coming soon' });
	});

	// When user logins
	router.post('/signIn', async (req, res) => {
		const { email, password } = req.body;

		// Validate inputs
		if (!email || email.length == 0) return res.json({ error: 'email is missing in request.' });
		if (!password || password.length == 0) return res.json({ error: 'password is missing in request.' });

		try {
			// Check if email is correct
			const user = await fetchUserByEmail(email);
			if (user == null) return res.json({ error: 'Email is incorrect' });

			// Check password
			const isPasswordCorrect = await bcrypt.compare(password, user.password);
			if (!isPasswordCorrect) return res.json({ error: 'Password is incorrect' });

			res.json({ user });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when signing in' });
		}
	});

	// When user registers an account
	router.post('/register', async (req, res) => {
		const { firstName, lastName, password, email } = req.body;

		// Validate inputs
		if (!firstName || firstName.length == 0) return res.json({ error: 'firstName is missing in request.' });
		if (!lastName || lastName.length == 0) return res.json({ error: 'lastName is missing in request.' });
		if (!email || email.length == 0) return res.json({ error: 'email is missing in request.' });
		if (!password || password.length == 0) return res.json({ error: 'password is missing in request.' });

		// Validate password (lowercase, uppercase, number and min 8 characters)
		if (password.length < 8) return res.json({ error: 'Password must be atleast 8 characters.' });
		if (!password.match(/[0-9]/g)) return res.json({ error: 'Password must contain a number.' });
		if (!password.match(/[A-Z]/g)) return res.json({ error: 'Password must contain a capital letter.' });
		if (!password.match(/[a-z]/g)) return res.json({ error: 'Password must contain a lower case letter.' });

		try {
			// Check if email is already being used
			const possibleUser = await fetchUserByEmail(email);
			if (possibleUser != null) return res.json({ error: { type: 'email', message: 'Email is already in use' } });

			// Hash password
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(password, salt);

			// Create user
			const user = await createUser({
				firstName: firstName,
				lastName: lastName,
				password: hashedPassword,
				email: email,
			});
			res.json({ user });
		} catch (err) {
			console.log(err);
			res.json({ error: 'An error occured when registering account.' });
		}
	});

	return router;
}
