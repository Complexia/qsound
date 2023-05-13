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
    ],
  },
};

module.exports = nextConfig;
