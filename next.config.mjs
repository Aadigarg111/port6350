/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress hydration warnings in development
  reactStrictMode: true,
  // Add experimental features to help with hydration
  experimental: {
    // This helps with hydration mismatches from browser extensions
    optimizePackageImports: ['framer-motion'],
  },
  // Suppress hydration warnings in development
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
