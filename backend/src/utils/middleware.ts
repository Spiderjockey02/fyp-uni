import type { Request, Response, NextFunction } from 'express';
import { getSession } from '../utils';

/**
	* Check if a user is logged in and is an influencer
	* @param {Request} req endpoint the user is trying to access
	* @param {Response} res endpoint the user is trying to access
	* @param {NextFunction} next endpoint the user is trying to access
	* @returns Whether or not the requestee is an influencer
*/
export async function isInfluencer(req: Request, res: Response, next: NextFunction) {
	// Check if user is logged in and is admin
	const ses = await getSession(req);
	if (ses?.user.role == 'INFLUENCER') return next();

	// If not they are logged in or an admin
	return res.status(403).json({ error: 'You do not have permission' });
}

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
	const ses = await getSession(req);
	if (ses?.user != undefined) return next();

	// Requestee is not logged into any account
	res.status(403).json({ error: 'You do not have permission.' });
}
