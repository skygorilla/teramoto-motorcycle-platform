
const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // No remotePatterns needed if you're only using local images
    // from the /public folder.
  },
};

module.exports = withNextIntl(nextConfig);
