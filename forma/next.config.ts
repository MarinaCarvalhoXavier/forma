import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev server only: let phones on the home Wi-Fi load the page's scripts.
  allowedDevOrigins: ["192.168.*.*"],
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
