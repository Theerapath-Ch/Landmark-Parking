import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "*.trycloudflare.com"
  ],
};

export default nextConfig;

// cloudflared tunnel --url http://localhost:3000