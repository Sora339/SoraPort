/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
  },
  images: {
    domains: ["images.microcms-assets.io"], // MicroCMSで画像を使う場合、ホストを追加します
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
