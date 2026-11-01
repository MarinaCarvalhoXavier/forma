import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev server only: let phones on the home Wi-Fi load the page's scripts.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
