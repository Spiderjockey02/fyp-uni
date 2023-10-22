import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { Logger as LogClass } from './utils';
const app = express();
const Logger = new LogClass();

(async () => {
	app
		.use(async (req: Request, res: Response, next: NextFunction) => {
		// Handle custom rate limits
			const newReq = req as Request & {
				_startTime: number
				_endTime: number
			};
			const newRes = res as Response & {
				_startTime: number
				_endTime: number
			};

			// Add time to request
			newReq._startTime = new Date().getTime();
			newReq._endTime = 0;

			// Add time to response
			newRes._startTime = new Date().getTime();
			newRes._endTime = 0;

			// Run logger
			Logger.connection(newReq, newRes);

			// Display actualy response
			next();
		})
		.use('/api/videos', (await import('./routes/api/videos')).run())
		.use('/api/playlists', (await import('./routes/api/playlists')).run())
		.listen(8080, () => console.log('Started on port: 8080'));
})();
