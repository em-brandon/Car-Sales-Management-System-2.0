/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "**.pexels.com" },
      { protocol: "https", hostname: "**.picsum.photos" },
      { protocol: "https", hostname: "*" },
    ],
    // 👇 add this line for Next.js 16+ compliance
    qualities: [50, 60, 70, 80, 90, 100],
  },
};

export default nextConfig;
