
const packageJson = require('./package.json');
const date = new Date();
const GIT_COMMIT_SHA_SHORT = typeof process.env.GIT_COMMIT_SHA === 'string' && process.env.GIT_COMMIT_SHA.substring(0, 8);

// @ts-check
/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/swap',
  reactStrictMode: true,
  swcMinify: true,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  optimizeImages: true,
  optimizeCss: true,
   experimental: {
  //    esmExternals: true,
  //    outputFileTracing: true
    swcTraceProfiling: true
  },
};

export default nextConfig;

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2));
