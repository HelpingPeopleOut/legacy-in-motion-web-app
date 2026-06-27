import { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";
import { LOCATIONS, getLocationPath } from "@/lib/locations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS.url.replace(/\/$/, "");

  const routes = [
    "",
    "/request-callback",
    "/thanks",
    "/mission",
    "/freedom-financial-baby",
    "/workshops",
    "/toolbox",
    "/locations",
    "/links",
    "/retirement-planning-pasadena",
    "/estate-business-planning-los-angeles",
    "/generational-wealth-arcadia-sgv",
    "/living-benefits-life-insurance-los-angeles",
    "/service-areas",
    "/debt-free-wealth-strategy",
    "/mortgage-protection-los-angeles",
    "/business-owner-financial-strategies",
    "/es",
    "/es/mision",
    "/es/futuro-financiero-infantil",
    "/es/seminarios",
    "/es/herramientas",
    "/es/solicitar-llamada",
    "/es/gracias",
    "/es/links",
    "/es/locations",
    "/es/planificacion-de-jubilacion-los-angeles",
    "/es/beneficios-en-vida-los-angeles",
    "/es/estrategia-libre-de-deudas",
    "/es/proteccion-de-hipoteca-los-angeles",
    "/es/estrategias-financieras-para-negocios",
  ];

  const locationRoutesEn = LOCATIONS.map((loc) => getLocationPath(loc, "en"));
  const locationRoutesEs = LOCATIONS.map((loc) => getLocationPath(loc, "es"));

  const allRoutes = [...routes, ...locationRoutesEn, ...locationRoutesEs];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes("/locations/") ? ("monthly" as const) : ("weekly" as const),
    priority:
      route === "" || route === "/es"
        ? 1
        : route === "/locations" || route === "/es/locations" || route.includes("/locations/california/")
          ? 0.9
          : 0.8,
  }));
}
