/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Exclude React Native files from the build
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-navigation/native': false,
      '@react-navigation/native-stack': false,
      '@react-navigation/bottom-tabs': false,
      'react-native-vector-icons': false,
    };
    
    // Ignore mobile app directories
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/GQSecurity/**', '**/node_modules/**'],
    };
    
    return config;
  },
  // Exclude mobile app from compilation
  experimental: {
    externalDir: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'].filter(ext => true),
  transpilePackages: [],
}

module.exports = nextConfig
