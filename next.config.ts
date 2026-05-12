// @ts-expect-error
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disables in dev mode so it doesn't cache heavily while you code
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- FIX: Generates the 'out' folder for Cloudflare Pages
  images: {
    unoptimized: true, // <-- FIX: Required by Next.js when using output: 'export'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'experiorfinancial.com',
      },
    ],
  },
};

export default withPWA(nextConfig);