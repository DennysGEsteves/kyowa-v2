/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverActions: true,
  },
};

export default config;
