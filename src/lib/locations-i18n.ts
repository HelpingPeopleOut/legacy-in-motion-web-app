import type { LocationCaseStudy, LocationEntry, SiteLocale } from "@/lib/locations";

export type { SiteLocale };

export type LocalizedLocation = LocationEntry & {
  locale: SiteLocale;
  legacyPillarHref?: string;
};

export const CORE_SERVICES_ES = [
  "Planificación de Jubilación y Rollovers 401(k)",
  "Seguros de Vida con Beneficios en Vida",
  "Planificación Patrimonial y de Negocios",
  "Transferencia de Riqueza Generacional",
  "Estrategia de Eliminación de Deudas",
  "Protección de Hipoteca",
];

export const DEFAULT_DROPDOWN_ES = [
  "Jubilación y Rollover 401(k)",
  "Seguros con Beneficios en Vida",
  "Planificación Patrimonial y Fideicomisos",
  "Estrategias para Dueños de Negocio",
  "Transferencia de Riqueza Generacional",
  "Estrategia de Eliminación de Deudas",
];

type LocationEsOverride = Partial<
  Pick<
    LocationEntry,
    "headline" | "subheadline" | "localChallenges" | "services" | "dropdownOptions" | "caseStudies" | "region"
  >
> & { legacyPillarHref?: string };

const ES_OVERRIDES: Record<string, LocationEsOverride> = {
  "california/pasadena": {
    region: "Valle de San Gabriel",
    headline: "Asegure su Futuro Financiero en Pasadena y el Valle de San Gabriel",
    subheadline:
      "Con sede en Pasadena, ayudamos a familias del SGV a proteger pensiones, hacer rollover de 401(k) y construir riqueza generacional — con atención bilingüe.",
    localChallenges: [
      "Decisiones de pensiones CalPERS y del sector público con opciones complejas",
      "Impuestos estatales de California que erosionan ingresos de jubilación",
      "Volatilidad del mercado que amenaza saldos 401(k) antes de jubilarse",
      "Demoras de sucesión y impuestos que afectan transferencias generacionales",
    ],
    dropdownOptions: [
      "Rollover 401(k) o Pensión CalPERS",
      "Anualidades de Índice Fijo (FIAs)",
      "Seguros con Beneficios en Vida",
      "Planificación Patrimonial y Fideicomisos",
      "Transferencia de Riqueza Generacional",
    ],
    caseStudies: [
      {
        title: "Optimización de Pensión CalPERS",
        summary:
          "Un empleado municipal de Pasadena cerca de jubilarse necesitaba proteger ingresos de pensión de la volatilidad del mercado.",
        outcome:
          "Estructuramos una estrategia de rollover fiscalmente eficiente con componentes de ingreso garantizado.",
      },
      {
        title: "Transferencia de Riqueza Multigeneracional",
        summary: "Una familia del SGV quería pasar riqueza a nietos sin demoras de sucesión.",
        outcome: "Implementamos beneficios en vida y herramientas patrimoniales para proteger activos.",
      },
    ],
    legacyPillarHref: "/es/planificacion-de-jubilacion-los-angeles",
  },
  "california/los-angeles": {
    region: "Gran Los Ángeles",
    headline: "Planificación Patrimonial Premium para Familias de Los Ángeles",
    subheadline:
      "Desde el centro de LA hasta el Westside, diseñamos fortalezas financieras para ejecutivos, dueños de negocio y familias — respaldados por nuestra sede en Pasadena.",
    localChallenges: [
      "Alto costo de vida que requiere estrategias de ingreso garantizado",
      "Planificación de salida y protección de personas clave para negocios",
      "Planificación patrimonial para residentes de alto patrimonio en California",
      "Brechas de liquidez por enfermedad crítica y cuidado a largo plazo",
    ],
    caseStudies: [
      {
        title: "Bonos Ejecutivos y Planificación de Personas Clave",
        summary: "Un dueño de negocio en LA necesitaba retener talento y planificar su salida personal.",
        outcome: "Coordinamos bonos ejecutivos con cobertura de beneficios en vida.",
      },
      {
        title: "Fortaleza Patrimonial de Alto Patrimonio",
        summary: "Una familia del Westside requería evitar sucesión y liquidez para cuidado a largo plazo.",
        outcome: "Construimos un plan en capas con beneficios en vida y coordinación patrimonial.",
      },
    ],
    legacyPillarHref: "/es/beneficios-en-vida-los-angeles",
  },
  "california/arcadia": {
    region: "Valle de San Gabriel",
    headline: "Estrategias de Riqueza Generacional para Arcadia y el SGV",
    subheadline:
      "Proteja lo que ha construido en Arcadia con planificación patrimonial, beneficios en vida y transferencia fiscalmente eficiente.",
    legacyPillarHref: "/es/planificacion-de-jubilacion-los-angeles",
  },
  "california/santa-monica": {
    region: "Westside de Los Ángeles",
    headline: "Planificación Financiera en el Westside — Santa Mónica",
    subheadline:
      "Bonos ejecutivos, beneficios en vida y estrategias patrimoniales para profesionales y dueños de negocio en Santa Mónica.",
    legacyPillarHref: "/es/beneficios-en-vida-los-angeles",
  },
  "florida/miami": {
    region: "Sur de Florida",
    headline: "Planificación Financiera Bilingüe para Miami y el Sur de Florida",
    subheadline:
      "Sesiones de estrategia en inglés y español para familias de Miami — jubilación, beneficios en vida y riqueza generacional.",
  },
};

