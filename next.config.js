/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
