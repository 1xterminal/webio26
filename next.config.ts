import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three'],
  },
};

export default withBundleAnalyzer(nextConfig);
