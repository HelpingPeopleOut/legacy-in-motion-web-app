import { ADVISOR_HEADSHOT_URL, BUSINESS, TRUST } from "@/lib/business";
import {
  GLOBAL_FAQS,
  PRINCIPAL,
  SERVICE_CATALOG,
  type FaqItem,
} from "@/lib/ai-enterprise";
import { getSocialUrls } from "@/lib/nelly-links";
import type { LocationEntry, SiteLocale } from "@/lib/locations";
import { getLocationPath } from "@/lib/locations";
import { localizeLocation } from "@/lib/locations-i18n";
import { buildSiteUrl } from "@/lib/seo-metadata";

type JsonLd = Record<string, unknown>;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  };
}

function buildFaqNode(faqs: FaqItem[], id: string): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildOfferCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Legacy in Motion — Complete Financial Services",
    itemListElement: SERVICE_CATALOG.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.shortDescription,
        url: buildSiteUrl(service.pageUrl),
        provider: { "@id": `${BUSINESS.url}/#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        audience: {
          "@type": "Audience",
          audienceType: service.audience.join(", "),
        },
      },
    })),
  };
}

/** Organization + LocalBusiness + Person + WebSite + FAQ graph for AI/search enterprise signals. */
export function buildOrganizationSchema(): JsonLd {
  const orgId = `${BUSINESS.url}/#organization`;
  const personId = `${BUSINESS.url}/#nelly-lara`;
  const websiteId = `${BUSINESS.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: BUSINESS.url,
        name: BUSINESS.name,
        description:
          "Bilingual wealth protection, retirement planning, living benefits life insurance, and estate planning — Pasadena, CA headquarters, nationwide US service.",
        inLanguage: ["en-US", "es-US"],
        publisher: { "@id": orgId },
        potentialAction: {
          "@type": "ContactAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: buildSiteUrl("/request-callback"),
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          name: "Request Free Financial Strategy Consultation",
        },
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: BUSINESS.url,
        logo: BUSINESS.logo,
        email: BUSINESS.email,
        telephone: BUSINESS.phone,
        address: postalAddress(),
        slogan: "Establish Your Financial Fortress",
        knowsAbout: PRINCIPAL.expertiseTopics,
        areaServed: { "@type": "Country", name: BUSINESS.nationalServiceArea },
        knowsLanguage: BUSINESS.languages,
        employee: { "@id": personId },
        hasOfferCatalog: buildOfferCatalog(),
        sameAs: [BUSINESS.url, buildSiteUrl("/links"), ...getSocialUrls()],
      },
      {
        "@type": "Person",
        "@id": personId,
        name: PRINCIPAL.name,
        jobTitle: PRINCIPAL.jobTitle,
        worksFor: {
          "@type": "Organization",
          name: PRINCIPAL.affiliation,
        },
        knowsAbout: PRINCIPAL.expertiseTopics,
        knowsLanguage: PRINCIPAL.languages,
        telephone: BUSINESS.phone,
        url: buildSiteUrl("/links"),
        image: buildSiteUrl(ADVISOR_HEADSHOT_URL),
        sameAs: getSocialUrls(),
        hasCredential: PRINCIPAL.credentials.map((name) => ({
          "@type": "EducationalOccupationalCredential",
          name,
          credentialCategory: "Professional qualification",
        })),
        alumniOf: {
          "@type": "Organization",
          name: TRUST.affiliation,
        },
        description: `${PRINCIPAL.name} is a ${PRINCIPAL.jobTitle} with ${PRINCIPAL.affiliation}, leading ${BUSINESS.name} — a bilingual, education-first financial planning practice focused on retirement, living benefits, estate planning, and generational wealth. ${TRUST.educationHighlight}.`,
      },
      {
        "@type": ["LocalBusiness", "FinancialService"],
        "@id": `${BUSINESS.url}/#localbusiness`,
        name: BUSINESS.name,
        description: `${BUSINESS.serviceType}. Headquartered in ${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion} with nationwide virtual service across the United States.`,
        url: BUSINESS.url,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        image: BUSINESS.logo,
        priceRange: "$$",
        address: postalAddress(),
        geo: {
          "@type": "GeoCoordinates",
          latitude: BUSINESS.geo.latitude,
          longitude: BUSINESS.geo.longitude,
        },
        parentOrganization: { "@id": orgId },
        areaServed: { "@type": "Country", name: "United States" },
        serviceArea: { "@type": "Country", name: "US" },
        hasOfferCatalog: buildOfferCatalog(),
        employee: { "@id": personId },
      },
      buildFaqNode(GLOBAL_FAQS, `${BUSINESS.url}/#faq`),
    ],
  };
}

export function buildLocationPageSchema(
  loc: LocationEntry,
  locationFaqs: FaqItem[],
  locale: SiteLocale = "en"
): JsonLd {
  const localized = localizeLocation(loc, locale);
  const pageUrl = buildSiteUrl(getLocationPath(loc, locale));
  const orgId = `${BUSINESS.url}/#organization`;
  const homeUrl = locale === "es" ? buildSiteUrl("/es") : BUSINESS.url;
  const locationsIndex = locale === "es" ? buildSiteUrl("/es/locations") : buildSiteUrl("/locations");

  const areaServed: JsonLd[] = [
    { "@type": "City", name: loc.name, containedInPlace: { "@type": "State", name: loc.stateName } },
    { "@type": "Country", name: "United States" },
  ];

  const serviceNode: JsonLd = {
    "@type": ["FinancialService", "ProfessionalService"],
    "@id": `${pageUrl}#service`,
    name: `${BUSINESS.name} — ${loc.name}, ${loc.stateAbbr}`,
    description: localized.subheadline,
    url: pageUrl,
    inLanguage: locale === "es" ? "es-US" : "en-US",
    telephone: BUSINESS.phone,
    provider: { "@id": orgId },
    areaServed,
    serviceArea: loc.geoRadiusMeters
      ? {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: loc.latitude,
            longitude: loc.longitude,
          },
          geoRadius: String(loc.geoRadiusMeters),
        }
      : { "@type": "Country", name: "US" },
    parentOrganization: { "@id": orgId },
    knowsAbout: localized.services,
  };

  const breadcrumb: JsonLd = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Ubicaciones" : "Locations", item: locationsIndex },
      { "@type": "ListItem", position: 3, name: `${loc.name}, ${loc.stateAbbr}`, item: pageUrl },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [serviceNode, breadcrumb, buildFaqNode(locationFaqs, `${pageUrl}#faq`)],
  };
}
