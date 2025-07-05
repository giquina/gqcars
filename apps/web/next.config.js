/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  poweredByHeader: false,
  output: process.env.NODE_ENV === 'production' && process.env.BUILD_STATIC === 'true' ? 'export' : undefined,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'INP'],
    scrollRestoration: true,
    esmExternals: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    // Allowed image domains with security restrictions
    domains: [
      'images.unsplash.com',
      'via.placeholder.com', 
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'maps.googleapis.com',
      'atjiphyvxzsdpmsguvoo.supabase.co'
    ],
    // Modern image formats for better performance
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    // Enhanced security: disable SVG by default
    dangerouslyAllowSVG: false,
    // Strict CSP for images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Loader configuration for security
    loader: 'default',
    // Path for optimized images
    path: '/_next/image',
    // Disable static imports for security
    dangerouslyAllowSVG: false,
    // Unoptimized fallback
    unoptimized: false
  },
  webpack: (config, { isServer, dev }) => {
    // SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Optimization for production builds
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            // Create separate chunks for large libraries
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 20,
            },
            lucideReact: {
              name: 'lucide-react',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              chunks: 'all',
              priority: 15,
            },
            // Group React-related packages
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              chunks: 'all',
              priority: 25,
            },
          },
        },
      };
    }

    // Bundle analyzer in development
    if (!isServer && process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
  headers: async () => {
    return [
      {
        // Apply comprehensive security headers to all routes
        source: '/:path*',
        headers: [
          // Enhanced Content Security Policy for GQ Cars
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' 
                https://www.googletagmanager.com 
                https://www.google-analytics.com 
                https://js.stripe.com 
                https://maps.googleapis.com
                https://api.anthropic.com
                https://vercel.live;
              style-src 'self' 'unsafe-inline' 
                https://fonts.googleapis.com
                https://api.mapbox.com;
              font-src 'self' 
                https://fonts.gstatic.com;
              img-src 'self' data: blob: 
                https://*.googleusercontent.com 
                https://www.google-analytics.com
                https://maps.googleapis.com
                https://*.supabase.co
                https://images.unsplash.com
                https://res.cloudinary.com
                https://via.placeholder.com;
              connect-src 'self' 
                https://api.stripe.com 
                https://api.anthropic.com
                https://*.supabase.co
                https://www.google-analytics.com
                https://vitals.vercel-analytics.com
                https://maps.googleapis.com
                https://api.mapbox.com;
              frame-src 'self' 
                https://js.stripe.com
                https://www.google.com
                https://maps.google.com;
              object-src 'none';
              base-uri 'self';
              upgrade-insecure-requests;
              block-all-mixed-content;
            `.replace(/\s+/g, ' ').trim()
          },
          // Strict Transport Security - Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Enhanced referrer policy for privacy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Comprehensive permissions policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=(self), usb=(), interest-cohort=()'
          },
          // DNS prefetch control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // XSS protection (legacy browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Cross-Origin Embedder Policy
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          },
          // Cross-Origin Opener Policy
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          // Cross-Origin Resource Policy
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          },
          // Security monitoring header
          {
            key: 'X-Security-Version',
            value: '1.0'
          }
        ]
      },
      // API routes specific security headers
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? 'https://gqcars.vercel.app' 
              : 'http://localhost:3000'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token'
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400'
          },
          {
            key: 'X-API-Version',
            value: '1.0'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      },
      // Static assets with security headers
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      },
      // Public assets security
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/services/all',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig