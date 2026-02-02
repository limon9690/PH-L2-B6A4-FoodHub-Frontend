import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://foodhub-backend-mu.vercel.app/api/auth/:path*",
      },
    ];
  }
};

export default nextConfig;
