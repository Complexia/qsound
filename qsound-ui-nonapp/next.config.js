/** @type {import('next').NextConfig} */

require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "images.pexels.com",
      "media.istockphoto.com",
      "encrypted-tbn0.gstatic.com",
      "news.artnet.com",
    ],
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



