const withNx = require('@nrwl/next/plugins/with-nx');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    domains: ['confession.vn', 'storage.googleapis.com'],
  },
  trailingSlash: true,
  // productionBrowserSourceMaps: true,
};

module.exports = withNx(withBundleAnalyzer(nextConfig));
