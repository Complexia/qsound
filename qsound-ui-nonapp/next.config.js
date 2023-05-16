/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "images.pexels.com",
      "media.istockphoto.com",
      "encrypted-tbn0.gstatic.com",
      "news.artnet.com",
      "brave.com",
      "s2.coinmarketcap.com"
    ],
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/rust/:path*',
        destination: `${process.env.SERVER_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;



