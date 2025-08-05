import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  // Explicitly specify that we're using src directory
  // This is automatically detected, but let's be explicit
};

export default nextConfig;
