/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: one codebase deploys to Vercel AND stays live on GitHub Pages.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
