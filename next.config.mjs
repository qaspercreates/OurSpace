/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // don't fail the build on TS type errors
    ignoreBuildErrors: true
  },
  eslint: {
    // don't fail the build on ESLint issues
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
