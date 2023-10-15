/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
		return [
			{
				source: '/api/:path((?!auth).*)',
				destination: `http://localhost:8080/api/:path*`,
			},
		];
	},
}

module.exports = nextConfig
