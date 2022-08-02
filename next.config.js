// next.config.js

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

// @ts-check
/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    forceSwcTransforms: true,
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
}

module.exports = withPWA(nextConfig);


// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))