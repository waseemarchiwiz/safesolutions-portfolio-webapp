import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost", //  no http://
        port: "8080", //  port separately
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "safesolution-portfolio-backend-h6a6esaxema6g4hm.eastus-01.azurewebsites.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
