// next.config.js

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const packageJson = require('./package.json');
const date = new Date();
const GIT_COMMIT_SHA_SHORT = typeof process.env.GIT_COMMIT_SHA === 'string' && process.env.GIT_COMMIT_SHA.substring(0, 8);

// @ts-check
/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  env: {
    /**
     * @summary API Key Env Variables
     */
    // GITHUB_DISPATCH_TOKEN: process.env.GITHUB_DISPATCH_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.SENTRY_DSN, // Sentry DSN must be provided to the browser for error reporting to work there
    /**
    * @const VERCEL_
    * @see {@link https://vercel.com/docs/environment-variables#system-environment-variables}
    */
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    CI: process.env.CI,
  },
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
  async headers() {
    return [
      {
        source: '/*',
        headers: [{ key: 'Web-Build', value: process.env.VERCEL_GIT_COMMIT_SHA }]
      }
    ];
  },
}

module.exports = withPWA(nextConfig);

console.log('process.env.VERCEL_GIT_COMMIT_SHA: ', process.env.VERCEL_GIT_COMMIT_SHA);
console.log('process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: ', process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA);
// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))