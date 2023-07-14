/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'raw.githubusercontent.com',
      'sbcf.fr',
    ],
  },
};

module.exports = nextConfig;
