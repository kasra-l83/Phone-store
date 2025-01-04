import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname:"/images/products/images/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname:"/images/categories/icons/**"
      }
    ]
  }
}
export default nextConfig;