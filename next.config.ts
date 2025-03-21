import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during builds (temporary)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
