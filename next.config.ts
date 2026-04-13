import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js to be bundled properly
  transpilePackages: [],
  // Strict mode for React
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
