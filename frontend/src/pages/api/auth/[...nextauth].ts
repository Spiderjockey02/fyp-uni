import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AuthOptions } from 'next-auth';
import { encode } from 'next-auth/jwt';
import axios from 'axios';

export const authOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const { data } = await axios.post(`${process.env.BACKENDURL}/api/session/signIn`, {
					password: credentials.password,
					email: credentials.email,
				});
				if (data.error) throw new Error(data.error);
				return data.user;
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user !== undefined) token.user = user;
			return token;
		},
		async session({ session, token }) {
			if (token.user !== null) {
				const { data } = await axios.get(`${process.env.BACKENDURL}/api/session/${token.sub}`, {
					headers: {
						'content-type': 'application/json;charset=UTF-8',
						cookie: `next-auth.session-token=${await encode({ token, secret: process.env.NEXTAUTH_SECRET as string })};`,
					},
				});
				if (data.user) session.user = data.user;
			}
			return session;
		},
		redirect: ({ url, baseUrl }) => {
			return url.startsWith(baseUrl) ? Promise.resolve(url)	: Promise.resolve(baseUrl);
		},
	},
	pages: {
		signIn: '/login',
	},
} as AuthOptions;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, authOptions);
}
