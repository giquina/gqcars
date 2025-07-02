/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disabled for Codespaces compatibility
  poweredByHeader: false,
  output: undefined, // Always use server mode in Codespaces
  trailingSlash: false, // Simplified for development
  typescript: {
    ignoreBuildErrors: true, // For faster development
  },
  eslint: {
    ignoreDuringBuilds: true, // For faster development
  },
  experimental: {
    esmExternals: true,
  },
  compiler: {
    removeConsole: false, // Keep console logs in development
  },
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
    ],
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { isServer }) => {
    // Simplified SVG support for Codespaces
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // Simplified headers for development
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // More permissive for Codespaces
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:; frame-ancestors 'self' *.github.dev *.preview.app.github.dev;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;