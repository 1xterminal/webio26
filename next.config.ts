import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  // reactCompiler: true, // disabled — babel-plugin-react-compiler not resolving
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three'],
  },
};

export default nextConfig;
