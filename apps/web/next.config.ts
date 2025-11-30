import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "miaoda-site-img.cdn.bcebos.com",
      },
      {
        protocol: "https",
        hostname: "googlecdn2.datas.systems",
      },
    ],
  },
};

export default nextConfig;
