require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "images.pexels.com"],
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.SERVER_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;