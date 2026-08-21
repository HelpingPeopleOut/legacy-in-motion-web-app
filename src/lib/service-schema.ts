import { BUSINESS } from "@/lib/business";
import type { FaqItem } from "@/lib/ai-enterprise";
import { buildSiteUrl } from "@/lib/seo-metadata";

type JsonLd = Record<string, unknown>;

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  locale?: "en" | "es";
  areaServed?: Array<{ type?: string; name: string; state?: string }>;
  relatedPaths?: Array<{ name: string; path: string }>;
  faqs?: FaqItem[];
};

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

/** Service + BreadcrumbList (+ optional FAQPage) for marketing pillar pages. */
export function buildServicePageSchema(input: ServiceSchemaInput): JsonLd {
  const locale = input.locale ?? "en";
  const pageUrl = buildSiteUrl(input.path);
  const orgId = `${BUSINESS.url}/#organization`;
  const homeUrl = locale === "es" ? buildSiteUrl("/es") : BUSINESS.url;
  const contactUrl =
    locale === "es" ? buildSiteUrl("/es/solicitar-llamada") : buildSiteUrl("/request-callback");

  const areaServed =
    input.areaServed?.map((area) =>
      area.state
        ? {
            "@type": area.type ?? "City",
            name: area.name,
            containedInPlace: { "@type": "State", name: area.state },
          }
        : { "@type": area.type ?? "Place", name: area.name }
    ) ?? [
      { "@type": "City", name: "Pasadena", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "Country", name: "United States" },
    ];

  const graph: JsonLd[] = [
    {
      "@type": ["Service", "FinancialService"],
      "@id": `${pageUrl}#service`,
      name: input.name,
      description: input.description,
      url: pageUrl,
      provider: { "@id": orgId },
      telephone: BUSINESS.phone,
      areaServed,
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: contactUrl,
        servicePhone: BUSINESS.phone,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "es" ? "Inicio" : "Home",
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: input.name,
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${pageUrl}#local`,
      name: `${BUSINESS.name} — ${input.name}`,
      url: pageUrl,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      address: postalAddress(),
      image: BUSINESS.logo,
      parentOrganization: { "@id": orgId },
      areaServed,
    },
  ];

  if (input.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: input.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  if (input.relatedPaths?.length) {
    graph.push({
      "@type": "ItemList",
      "@id": `${pageUrl}#related`,
      itemListElement: input.relatedPaths.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: buildSiteUrl(item.path),
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
