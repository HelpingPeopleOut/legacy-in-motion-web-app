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

/** Internal link cluster for pillar pages — hub ↔ services ↔ locations ↔ contact. */
export default function RelatedIntentLinks({
  locale = "en",
  links,
  title,
}: RelatedIntentLinksProps) {
  const isSpanish = locale === "es";
  const heading =
    title ?? (isSpanish ? "Explorar rutas relacionadas" : "Explore related paths");

  if (!links.length) return null;

  return (
    <nav
      className="related-intent-links fade-in"
      aria-label={isSpanish ? "Enlaces relacionados" : "Related links"}
    >
      <div className="container">
        <h2 className="related-intent-title">{heading}</h2>
        <ul className="related-intent-list">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
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
