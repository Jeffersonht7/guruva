/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (isServer && config.output) {
      config.output.chunkFilename = "chunks/[name].js";
    }

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin.html",
      },
    ];
  }
};

export default nextConfig;
