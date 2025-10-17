import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*',}
    ],
    // 👇 add this line for Next.js 16+ compliance
    qualities: [50, 60, 70, 80, 90, 100],
  },
};

export default nextConfig;
