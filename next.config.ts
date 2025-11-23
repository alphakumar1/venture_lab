import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence turbopack root warning and ensure correct project root
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
