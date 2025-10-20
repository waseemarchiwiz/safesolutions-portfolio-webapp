import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // maximum 10 mb files
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "staticportal.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
