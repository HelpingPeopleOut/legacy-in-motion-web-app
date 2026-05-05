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
    // New English Lead Funnels
    '/debt-free-wealth-strategy',
    '/mortgage-protection-los-angeles',
    '/business-owner-financial-strategies',
    
    // Spanish Routes
    '/es',
    '/es/mision',
    '/es/futuro-financiero-infantil',
    '/es/seminarios',
    '/es/planificacion-de-jubilacion-los-angeles',
    '/es/beneficios-en-vida-los-angeles',
    // New Spanish Lead Funnels
    '/es/estrategia-libre-de-deudas',
    '/es/proteccion-de-hipoteca-los-angeles',
    '/es/estrategias-financieras-para-negocios',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' || route === '/es' ? 1 : 0.8,
  }));
}