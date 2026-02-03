import type { NextConfig } from "next";

// Site is now served from custom domain (opensource.worldbank.org)
// No basePath needed in production or development
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;