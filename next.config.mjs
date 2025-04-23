/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
    MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // プロキシを使用する場合は、unoptimizedをtrueに設定することも検討
    unoptimized: false, // 必要に応じてtrueに変更
    // 以下を追加
    output: "standalone",
  },
};

export default nextConfig;
