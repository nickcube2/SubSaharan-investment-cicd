import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SEO and Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for security and SEO
  // NOTE: For static export, use .htaccess in public/ for custom headers.
  // async headers() { ... } // Removed for static export

  // Redirects for SEO
  // NOTE: For static export, use .htaccess in public/ for redirects.
  // async redirects() { ... } // Removed for static export

  // Turbopack configuration (moved from experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      'react-icons': 'react-icons',
      'gsap': 'gsap',
      'three': 'three',
    },
  },

  // Experimental features optimized for performance
  experimental: {
    // Performance optimizations
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'gsap', 'framer-motion'],
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: ['three-globe', 'react-globe.gl'],

  // Turbopack specific configurations
  typescript: {
    // Enable type checking during build for better error catching
    ignoreBuildErrors: false,
  },

  // Output configuration for static export
  output: 'standalone',
  
  // Trailing slash for better SEO and static export compatibility
  trailingSlash: true,
  
  // Asset prefix for static export (if needed for subdirectory hosting)
  // assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig; 