// @ts-check
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  optimizeImages: true,
  optimizeCss: true,
  experimental: { 
    esmExternals: true,
    outputFileTracing: true
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    minimumCacheTTL: 1209600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['raw.githubusercontent.com'],
  }
}


module.exports = (nextConfig)
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
/** @exports nextConfig */
