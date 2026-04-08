import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/brand/**",
        search: "",
      },
      {
        pathname: "/site/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
