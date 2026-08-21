import Link from "next/link";
import type { SiteLocale } from "@/lib/locations";

export type RelatedLink = {
  href: string;
  label: string;
};

type RelatedIntentLinksProps = {
  locale?: SiteLocale;
  links: RelatedLink[];
  title?: string;
};

/**
 * Quiet internal-link band for SEO — lives near the footer, never in the hero.
 * Keep real <a> hrefs for crawlers; presentation stays calm and on-brand.
 */
export default function RelatedIntentLinks({
  locale = "en",
  links,
  title,
}: RelatedIntentLinksProps) {
  const isSpanish = locale === "es";
  const heading =
    title ?? (isSpanish ? "Seguir explorando" : "Continue exploring");
  const eyebrow = isSpanish ? "Rutas populares" : "Popular paths";

  if (!links.length) return null;

  return (
    <section
      className="related-intent-links"
      aria-labelledby="related-intent-heading"
    >
      <div className="container related-intent-inner">
        <p className="related-intent-eyebrow">{eyebrow}</p>
        <h2 id="related-intent-heading" className="related-intent-title">
          {heading}
        </h2>
        <ul className="related-intent-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="related-intent-link">
                <span>{link.label}</span>
                <span className="related-intent-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const DEFAULT_RELATED_EN: RelatedLink[] = [
  { href: "/request-callback", label: "Free strategy consultation" },
  { href: "/locations/california/pasadena", label: "Pasadena financial planning" },
  { href: "/locations", label: "All service locations" },
  { href: "/financial-education", label: "Financial education hub" },
  { href: "/retirement-planning-pasadena", label: "Retirement & 401(k) rollovers" },
  { href: "/living-benefits-life-insurance-los-angeles", label: "Living benefits life insurance" },
  { href: "/debt-free-wealth-strategy", label: "Debt-free wealth strategy" },
  { href: "/mortgage-protection-los-angeles", label: "Mortgage protection" },
];

export const DEFAULT_RELATED_ES: RelatedLink[] = [
  { href: "/es/solicitar-llamada", label: "Consulta de estrategia gratuita" },
  { href: "/es/locations/california/pasadena", label: "Planificación en Pasadena" },
  { href: "/es/locations", label: "Todas las ubicaciones" },
  { href: "/es/educacion-financiera", label: "Centro de educación financiera" },
  { href: "/es/planificacion-de-jubilacion-los-angeles", label: "Jubilación y rollovers 401(k)" },
  { href: "/es/beneficios-en-vida-los-angeles", label: "Beneficios en vida" },
  { href: "/es/estrategia-libre-de-deudas", label: "Estrategia libre de deudas" },
  { href: "/es/proteccion-de-hipoteca-los-angeles", label: "Protección de hipoteca" },
];
