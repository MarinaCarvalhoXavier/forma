import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photos come from Unsplash.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
