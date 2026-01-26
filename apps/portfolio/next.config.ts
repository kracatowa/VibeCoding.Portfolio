import type { NextConfig } from "next";

const DATA_INTEGRATION_URL = process.env.DATA_INTEGRATION_URL || 'http://localhost:3002';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Forward the full demo path to the demo app which is served under the same basePath
      { source: '/projects/data-integration', destination: `${DATA_INTEGRATION_URL}/projects/data-integration` },
      { source: '/projects/data-integration/:path*', destination: `${DATA_INTEGRATION_URL}/projects/data-integration/:path*` },
      // Proxy the demo _next static assets to the running demo app (including its basePath)
      { source: '/projects/data-integration/_next/:path*', destination: `${DATA_INTEGRATION_URL}/projects/data-integration/_next/:path*` },
    ];
  },
  transpilePackages: ['@portfolio/shared-ui'],
};

export default nextConfig;