import type { Request } from 'express';
import { decode } from 'next-auth/jwt';
import type { JWT } from 'next-auth/jwt';
type LabelEnum = { [key: string]: JWT }
const sessionStore: LabelEnum = {};

/**
	* Get the requestee's session
	* @param {string} req The Request
	* @returns The session if there is one
*/
export async function getSession(req: Request): Promise<JWT | null> {
	if (req.headers.cookie == undefined) return null;

	// get Session token from cookies
	const cookies: string[] = req.headers['cookie'].split('; ');
	const parsedcookies = cookies.map((i: string) => i.split('='));

	// Get session token (Could be secure or not so check both)
	const sessionToken = parsedcookies.find(i => ['__Secure-next-auth.session-token', 'next-auth.session-token'].includes(i[0]))?.[1];
	if (!sessionToken) return null;

	const session = await decode({ token: sessionToken, secret: process.env.NEXTAUTH_SECRET as string });
	if (session == null) return null;
	sessionStore[sessionToken] = session;
	return session;
}
