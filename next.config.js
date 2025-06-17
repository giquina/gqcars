/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001']
    }
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-value'
  },
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard'
      }
    ]
  }
}

module.exports = nextConfig
