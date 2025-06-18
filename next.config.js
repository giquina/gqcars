/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default-value'
  }
}

module.exports = nextConfig
