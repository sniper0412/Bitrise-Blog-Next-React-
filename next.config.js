require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer');
const withSCSS = require('@zeit/next-sass');

module.exports = withSCSS(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true'
  })()
);
