// @ts-expect-error
import withPWAInit from 'next-pwa';

const isCfPages = process.env.CF_PAGES === '1';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages serves static files from /out
  ...(isCfPages ? { output: 'export' as const } : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'experiorfinancial.com',
      },
    ],
  },
};

export default withPWA(nextConfig);
