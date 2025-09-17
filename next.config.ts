import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
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
