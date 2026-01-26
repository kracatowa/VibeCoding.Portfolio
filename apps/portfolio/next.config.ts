import type { NextConfig } from "next";

const DATA_INTEGRATION_URL = process.env.DATA_INTEGRATION_URL || 'https://ocean-barras-data-integration.vercel.app';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Forward the full demo path to the demo app
      { source: '/', destination: `${DATA_INTEGRATION_URL}` },
      { source: '/:path*', destination: `${DATA_INTEGRATION_URL}/:path*` },
      // Proxy the demo _next static assets to the running demo app
      { source: '/_next/:path*', destination: `${DATA_INTEGRATION_URL}/_next/:path*` },
    ];
  },
  transpilePackages: ['@portfolio/shared-ui'],
};

export default nextConfig;