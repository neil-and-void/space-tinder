/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['apod.nasa.gov', 'www.youtube.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
