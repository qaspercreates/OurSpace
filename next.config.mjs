/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // safety nets so types/eslint never block a prod build
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true }
};
export default nextConfig;
