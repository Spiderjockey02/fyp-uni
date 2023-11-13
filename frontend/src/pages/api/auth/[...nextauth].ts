import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AuthOptions } from 'next-auth';
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

				console.log(data);
				return (data.error) ? null : data.user;
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (typeof user !== typeof undefined) token.user = user;
			return token;
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
