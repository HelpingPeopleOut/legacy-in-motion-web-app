import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.legacy-in-motion.org'; // <-- CORRECT DOMAIN

  // Every single high-value page on the website
  const routes = [
    '',
    '/request-callback',
    '/mission',
    '/freedom-financial-baby',
    '/workshops',
    '/toolbox',
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
    '/es/herramientas',
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