import { MetadataRoute } from 'next';

export const dynamic = "force-static"; // <-- ADD THIS LINE

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://test-legacy-in-motion-web-app.pages.dev/sitemap.xml', // Change to your actual domain later
  };
}