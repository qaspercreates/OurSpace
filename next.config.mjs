/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // build should not stop on type errors
    ignoreBuildErrors: true
  }
};

export default nextConfig;
