import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://test-legacy-in-motion-web-app.pages.dev'; // Change to your actual domain later (e.g., https://www.legacyinmotion.org)

  // Every single high-value page on the website
  const routes = [
    '',
    '/request-callback',
    '/mission',
    '/freedom-financial-baby',
    '/workshops',
    '/retirement-planning-pasadena',
    '/estate-business-planning-los-angeles',
    '/generational-wealth-arcadia-sgv',
    '/living-benefits-life-insurance-los-angeles',
    '/service-areas',
    '/es',
    '/es/mision',
    '/es/futuro-financiero-infantil',
    '/es/seminarios',
    '/es/planificacion-de-jubilacion-los-angeles',
    '/es/beneficios-en-vida-los-angeles',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' || route === '/es' ? 1 : 0.8,
  }));
}