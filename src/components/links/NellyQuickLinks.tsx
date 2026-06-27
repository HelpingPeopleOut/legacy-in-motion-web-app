import Link from "next/link";
import { advisorHeadshot } from "@/lib/advisor-media";
import { BUSINESS } from "@/lib/business";
import {
  NELLY_ON_SITE_ACTIONS,
  NELLY_ON_SITE_PATHS,
  NELLY_QUICK_FORMS,
  NELLY_SOCIAL,
} from "@/lib/nelly-links";

type NellyQuickLinksProps = {
  locale?: "en" | "es";
};

function SocialIcon({ network }: { network: "facebook" | "instagram" | "tiktok" }) {
  if (network === "facebook") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (network === "instagram") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.5a8.18 8.18 0 0 0 4.78 1.52V6.5a4.85 4.85 0 0 1-1.01-.81z" />
    </svg>
  );
}

export default function NellyQuickLinks({ locale = "en" }: NellyQuickLinksProps) {
  const isSpanish = locale === "es";
  const consultationHref = isSpanish
    ? NELLY_ON_SITE_PATHS.consultationEs
    : NELLY_ON_SITE_PATHS.consultation;

  return (
    <div className="nelly-linkhub">
      <div className="nelly-linkhub-inner">
        <header className="nelly-linkhub-header">
          <img
            src={advisorHeadshot.src}
            alt={isSpanish ? advisorHeadshot.alt.es : advisorHeadshot.alt.en}
            className="nelly-linkhub-avatar"
            width={120}
            height={120}
          />
          <h1 className="nelly-linkhub-name">Nelly Lara</h1>
          <p className="nelly-linkhub-title">
            {isSpanish ? "Asociada Financiera Senior" : "Senior Financial Associate"}
          </p>
          <p className="nelly-linkhub-brand">{BUSINESS.name}</p>
          <p className="nelly-linkhub-tagline">
            {isSpanish
              ? "Educación financiera, protección patrimonial y legado generacional — en inglés y español."
              : "Financial education, wealth protection & generational legacy — English & Spanish."}
          </p>
        </header>

        <div className="nelly-linkhub-social" aria-label={isSpanish ? "Redes sociales" : "Social media"}>
          {NELLY_SOCIAL.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nelly-linkhub-social-btn"
              aria-label={isSpanish ? social.labelEs : social.label}
            >
              <SocialIcon network={social.network} />
            </a>
          ))}
        </div>

        <nav className="nelly-linkhub-nav" aria-label={isSpanish ? "Enlaces rápidos" : "Quick links"}>
          <p className="nelly-linkhub-section-label">{isSpanish ? "Formularios rápidos" : "Quick forms"}</p>

          {NELLY_QUICK_FORMS.map((form) => (
            <a
              key={form.id}
              href={form.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`nelly-linkhub-card${form.accent === "gold" ? " nelly-linkhub-card--gold" : ""}`}
            >
              <span className="nelly-linkhub-card-title">{isSpanish ? form.labelEs : form.label}</span>
              <span className="nelly-linkhub-card-desc">{isSpanish ? form.descriptionEs : form.description}</span>
              <span className="nelly-linkhub-card-arrow" aria-hidden>
                →
              </span>
            </a>
          ))}

          <p className="nelly-linkhub-section-label">{isSpanish ? "Contacto directo" : "Direct contact"}</p>

          <a href={NELLY_ON_SITE_ACTIONS.phone} className="nelly-linkhub-card nelly-linkhub-card--outline">
            <span className="nelly-linkhub-card-title">
              {isSpanish ? "Llamar" : "Call"} {NELLY_ON_SITE_ACTIONS.phoneDisplay}
            </span>
            <span className="nelly-linkhub-card-desc">
              {isSpanish ? "Hable con Nelly hoy" : "Speak with Nelly today"}
            </span>
          </a>

          <Link href={consultationHref} className="nelly-linkhub-card nelly-linkhub-card--gold">
            <span className="nelly-linkhub-card-title">
              {isSpanish ? "Agendar consulta gratuita" : "Book a free consultation"}
            </span>
            <span className="nelly-linkhub-card-desc">
              {isSpanish ? "En el sitio web de Legacy in Motion" : "On the Legacy in Motion website"}
            </span>
          </Link>

          <Link href={isSpanish ? "/es" : "/"} className="nelly-linkhub-card nelly-linkhub-card--outline">
            <span className="nelly-linkhub-card-title">
              {isSpanish ? "Visitar sitio completo" : "Visit full website"}
            </span>
            <span className="nelly-linkhub-card-desc">legacyinmotion.org</span>
          </Link>
        </nav>

        <footer className="nelly-linkhub-footer">
          <p>
            {isSpanish ? "Pasadena, CA · Servicio nacional (EE. UU.)" : "Pasadena, CA · Nationwide US service"}
          </p>
          <p className="nelly-linkhub-footer-partner">{BUSINESS.partner}</p>
        </footer>
      </div>
    </div>
  );
}
