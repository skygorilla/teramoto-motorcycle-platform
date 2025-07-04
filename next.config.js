
const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  webpack: (config) => {
    // This is to solve an issue with jsmediatags which tries to import react-native-fs
    // by telling webpack to ignore it.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'react-native-fs': false,
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
