/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['framer-motion'],
  images: {
    domains: ['gqcars.co.uk'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /framer-motion/,
      sideEffects: false
    });
    return config;
  }
};

module.exports = nextConfig;