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
  //  experimental: {
  //    esmExternals: true,
  //    outputFileTracing: true
  //  },
};

export default nextConfig;

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2));
