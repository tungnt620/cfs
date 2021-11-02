const withNx = require('@nrwl/next/plugins/with-nx');

const nextConfig = {
  images: {
    domains: ['confession.vn', 'storage.googleapis.com'],
  },
  trailingSlash: true,
};

// module.exports = withPreact(withNx(nextConfig));
module.exports = withNx(nextConfig);
