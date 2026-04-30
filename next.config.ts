// @ts-expect-error
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disables in dev mode so it doesn't cache heavily while you code
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config options here, if any
};

export default withPWA(nextConfig);