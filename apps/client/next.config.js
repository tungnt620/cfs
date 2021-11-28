const withNx = require('@nrwl/next/plugins/with-nx');

const nextConfig = {
  images: {
    domains: ['confession.vn', 'storage.googleapis.com'],
    path: '/_next/image/',
  },
  trailingSlash: true,
  // productionBrowserSourceMaps: true,
};

module.exports = withNx(nextConfig);
