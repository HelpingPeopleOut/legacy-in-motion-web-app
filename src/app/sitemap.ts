import { MetadataRoute } from 'next';

// This line tells Next.js to generate this as a static XML file during the build
export const dynamic = 'force-static'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.legacy-in-motion.org';

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
    '/debt-free-wealth-strategy',
    '/mortgage-protection-los-angeles',
    '/business-owner-financial-strategies',
    '/es',
    '/es/mision',
    '/es/futuro-financiero-infantil',
    '/es/seminarios',
    '/es/herramientas',
    '/es/planificacion-de-jubilacion-los-angeles',
    '/es/beneficios-en-vida-los-angeles',
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