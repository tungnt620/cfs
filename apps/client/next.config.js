const withNx = require('@nrwl/next/plugins/with-nx');

const nextConfig = {
  images: {
    domains: ['confession.vn', 'storage.googleapis.com'],
  },
  trailingSlash: true,
  // productionBrowserSourceMaps: true,
};

module.exports = withNx(nextConfig);
