import type { Metadata } from "next";
import { BUSINESS, DEFAULT_OG_IMAGE } from "@/lib/business";
import type { LocationEntry, SiteLocale } from "@/lib/locations";
import { getLocationPath } from "@/lib/locations";

const SITE_NAME = BUSINESS.name;

export function buildSiteUrl(path = ""): string {
  const base = BUSINESS.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}`;
}

function hreflangAlternates(loc: LocationEntry): Metadata["alternates"] {
  const enPath = getLocationPath(loc, "en");
  const esPath = getLocationPath(loc, "es");
  return {
    canonical: buildSiteUrl(enPath),
    languages: {
      en: buildSiteUrl(enPath),
      es: buildSiteUrl(esPath),
      "x-default": buildSiteUrl(enPath),
    },
  };
}

export function buildLocationMetadata(loc: LocationEntry, locale: SiteLocale = "en"): Metadata {
  const path = getLocationPath(loc, locale);
  const url = buildSiteUrl(path);
  const isHqMarket = loc.state === "california" && (loc.city === "pasadena" || loc.city === "los-angeles");

  if (locale === "es") {
    const title = isHqMarket
      ? `Planificación Financiera Premium en ${loc.name}, ${loc.stateAbbr} | Asesoría Nacional`
      : `Planificación Financiera en ${loc.name}, ${loc.stateAbbr} | ${SITE_NAME}`;

    const description = isHqMarket
      ? `Legacy in Motion tiene sede en Pasadena, CA y sirve a familias de ${loc.name} con jubilación, seguros con beneficios en vida y estrategias patrimoniales — más consultas virtuales en todo EE. UU.`
      : `Firma nacional con sede en Pasadena, CA. Sesiones virtuales para ${loc.name}, ${loc.stateName} — jubilación, beneficios en vida, patrimonio y riqueza generacional. Bilingüe.`;

    return {
      title,
      description,
      keywords: [
        `asesor financiero ${loc.name}`,
        `planificador financiero ${loc.name} ${loc.stateAbbr}`,
        `planificación de jubilación ${loc.name}`,
        `planificación patrimonial ${loc.name}`,
        `seguro de vida con beneficios en vida ${loc.stateAbbr}`,
        "asesor financiero bilingüe Pasadena",
        "planificación financiera nacional",
        "asesor financiero en español Los Angeles",
      ],
      alternates: hreflangAlternates(loc),
      openGraph: {
        title,
        description,
        url,
        siteName: SITE_NAME,
        locale: "es_US",
        alternateLocale: ["en_US"],
        type: "website",
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — ${loc.name}` }],
      },
      twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
    };
  }

  const title = isHqMarket
    ? `Premium Financial Planning in ${loc.name}, ${loc.stateAbbr} | National Wealth Advisory`
    : `Financial Planning in ${loc.name}, ${loc.stateAbbr} | National ${BUSINESS.serviceType} Provider`;

  const description = isHqMarket
    ? `Legacy in Motion is headquartered in Pasadena, CA and serves ${loc.name} families with retirement planning, living benefits life insurance, and estate strategies — plus nationwide virtual consultations across the USA.`
    : `National financial planning firm based in Pasadena, CA. Virtual strategy sessions for ${loc.name}, ${loc.stateName} — retirement, living benefits, estate planning, and generational wealth.`;

  return {
    title,
    description,
    keywords: [
      `financial advisor ${loc.name}`,
      `financial planner ${loc.name} ${loc.stateAbbr}`,
      `retirement planning ${loc.name}`,
      `estate planning ${loc.name}`,
      `living benefits life insurance ${loc.stateAbbr}`,
      "nationwide financial planning",
      "Pasadena financial advisor",
      "Spanish speaking financial advisor California",
    ],
    alternates: hreflangAlternates(loc),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      alternateLocale: ["es_US"],
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — ${loc.name}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export function buildLocationsIndexMetadata(locale: SiteLocale = "en"): Metadata {
  if (locale === "es") {
    const title = "Ubicaciones de Planificación Financiera | Sede Pasadena, Servicio Nacional";
    const description =
      "Legacy in Motion sirve Pasadena, Los Ángeles y ciudades principales de EE. UU. con jubilación, beneficios en vida y patrimonio. Sede en Pasadena, CA — consultas bilingües a nivel nacional.";
    const url = buildSiteUrl("/es/locations");
    return {
      title,
      description,
      alternates: {
        canonical: url,
        languages: {
          en: buildSiteUrl("/locations"),
          es: url,
          "x-default": buildSiteUrl("/locations"),
        },
      },
      openGraph: {
        title,
        description,
        url,
        siteName: SITE_NAME,
        locale: "es_US",
        alternateLocale: ["en_US"],
        type: "website",
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
      },
      twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
    };
  }

  const title = "Financial Planning Locations | Pasadena HQ, Nationwide Service";
  const description =
    "Legacy in Motion serves Pasadena, Los Angeles, and major US cities with retirement planning, living benefits, and estate strategies. Headquartered in Pasadena, CA — consultations available nationwide.";
  const url = buildSiteUrl("/locations");

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        es: buildSiteUrl("/es/locations"),
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      alternateLocale: ["es_US"],
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}
