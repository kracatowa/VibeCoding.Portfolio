import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve this app under the portfolio path so proxied assets resolve correctly
  basePath: '/projects/data-integration',
  assetPrefix: '/projects/data-integration',
  // Expose the base path to client code so fetch() calls can prefix API requests
  env: {
    NEXT_PUBLIC_BASE_PATH: '/projects/data-integration',
  },
  transpilePackages: ['@portfolio/shared-ui'],
};

export default nextConfig;
