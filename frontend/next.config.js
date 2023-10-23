/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		dangerouslyAllowSVG: true,
		domains: ['placehold.co'],
	},
	rewrites: async () => {
		return [
			{
				source: '/api/:path((?!auth).*)',
				destination: 'http://localhost:8080/api/:path*',
			},
		];
	},
	async headers() {
		return [
			{
				source: '/((?!api).*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key:'Referrer-Policy',
						value: 'origin',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
