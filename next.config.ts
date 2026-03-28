import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.infosoftschoole.workers.dev",
      },
      {
        protocol: "https",
        hostname: "cloudflare-b2-dev.infosoftschoole.workers.dev",
      },
    ],
  },
};

export default nextConfig;
