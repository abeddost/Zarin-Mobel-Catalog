import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Images are served as ready-made files (see lib/image-loader.ts), not through
  // Vercel's image optimizer.
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  turbopack: {
    resolveAlias: {
      tailwindcss: path.resolve(__dirname, "node_modules/tailwindcss/index.css"),
    },
  },
};

export default nextConfig;
