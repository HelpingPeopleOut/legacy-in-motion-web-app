import type { Metadata } from "next";
import { BUSINESS, DEFAULT_OG_IMAGE, TRUST } from "@/lib/business";
import { buildSiteUrl } from "@/lib/seo-metadata";

const SITE_NAME = BUSINESS.name;

function ogImage(alt: string) {
  return [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt }];
}

function buildMeta({
  title,
  description,
  path,
  keywords,
  locale = "en",
  alternatePath,
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  locale?: "en" | "es";
  alternatePath?: string;
}): Metadata {
  const url = buildSiteUrl(path);
  const languages: Record<string, string> = { "x-default": buildSiteUrl(locale === "es" && alternatePath ? alternatePath : path) };
  if (alternatePath) {
    languages.en = buildSiteUrl(locale === "es" ? alternatePath : path);
    languages.es = buildSiteUrl(locale === "es" ? path : alternatePath);
  } else if (path === "/" || path === "/es") {
    languages.en = buildSiteUrl("/");
    languages.es = buildSiteUrl("/es");
  }

  return {
    title,
    description,
    keywords,
    authors: [{ name: TRUST.advisorName, url: buildSiteUrl("/links") }],
    creator: TRUST.advisorName,
    publisher: SITE_NAME,
    category: "Finance",
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 1 ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_US"],
      type: "website",
      images: ogImage(title),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/** Root layout defaults — individual routes override via layout.tsx */
export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: `${SITE_NAME} | Bilingual Financial Advisor Pasadena & Nationwide`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Nelly Lara — Senior Financial Associate with Experior Financial Group. Retirement planning, living benefits life insurance, estate strategies, and debt elimination. Pasadena, CA HQ · bilingual English & Spanish · nationwide virtual consultations.",
  applicationName: SITE_NAME,
  keywords: [
    "financial advisor Pasadena",
    "financial planner Los Angeles",
    "retirement planning California",
    "living benefits life insurance",
    "bilingual financial advisor",
    "401k rollover advisor",
    "estate planning San Gabriel Valley",
    "Legacy in Motion",
    "Nelly Lara financial advisor",
  ],
  authors: [{ name: TRUST.advisorName, url: buildSiteUrl("/links") }],
  creator: TRUST.advisorName,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_US"],
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Wealth Protection & Retirement Planning`,
    description:
      "Bilingual financial education and planning for families nationwide. Free strategy consultations with Nelly Lara in Pasadena, CA.",
    url: BUSINESS.url,
    images: ogImage(SITE_NAME),
  },
  twitter: {
    card: "summary_large_image",
    site: "@money_withnelz",
    creator: "@money_withnelz",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true },
  verification: {
    // Add Google Search Console token when available: google: "your-token",
  },
};

export const homeMetadata = {
  en: buildMeta({
    title: "Financial Advisor Pasadena & Nationwide | Retirement & Living Benefits",
    description:
      "Legacy in Motion helps families solve financial problems — not get sold products. Free strategy sessions with Nelly Lara: retirement rollovers, living benefits life insurance, estate planning, debt elimination. Bilingual · Pasadena HQ · US-wide virtual service.",
    path: "/",
    alternatePath: "/es",
    keywords: [
      "financial advisor near me",
      "Pasadena financial planner",
      "retirement planning Los Angeles",
      "living benefits life insurance",
      "free financial consultation",
      "bilingual financial advisor California",
      "401k rollover help",
      "Legacy in Motion",
    ],
  }),
  es: buildMeta({
    title: "Asesor Financiero Pasadena y Nacional | Jubilación y Beneficios en Vida",
    description:
      "Legacy in Motion ayuda a familias a resolver problemas financieros — sin presión de ventas. Sesiones gratuitas con Nelly Lara: jubilación, seguros con beneficios en vida, patrimonio y deudas. Bilingüe · Pasadena · servicio virtual en EE. UU.",
    path: "/es",
    alternatePath: "/",
    locale: "es",
    keywords: [
      "asesor financiero Pasadena",
      "planificador financiero Los Angeles",
      "planificación de jubilación",
      "seguro de vida beneficios en vida",
      "consulta financiera gratis",
      "asesor financiero bilingüe",
    ],
  }),
};

export type MarketingSeoKey =
  | "retirement-planning-pasadena"
  | "living-benefits-life-insurance-los-angeles"
  | "estate-business-planning-los-angeles"
  | "generational-wealth-arcadia-sgv"
  | "debt-free-wealth-strategy"
  | "mortgage-protection-los-angeles"
  | "business-owner-financial-strategies"
  | "freedom-financial-baby"
  | "workshops"
  | "toolbox"
  | "mission"
  | "request-callback"
  | "thanks"
  | "service-areas"
  | "financial-education"
  | "planificacion-de-jubilacion-los-angeles"
  | "beneficios-en-vida-los-angeles"
  | "estrategia-libre-de-deudas"
  | "proteccion-de-hipoteca-los-angeles"
  | "estrategias-financieras-para-negocios"
  | "futuro-financiero-infantil"
  | "seminarios"
  | "herramientas"
  | "mision"
  | "solicitar-llamada"
  | "gracias"
  | "educacion-financiera";

export const MARKETING_SEO: Record<MarketingSeoKey, Metadata> = {
  "retirement-planning-pasadena": buildMeta({
    title: "Retirement Planning Pasadena | 401(k) Rollovers & CalPERS Strategies",
    description:
      "Protect your pension and 401(k) with principal-protected retirement strategies. Fixed index annuities, CalPERS guidance, and tax-efficient income planning for Pasadena and San Gabriel Valley families.",
    path: "/retirement-planning-pasadena",
    alternatePath: "/es/planificacion-de-jubilacion-los-angeles",
    keywords: ["401k rollover Pasadena", "CalPERS advisor", "retirement planner SGV", "fixed index annuity", "pension protection"],
  }),
  "living-benefits-life-insurance-los-angeles": buildMeta({
    title: "Living Benefits Life Insurance Los Angeles | Critical Illness Coverage",
    description:
      "Life insurance that pays while you are alive — critical, chronic, and terminal illness benefits. Term and permanent options for LA families, homeowners, and business owners.",
    path: "/living-benefits-life-insurance-los-angeles",
    alternatePath: "/es/beneficios-en-vida-los-angeles",
    keywords: ["living benefits life insurance", "critical illness insurance LA", "accelerated death benefit", "mortgage protection"],
  }),
  "estate-business-planning-los-angeles": buildMeta({
    title: "Estate & Business Planning Los Angeles | Trusts, Key Person & Exit Plans",
    description:
      "Avoid probate, protect business assets, and plan your exit with trusts, key person insurance, and executive bonus strategies. Legacy in Motion — Pasadena-based, nationwide service.",
    path: "/estate-business-planning-los-angeles",
    keywords: ["estate planning Los Angeles", "business exit planning", "key person insurance", "avoid probate California"],
  }),
  "generational-wealth-arcadia-sgv": buildMeta({
    title: "Generational Wealth Arcadia & San Gabriel Valley | Legacy Transfer",
    description:
      "Tax-efficient wealth transfer strategies for SGV families — IUL, children's accounts, and multi-generational legacy planning with bilingual guidance.",
    path: "/generational-wealth-arcadia-sgv",
    keywords: ["generational wealth Arcadia", "wealth transfer SGV", "family legacy planning", "children investment accounts"],
  }),
  "debt-free-wealth-strategy": buildMeta({
    title: "Debt-Free Wealth Strategy | Cash Flow & Debt Elimination Planning",
    description:
      "Visualize your path out of debt and into wealth-building. Cash flow analysis, credit payoff strategies, and emergency fund planning — education-first, no high-pressure sales.",
    path: "/debt-free-wealth-strategy",
    alternatePath: "/es/estrategia-libre-de-deudas",
    keywords: ["debt elimination strategy", "get out of debt fast", "cash flow analysis advisor", "debt free wealth"],
  }),
  "mortgage-protection-los-angeles": buildMeta({
    title: "Mortgage Protection Los Angeles | Income Replacement for Homeowners",
    description:
      "Protect your home if income stops unexpectedly. Mortgage protection and life insurance strategies for LA and SGV homeowners — free needs analysis.",
    path: "/mortgage-protection-los-angeles",
    alternatePath: "/es/proteccion-de-hipoteca-los-angeles",
    keywords: ["mortgage protection insurance", "homeowner life insurance LA", "income replacement mortgage"],
  }),
  "business-owner-financial-strategies": buildMeta({
    title: "Business Owner Financial Strategies | Key Person & Executive Benefits",
    description:
      "Protect your business with key person insurance, executive bonus plans, and succession strategies. For entrepreneurs in Los Angeles and nationwide.",
    path: "/business-owner-financial-strategies",
    alternatePath: "/es/estrategias-financieras-para-negocios",
    keywords: ["business owner financial advisor", "key person insurance", "executive bonus plan", "buy-sell agreement funding"],
  }),
  "freedom-financial-baby": buildMeta({
    title: "Freedom Financial Baby | Children's Wealth & IUL Savings Plans",
    description:
      "Start generational wealth early — tax-advantaged savings and Indexed Universal Life strategies for children's futures. Workshops and family planning sessions.",
    path: "/freedom-financial-baby",
    alternatePath: "/es/futuro-financiero-infantil",
    keywords: ["children savings account", "IUL for kids", "generational wealth children", "529 alternative planning"],
  }),
  workshops: buildMeta({
    title: "Financial Education Workshops | Legacy in Motion Seminars",
    description:
      "Free and premium workshops on debt elimination, retirement, living benefits, and generational wealth. Available in English and Spanish for groups and employers.",
    path: "/workshops",
    alternatePath: "/es/seminarios",
    keywords: ["financial literacy workshop", "money workshop Pasadena", "employee financial wellness seminar"],
  }),
  toolbox: buildMeta({
    title: "Financial Planning Toolbox | Calculators & Client Resources",
    description:
      "Free financial calculators and planning tools — Human Life Value, debt payoff, retirement projections, and more. Legacy in Motion client resource hub.",
    path: "/toolbox",
    alternatePath: "/es/herramientas",
    keywords: ["financial calculator", "life insurance calculator", "retirement calculator free"],
  }),
  mission: buildMeta({
    title: "Our Mission | Education-First Financial Planning",
    description:
      "Legacy in Motion exists to teach families how money works before recommending products. Meet Nelly Lara and our commitment to bilingual, transparent financial guidance.",
    path: "/mission",
    alternatePath: "/es/mision",
    keywords: ["Legacy in Motion mission", "Nelly Lara advisor", "financial education first"],
  }),
  "request-callback": buildMeta({
    title: "Request a Free Financial Strategy Consultation",
    description:
      "Schedule a free, no-obligation strategy session with Nelly Lara. Retirement, insurance, estate, debt, or business planning — bilingual English & Spanish.",
    path: "/request-callback",
    alternatePath: "/es/solicitar-llamada",
    keywords: ["free financial consultation", "book financial advisor", "strategy session Pasadena"],
  }),
  thanks: buildMeta({
    title: "Thank You — We Will Contact You Soon",
    description: "Your consultation request was received. Legacy in Motion will contact you within one business day.",
    path: "/thanks",
    alternatePath: "/es/gracias",
    keywords: [],
  }),
  "service-areas": buildMeta({
    title: "Service Areas | San Gabriel Valley & Nationwide Virtual Planning",
    description:
      "Legacy in Motion serves Pasadena, Arcadia, Los Angeles, and the San Gabriel Valley — plus virtual financial planning sessions across the United States.",
    path: "/service-areas",
    keywords: ["financial advisor service areas", "San Gabriel Valley financial planner", "Pasadena Arcadia advisor"],
  }),
  "financial-education": buildMeta({
    title: "Financial Education Hub | Guides for Retirement, Insurance & Legacy",
    description:
      "Helpful guides answering real client questions: 401(k) rollovers, living benefits explained, debt payoff order, emergency funds, and when to review beneficiaries. Free education from Legacy in Motion.",
    path: "/financial-education",
    alternatePath: "/es/educacion-financiera",
    keywords: [
      "how to rollover 401k",
      "what are living benefits life insurance",
      "how much life insurance do I need",
      "financial planning guide",
      "emergency fund how much",
    ],
  }),
  "planificacion-de-jubilacion-los-angeles": buildMeta({
    title: "Planificación de Jubilación Los Angeles | Rollovers 401(k) y CalPERS",
    description:
      "Proteja su pensión y 401(k) con estrategias de jubilación. Anualidades de índice fijo, orientación CalPERS e ingreso garantizado — sesiones bilingües.",
    path: "/es/planificacion-de-jubilacion-los-angeles",
    alternatePath: "/retirement-planning-pasadena",
    locale: "es",
    keywords: ["planificación jubilación Los Angeles", "rollover 401k", "asesor CalPERS", "anualidad índice fijo"],
  }),
  "beneficios-en-vida-los-angeles": buildMeta({
    title: "Seguro de Vida con Beneficios en Vida | Los Angeles",
    description:
      "Seguro de vida que paga mientras vive — enfermedad crítica, crónica y terminal. Opciones a término y permanentes para familias en Los Angeles.",
    path: "/es/beneficios-en-vida-los-angeles",
    alternatePath: "/living-benefits-life-insurance-los-angeles",
    locale: "es",
    keywords: ["beneficios en vida seguro", "enfermedad crítica seguro vida", "protección hipoteca"],
  }),
  "estrategia-libre-de-deudas": buildMeta({
    title: "Estrategia Libre de Deudas | Flujo de Efectivo y Eliminación",
    description:
      "Visualice su camino para salir de deudas y construir patrimonio. Análisis de flujo de efectivo y fondo de emergencia — educación sin presión.",
    path: "/es/estrategia-libre-de-deudas",
    alternatePath: "/debt-free-wealth-strategy",
    locale: "es",
    keywords: ["eliminar deudas", "estrategia libre de deudas", "planificación flujo efectivo"],
  }),
  "proteccion-de-hipoteca-los-angeles": buildMeta({
    title: "Protección de Hipoteca Los Angeles | Reemplazo de Ingreso",
    description:
      "Proteja su hogar si el ingreso se detiene. Estrategias de seguro de vida y protección hipotecaria para propietarios en Los Angeles.",
    path: "/es/proteccion-de-hipoteca-los-angeles",
    alternatePath: "/mortgage-protection-los-angeles",
    locale: "es",
    keywords: ["protección hipoteca", "seguro vida propietarios", "reemplazo ingreso"],
  }),
  "estrategias-financieras-para-negocios": buildMeta({
    title: "Estrategias Financieras para Negocios | Persona Clave y Beneficios",
    description:
      "Proteja su negocio con seguro de persona clave, planes de bonificación ejecutiva y sucesión. Para empresarios en Los Angeles y a nivel nacional.",
    path: "/es/estrategias-financieras-para-negocios",
    alternatePath: "/business-owner-financial-strategies",
    locale: "es",
    keywords: ["planificación financiera negocios", "seguro persona clave", "plan salida negocio"],
  }),
  "futuro-financiero-infantil": buildMeta({
    title: "Futuro Financiero Infantil | Riqueza Generacional para Niños",
    description:
      "Comience la riqueza generacional temprano — ahorro fiscalmente eficiente e IUL para el futuro de sus hijos. Talleres familiares bilingües.",
    path: "/es/futuro-financiero-infantil",
    alternatePath: "/freedom-financial-baby",
    locale: "es",
    keywords: ["cuenta ahorro niños", "IUL niños", "riqueza generacional infantil"],
  }),
  seminarios: buildMeta({
    title: "Seminarios de Educación Financiera | Legacy in Motion",
    description:
      "Talleres gratuitos y premium sobre deudas, jubilación, beneficios en vida y patrimonio. Disponibles en inglés y español.",
    path: "/es/seminarios",
    alternatePath: "/workshops",
    locale: "es",
    keywords: ["seminario finanzas personales", "taller educación financiera", "charla dinero"],
  }),
  herramientas: buildMeta({
    title: "Herramientas Financieras | Calculadoras y Recursos",
    description:
      "Calculadoras gratuitas — valor humano de vida, eliminación de deudas, proyecciones de jubilación y más.",
    path: "/es/herramientas",
    alternatePath: "/toolbox",
    locale: "es",
    keywords: ["calculadora financiera", "calculadora seguro vida", "herramientas planificación"],
  }),
  mision: buildMeta({
    title: "Nuestra Misión | Planificación Basada en Educación",
    description:
      "Legacy in Motion enseña cómo funciona el dinero antes de recomendar productos. Conozca a Nelly Lara y nuestro compromiso bilingüe.",
    path: "/es/mision",
    alternatePath: "/mission",
    locale: "es",
    keywords: ["misión Legacy in Motion", "Nelly Lara asesora", "educación financiera"],
  }),
  "solicitar-llamada": buildMeta({
    title: "Solicitar Consulta Financiera Gratuita",
    description:
      "Agende una sesión de estrategia sin obligación con Nelly Lara. Jubilación, seguros, patrimonio, deudas o negocios — bilingüe.",
    path: "/es/solicitar-llamada",
    alternatePath: "/request-callback",
    locale: "es",
    keywords: ["consulta financiera gratis", "asesor financiero cita", "sesión estrategia"],
  }),
  gracias: buildMeta({
    title: "Gracias — Nos Comunicaremos Pronto",
    description: "Recibimos su solicitud. Legacy in Motion se comunicará dentro de un día hábil.",
    path: "/es/gracias",
    alternatePath: "/thanks",
    locale: "es",
    keywords: [],
  }),
  "educacion-financiera": buildMeta({
    title: "Centro de Educación Financiera | Guías de Jubilación y Seguros",
    description:
      "Guías útiles: rollovers 401(k), beneficios en vida, orden de pago de deudas, fondo de emergencia y revisión de beneficiarios. Educación gratuita de Legacy in Motion.",
    path: "/es/educacion-financiera",
    alternatePath: "/financial-education",
    locale: "es",
    keywords: ["cómo hacer rollover 401k", "beneficios en vida explicado", "guía planificación financiera"],
  }),
};

export function getMarketingMetadata(key: MarketingSeoKey): Metadata {
  return MARKETING_SEO[key];
}