function nationalCaseStudiesEs(cityName: string): LocationCaseStudy[] {
  return [
    {
      title: `Sesión de Estrategia Remota — ${cityName}`,
      summary: `Un profesional en ${cityName} buscaba orientación sin depender solo de acciones volátiles.`,
      outcome:
        "Entregamos una revisión de fortaleza financiera virtual con recomendaciones de jubilación, beneficios en vida y patrimonio.",
    },
    {
      title: "Protección Nacional de 401(k)",
      summary: "Un cliente cerca de jubilarse buscaba protección del principal tras años en el mercado.",
      outcome: "Rollover a vehículos fiscalmente ventajosos con protección de caídas.",
    },
  ];
}

function templateEs(loc: LocationEntry): LocationEsOverride {
  return {
    headline: `Planificación Financiera en ${loc.name}, ${loc.stateAbbr}`,
    subheadline: `Firma nacional con sede en Pasadena, CA. Sesiones virtuales para ${loc.name}, ${loc.stateName} — jubilación, beneficios en vida, patrimonio y legado generacional.`,
    localChallenges: [
      `Decisiones de rollover 401(k) y pensión para residentes de ${loc.name}`,
      "Protección de ingreso familiar ante enfermedad crítica",
      "Estrategias de legado fiscalmente eficientes a nivel nacional",
    ],
    caseStudies: nationalCaseStudiesEs(loc.name),
  };
}

export function localizeLocation(loc: LocationEntry, locale: SiteLocale): LocalizedLocation {
  if (locale === "en") {
    return { ...loc, locale: "en" };
  }

  const key = `${loc.state}/${loc.city}`;
  const override = ES_OVERRIDES[key] ?? templateEs(loc);

  return {
    ...loc,
    locale: "es",
    region: override.region ?? loc.region,
    headline: override.headline ?? loc.headline,
    subheadline: override.subheadline ?? loc.subheadline,
    localChallenges: override.localChallenges ?? loc.localChallenges,
    services: override.services ?? CORE_SERVICES_ES,
    dropdownOptions: override.dropdownOptions ?? DEFAULT_DROPDOWN_ES,
    caseStudies: override.caseStudies ?? loc.caseStudies,
    legacyPillarHref: override.legacyPillarHref ?? loc.legacyPillarHref,
  };
}

export const LOCATION_UI = {
  en: {
    eyebrowLocal: "Pasadena HQ · Local & National Service",
    eyebrowNational: "Nationwide Service · Pasadena, CA Headquarters",
    bookSession: "Book a Free Strategy Session",
    call: "Call",
    legacyLink: "Also see our dedicated",
    legacyLinkSuffix: "service pillar page",
    legacyLinkFor: "for",
    hq: "Headquarters",
    serving: "Serving",
    nationwide: "nationwide (US)",
    languages: "Languages",
    languagesValue: "English & Spanish",
    challengesTitle: (city: string) => `Local Challenges We Address in ${city}`,
    servicesTitle: (city: string) => `Services for ${city} Families`,
    servicesSub: "Insurance-based financial fortresses — not market-only stock picking.",
    serviceBody: (stateAbbr: string) =>
      `Personalized strategy sessions available in-person for Southern California clients and virtually for ${stateAbbr} and nationwide households.`,
    caseStudiesTitle: (region: string) => `Client Success Stories — ${region}`,
    outcome: "Outcome:",
    faqTitle: (city: string, stateAbbr: string) => `Financial Planning FAQ — ${city}, ${stateAbbr}`,
    formTitle: (city: string) => `Speak with an Advisor Serving ${city}`,
    formSubtitle: (city: string, stateName: string) =>
      `Request a complimentary consultation. We serve ${city}, ${stateName}, and clients across the United States from our Pasadena headquarters.`,
    langToggle: "Español",
    langToggleHref: (state: string, city: string) => `/es/locations/${state}/${city}`,
  },
  es: {
    eyebrowLocal: "Sede Pasadena · Servicio Local y Nacional",
    eyebrowNational: "Servicio Nacional · Sede en Pasadena, CA",
    bookSession: "Agendar Sesión de Estrategia Gratuita",
    call: "Llamar",
    legacyLink: "También visite nuestra",
    legacyLinkSuffix: "página de servicio dedicada",
    legacyLinkFor: "para",
    hq: "Sede",
    serving: "Sirviendo",
    nationwide: "a nivel nacional (EE. UU.)",
    languages: "Idiomas",
    languagesValue: "Inglés y Español",
    challengesTitle: (city: string) => `Desafíos Locales que Atendemos en ${city}`,
    servicesTitle: (city: string) => `Servicios para Familias en ${city}`,
    servicesSub: "Fortalezas financieras basadas en seguros — no solo acciones del mercado.",
    serviceBody: (stateAbbr: string) =>
      `Sesiones personalizadas en persona para el sur de California y virtualmente para ${stateAbbr} y hogares en todo el país.`,
    caseStudiesTitle: (region: string) => `Historias de Éxito — ${region}`,
    outcome: "Resultado:",
    faqTitle: (city: string, stateAbbr: string) => `Preguntas Frecuentes — ${city}, ${stateAbbr}`,
    formTitle: (city: string) => `Hable con un Asesor que Sirve ${city}`,
    formSubtitle: (city: string, stateName: string) =>
      `Solicite una consulta gratuita. Servimos ${city}, ${stateName}, y clientes en todo Estados Unidos desde nuestra sede en Pasadena.`,
    langToggle: "English",
    langToggleHref: (state: string, city: string) => `/locations/${state}/${city}`,
  },
} as const;

export function getLocationUi(locale: SiteLocale) {
  return LOCATION_UI[locale];
}
