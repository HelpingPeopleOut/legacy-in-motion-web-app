"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, Phone, X } from "lucide-react";
import {
  NELLY_ON_SITE_ACTIONS,
  NELLY_QUICK_FORMS,
  NELLY_SOCIAL,
} from "@/lib/nelly-links";

function SocialGlyph({ network }: { network: "facebook" | "instagram" | "tiktok" }) {
  if (network === "facebook") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (network === "instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.5a8.18 8.18 0 0 0 4.78 1.52V6.5a4.85 4.85 0 0 1-1.01-.81z" />
    </svg>
  );
}

export default function HomeQuickLinksDock() {
  const pathname = usePathname() ?? "";
  const isSpanish = pathname.startsWith("/es");
  const isHome = pathname === "/" || pathname === "/es";
  const [open, setOpen] = useState(false);

  const t = {
    toggle: isSpanish ? "Enlaces rápidos" : "Quick Links",
    forms: isSpanish ? "Formularios" : "Quick forms",
    viewAll: isSpanish ? "Ver todos los enlaces" : "View all links",
    call: isSpanish ? "Llamar" : "Call",
    book: isSpanish ? "Consulta gratis" : "Free consultation",
    close: isSpanish ? "Cerrar" : "Close",
  };

  const linksHub = isSpanish ? NELLY_ON_SITE_ACTIONS.linksHubEs : NELLY_ON_SITE_ACTIONS.linksHub;
  const consultation = isSpanish
    ? NELLY_ON_SITE_ACTIONS.consultationEs
    : NELLY_ON_SITE_ACTIONS.consultation;

  const featuredForms = NELLY_QUICK_FORMS.slice(0, 3);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!isHome) return null;

  return (
    <div className={`home-quick-links-dock${open ? " home-quick-links-dock--open" : ""}`}>
      {open && (
        <div
          className="home-quick-links-backdrop"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      <div className="home-quick-links-panel" role="dialog" aria-modal={open} aria-label={t.toggle}>
        {open && (
          <div className="home-quick-links-panel-inner">
            <div className="home-quick-links-panel-head">
              <p className="home-quick-links-panel-title">{t.toggle}</p>
              <button
                type="button"
                className="home-quick-links-close"
                onClick={() => setOpen(false)}
                aria-label={t.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="home-quick-links-section">{t.forms}</p>
            <ul className="home-quick-links-list">
              {featuredForms.map((form) => (
                <li key={form.id}>
                  <a
                    href={form.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`home-quick-links-item${form.accent === "gold" ? " home-quick-links-item--gold" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="home-quick-links-item-title">
                      {isSpanish ? form.labelEs : form.label}
                    </span>
                    <span className="home-quick-links-item-desc">
                      {isSpanish ? form.descriptionEs : form.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="home-quick-links-social" aria-label="Social">
              {NELLY_SOCIAL.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-quick-links-social-btn"
                  aria-label={isSpanish ? s.labelEs : s.label}
                >
                  <SocialGlyph network={s.network} />
                </a>
              ))}
            </div>

            <div className="home-quick-links-actions">
              <Link href={linksHub} className="home-quick-links-all" onClick={() => setOpen(false)}>
                {t.viewAll} →
              </Link>
              <a href={NELLY_ON_SITE_ACTIONS.phone} className="home-quick-links-mini">
                <Phone className="h-3.5 w-3.5" />
                {t.call}
              </a>
              <Link href={consultation} className="home-quick-links-mini home-quick-links-mini--gold" onClick={() => setOpen(false)}>
                {t.book}
              </Link>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="home-quick-links-toggle btn-pulse"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Link2 className="h-5 w-5" aria-hidden />
        <span>{t.toggle}</span>
      </button>
    </div>
  );
}
