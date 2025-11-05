import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "assets.pokemon.com",
      },
      {
        protocol: "https",
        hostname: "pokeapi.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
