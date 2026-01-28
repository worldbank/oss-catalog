import type { NextConfig } from "next";

// Only use basePath in production builds (GitHub Pages)
// In development (npm run dev), serve from root
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/oss-catalog' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;