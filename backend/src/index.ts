import express from 'express';
const app = express();

app
	.use('/api/test', (_req, res) => {
		res.json({ success: 'Successfully responded' });
	})
	.listen(8080, () => console.log('Started on port: 8080'));
