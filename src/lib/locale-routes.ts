/** Canonical EN ↔ ES path map for hreflang toggles and internal links. */
export const LOCALE_ROUTE_PAIRS: Array<{ en: string; es: string }> = [
  { en: "/", es: "/es" },
  { en: "/mission", es: "/es/mision" },
  { en: "/freedom-financial-baby", es: "/es/futuro-financiero-infantil" },
  { en: "/workshops", es: "/es/seminarios" },
  { en: "/toolbox", es: "/es/herramientas" },
  { en: "/request-callback", es: "/es/solicitar-llamada" },
  { en: "/contact", es: "/es/contacto" },
  { en: "/thanks", es: "/es/gracias" },
  { en: "/links", es: "/es/links" },
  { en: "/locations", es: "/es/locations" },
  { en: "/financial-education", es: "/es/educacion-financiera" },
  { en: "/retirement-planning-pasadena", es: "/es/planificacion-de-jubilacion-los-angeles" },
  { en: "/living-benefits-life-insurance-los-angeles", es: "/es/beneficios-en-vida-los-angeles" },
  { en: "/debt-free-wealth-strategy", es: "/es/estrategia-libre-de-deudas" },
  { en: "/mortgage-protection-los-angeles", es: "/es/proteccion-de-hipoteca-los-angeles" },
  { en: "/business-owner-financial-strategies", es: "/es/estrategias-financieras-para-negocios" },
];

const enToEs = new Map(LOCALE_ROUTE_PAIRS.map((p) => [p.en, p.es]));
const esToEn = new Map(LOCALE_ROUTE_PAIRS.map((p) => [p.es, p.en]));

/** Spanish page URLs keyed by SERVICE_CATALOG id. */
export const SERVICE_PAGE_ES: Record<string, string> = {
  "retirement-rollovers": "/es/planificacion-de-jubilacion-los-angeles",
  "living-benefits": "/es/beneficios-en-vida-los-angeles",
  "estate-business": "/estate-business-planning-los-angeles",
  "generational-wealth": "/generational-wealth-arcadia-sgv",
  "debt-elimination": "/es/estrategia-libre-de-deudas",
  "mortgage-protection": "/es/proteccion-de-hipoteca-los-angeles",
  "business-owner": "/es/estrategias-financieras-para-negocios",
  "freedom-financial-baby": "/es/futuro-financiero-infantil",
  workshops: "/es/seminarios",
};

export function getLocaleTogglePath(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, "") || "/";

  if (normalized.startsWith("/es/locations/") || normalized === "/es/locations") {
    return normalized === "/es/locations" ? "/locations" : normalized.replace(/^\/es/, "") || "/locations";
  }
  if (normalized.startsWith("/locations/")) {
    return `/es${normalized}`;
  }

  if (normalized.startsWith("/es")) {
    return esToEn.get(normalized) ?? (normalized.replace(/^\/es/, "") || "/");
  }

  return enToEs.get(normalized) ?? `/es${normalized === "/" ? "" : normalized}`;
}

export function getServicePageUrl(serviceId: string, locale: "en" | "es" = "en"): string | undefined {
  if (locale === "es") return SERVICE_PAGE_ES[serviceId];
  return undefined;
}
