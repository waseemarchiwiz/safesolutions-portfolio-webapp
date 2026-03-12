import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // maximum 10 mb files
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  // redirect to main domain
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "host",
            value: "www.safesolutionsconsultants.com",
          },
        ],
        destination: "https://safesolutionsconsultants.com/:path*",
        permanent: true,
      },
    ];
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
