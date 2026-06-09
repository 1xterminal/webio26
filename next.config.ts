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
  async redirects() {
    return [
      {
        source: '/kompetisi/:path*',
        destination: '/#memories',
        permanent: false,
      },
      {
        source: '/talkshow',
        destination: '/#memories',
        permanent: false,
      },
      {
        source: '/impact',
        destination: '/#memories',
        permanent: false,
      },
      {
        source: '/sponsorship',
        destination: '/#partners',
        permanent: false,
      },
      {
        source: '/casecollab',
        destination: '/#partners',
        permanent: false,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
