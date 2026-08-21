"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { advisorHeadshot } from "@/lib/advisor-media";
import { BUSINESS } from "@/lib/business";
import {
  NELLY_ON_SITE_ACTIONS,
  NELLY_ON_SITE_PATHS,
  NELLY_QUICK_FORMS,
  NELLY_SOCIAL,
} from "@/lib/nelly-links";
import {
  ArrowUpRight,
  Baby,
  BookOpen,
  FileText,
  Globe,
  Phone,
  Shield,
  Sparkles,
} from "lucide-react";

type NellyQuickLinksProps = {
  locale?: "en" | "es";
};

const FORM_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "learn-money": BookOpen,
  interview: FileText,
  "life-quote": Shield,
  "children-account": Baby,
};

function SocialIcon({ network }: { network: "facebook" | "instagram" | "tiktok" }) {
  if (network === "facebook") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (network === "instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.5a8.18 8.18 0 0 0 4.78 1.52V6.5a4.85 4.85 0 0 1-1.01-.81z" />
    </svg>
  );
}

export default function NellyQuickLinks({ locale = "en" }: NellyQuickLinksProps) {
  const pathname = usePathname() ?? "";
  const isSpanish = locale === "es" || pathname.startsWith("/es");
  const consultationHref = isSpanish
    ? NELLY_ON_SITE_PATHS.consultationEs
    : NELLY_ON_SITE_PATHS.consultation;
  const linksHref = isSpanish ? NELLY_ON_SITE_PATHS.linksHubEs : NELLY_ON_SITE_PATHS.linksHub;
  const homeHref = isSpanish ? "/es" : "/";

  const t = {
    eyebrow: isSpanish ? "Centro de enlaces" : "Link hub",
    forms: isSpanish ? "Formularios rápidos" : "Quick forms",
    contact: isSpanish ? "Contacto directo" : "Direct contact",
    call: isSpanish ? "Llamar" : "Call",
    links: isSpanish ? "Enlaces" : "Links",
    book: isSpanish ? "Consulta gratis" : "Request Consultation",
    visitSite: isSpanish ? "Visitar sitio completo" : "Visit full website",
    bookTitle: isSpanish ? "Agendar consulta gratuita" : "Book a free consultation",
    bookDesc: isSpanish ? "En el sitio web de Legacy in Motion" : "On the Legacy in Motion website",
    callDesc: isSpanish ? "Hable con Nelly hoy" : "Speak with Nelly today",
    tagline: isSpanish
      ? "Educación financiera, protección patrimonial y legado generacional — en inglés y español."
      : "Financial education, wealth protection & generational legacy — English & Spanish.",
    title: isSpanish ? "Asociada Financiera Senior" : "Senior Financial Associate",
    location: isSpanish ? "Pasadena, CA · Servicio nacional (EE. UU.)" : "Pasadena, CA · Nationwide US service",
  };

  return (
    <div className="nelly-linkhub-app">
      <div className="nelly-linkhub-app-scroll">
        <div className="nelly-linkhub-inner">
          <header className="nelly-linkhub-hero">
            <div className="nelly-linkhub-hero-glow" aria-hidden />
            <img
              src={advisorHeadshot.src}
              alt={isSpanish ? advisorHeadshot.alt.es : advisorHeadshot.alt.en}
              className="nelly-linkhub-avatar"
              width={120}
              height={120}
            />
            <p className="nelly-linkhub-eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {t.eyebrow}
            </p>
            <h1 className="nelly-linkhub-name">Nelly Lara</h1>
            <p className="nelly-linkhub-title">{t.title}</p>
            <p className="nelly-linkhub-brand">{BUSINESS.name}</p>
            <p className="nelly-linkhub-tagline">{t.tagline}</p>
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
            <p className="nelly-linkhub-section-label">{t.forms}</p>

            {NELLY_QUICK_FORMS.map((form) => {
              const Icon = FORM_ICONS[form.id] ?? FileText;
              return (
                <a
                  key={form.id}
                  href={form.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`nelly-linkhub-card${form.accent === "gold" ? " nelly-linkhub-card--gold" : ""}`}
                >
                  <span className="nelly-linkhub-card-icon" aria-hidden>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="nelly-linkhub-card-body">
                    <span className="nelly-linkhub-card-title">{isSpanish ? form.labelEs : form.label}</span>
                    <span className="nelly-linkhub-card-desc">
                      {isSpanish ? form.descriptionEs : form.description}
                    </span>
                  </span>
                  <ArrowUpRight className="nelly-linkhub-card-arrow-icon" aria-hidden />
                </a>
              );
            })}

            <p className="nelly-linkhub-section-label">{t.contact}</p>

            <a href={NELLY_ON_SITE_ACTIONS.phone} className="nelly-linkhub-card nelly-linkhub-card--outline">
              <span className="nelly-linkhub-card-icon" aria-hidden>
                <Phone className="h-4 w-4" />
              </span>
              <span className="nelly-linkhub-card-body">
                <span className="nelly-linkhub-card-title">
                  {t.call} {NELLY_ON_SITE_ACTIONS.phoneDisplay}
                </span>
                <span className="nelly-linkhub-card-desc">{t.callDesc}</span>
              </span>
              <ArrowUpRight className="nelly-linkhub-card-arrow-icon" aria-hidden />
            </a>

            <Link href={consultationHref} className="nelly-linkhub-card nelly-linkhub-card--gold">
              <span className="nelly-linkhub-card-icon" aria-hidden>
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="nelly-linkhub-card-body">
                <span className="nelly-linkhub-card-title">{t.bookTitle}</span>
                <span className="nelly-linkhub-card-desc">{t.bookDesc}</span>
              </span>
              <ArrowUpRight className="nelly-linkhub-card-arrow-icon" aria-hidden />
            </Link>

            <Link href={homeHref} className="nelly-linkhub-card nelly-linkhub-card--outline">
              <span className="nelly-linkhub-card-icon" aria-hidden>
                <Globe className="h-4 w-4" />
              </span>
              <span className="nelly-linkhub-card-body">
                <span className="nelly-linkhub-card-title">{t.visitSite}</span>
                <span className="nelly-linkhub-card-desc">legacyinmotion.org</span>
              </span>
              <ArrowUpRight className="nelly-linkhub-card-arrow-icon" aria-hidden />
            </Link>
          </nav>

          <footer className="nelly-linkhub-footer">
            <p>{t.location}</p>
            <p className="nelly-linkhub-footer-partner">{BUSINESS.partner}</p>
          </footer>
        </div>
      </div>

      <div className="nelly-linkhub-dock" role="toolbar" aria-label={isSpanish ? "Acciones rápidas" : "Quick actions"}>
        <a href={NELLY_ON_SITE_ACTIONS.phone} className="nelly-linkhub-dock-btn">
          <Phone className="h-4 w-4" aria-hidden />
          {t.call}
        </a>
        <Link href={linksHref} className="nelly-linkhub-dock-btn nelly-linkhub-dock-btn--active" aria-current="page">
          {t.links}
        </Link>
        <Link href={consultationHref} className="nelly-linkhub-dock-btn nelly-linkhub-dock-btn--primary">
          {t.book}
        </Link>
      </div>
    </div>
  );
}
