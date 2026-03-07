import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  // reactCompiler: true, // disabled — babel-plugin-react-compiler not resolving
  images: {
    // Enable modern AVIF format (30-50% smaller than WebP) with WebP fallback
    formats: ['image/avif', 'image/webp'],
    // Tuned to the breakpoints actually used (sm:640, md:768, lg:1024, xl:1280, 2xl:1536)
    deviceSizes: [640, 750, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three'],
  },
};

export default withBundleAnalyzer(nextConfig);
