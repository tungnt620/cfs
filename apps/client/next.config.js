const withNx = require('@nrwl/next/plugins/with-nx');

const nextConfig = {
  images: {
    domains: ['confession.vn', 'storage.googleapis.com'],
  }
};

module.exports = withNx(nextConfig);
