"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NELLY_SOCIAL } from "@/lib/nelly-links";

export default function Footer() {
  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");
  const base = isSpanish ? "/es" : "";

  const text = {
    sub: isSpanish
      ? "Nelly Lara | Asociada Financiera Senior | Orgullosamente asociada con Experior Financial Group Inc."
      : "Nelly Lara | Senior Financial Associate | Proudly partnered with Experior Financial Group Inc.",
    home: isSpanish ? "Inicio" : "Home",
    mission: isSpanish ? "Misión" : "Mission",
    baby: "Freedom Financial Baby",
    workshops: isSpanish ? "Talleres" : "Workshops",
    education: isSpanish ? "Educación Financiera" : "Financial Education",
    companyLabel: isSpanish ? "Compañía" : "Company",
    servicesLabel: isSpanish ? "Nuestros Servicios" : "Our Expertise",
    contactLabel: isSpanish ? "Contacto" : "Contact",
    areasLabel: isSpanish ? "Áreas de Servicio" : "Areas We Serve",
    call: isSpanish ? "Llamar" : "Call",
    book: isSpanish ? "Agendar una Asesoría" : "Book a Consultation",
    quickLinks: isSpanish ? "Enlaces Rápidos" : "Quick Links",
    follow: isSpanish ? "Síguenos" : "Follow Nelly",
    disclaimer: isSpanish
      ? "Aviso legal: La información proporcionada en este sitio web es solo para fines educativos y no constituye asesoramiento financiero, legal o fiscal. La educación financiera y la planificación financiera a largo plazo deben adaptarse a las circunstancias individuales. Consulte con un profesional con licencia sobre su situación específica antes de tomar decisiones de inversión."
      : "Disclaimer: The information provided on this website is for educational purposes only and does not constitute financial, legal, or tax advice. Financial education and long-term financial planning should be tailored to individual circumstances. Please consult with a licensed professional regarding your specific situation before making investment decisions.",
    verse: isSpanish
      ? "Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo."
      : "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
    verseRef: isSpanish ? "Juan 16:33" : "John 16:33",
  };

  return (
    <footer>
      <div className="container text-center">
        <h3>Legacy in Motion</h3>
        <p className="footer-sub">{text.sub}</p>

        <div className="footer-grid">
          <div>
            <h4>{text.companyLabel}</h4>
            <div className="footer-col-links">
              <Link href={`${base}/`} className="footer-link">{text.home}</Link>
              <Link href={`${base}/mission`} className="footer-link">{text.mission}</Link>
              <Link href={`${base}/freedom-financial-baby`} className="footer-link">{text.baby}</Link>
              <Link href={`${base}/workshops`} className="footer-link">{text.workshops}</Link>
              <Link href={isSpanish ? "/es/educacion-financiera" : "/financial-education"} className="footer-link">{text.education}</Link>
            </div>
          </div>

          <div>
            <h4>{text.servicesLabel}</h4>
            <div className="footer-col-links">
              {isSpanish ? (
                <>
                  <Link href="/es/planificacion-de-jubilacion-los-angeles" className="footer-link">Planificación de Jubilación</Link>
                  <Link href="/es/beneficios-en-vida-los-angeles" className="footer-link">Beneficios en Vida</Link>
                  <Link href="/es/estrategia-libre-de-deudas" className="footer-link">Estrategia Libre de Deudas</Link>
                  <Link href="/es/proteccion-de-hipoteca-los-angeles" className="footer-link">Protección de Hipoteca</Link>
                  <Link href="/es/estrategias-financieras-para-negocios" className="footer-link">Estrategias para Negocios</Link>
                </>
              ) : (
                <>
                  <Link href="/retirement-planning-pasadena" className="footer-link">Retirement & Rollovers</Link>
                  <Link href="/estate-business-planning-los-angeles" className="footer-link">Estate & Business Planning</Link>
                  <Link href="/generational-wealth-arcadia-sgv" className="footer-link">Generational Wealth</Link>
                  <Link href="/living-benefits-life-insurance-los-angeles" className="footer-link">Living Benefits Protection</Link>
                  <Link href="/debt-free-wealth-strategy" className="footer-link">Debt Elimination Strategy</Link>
                  <Link href="/mortgage-protection-los-angeles" className="footer-link">Mortgage Protection</Link>
                  <Link href="/business-owner-financial-strategies" className="footer-link">Business Owner Strategies</Link>
                </>
              )}
              <Link href="/service-areas" className="footer-link footer-link--gold">{text.areasLabel}</Link>
            </div>
          </div>

          <div>
            <h4>{text.contactLabel}</h4>
            <div className="footer-col-links">
              <a href="tel:626-203-7652" className="footer-link">{text.call}: (626) 203-7652</a>
              <Link href={`${base}/#consultation`} className="footer-link">{text.book}</Link>
              <Link href={`${base}/links`} className="footer-link footer-link--gold">{text.quickLinks}</Link>
            </div>
            <div className="footer-social-row" style={{ marginTop: "1.25rem" }}>
              <p className="footer-follow-label">{text.follow}</p>
              <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                {NELLY_SOCIAL.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={isSpanish ? social.labelEs : social.label}
                  >
                    {isSpanish ? social.labelEs : social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-verse">
          <p className="footer-verse-text">&ldquo;{text.verse}&rdquo;</p>
          <p className="footer-verse-ref">– {text.verseRef}</p>
        </div>

        <div className="footer-hpo-credit">
          <p className="footer-hpo-label">
            {isSpanish ? "Aplicación Web Diseñada y Optimizada por:" : "Enterprise Web App Engineered by:"}
          </p>
          <a
            href="https://www.hpo.center"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-hpo-link"
            aria-label="HPO.Center — Helping People Out"
          >
            <img
              src="/images/hpo-center-logo.webp"
              alt="HPO.Center"
              width={56}
              height={56}
              className="footer-hpo-logo"
              loading="lazy"
              decoding="async"
            />
            <span className="footer-hpo-text">
              <span className="footer-hpo-name">
                HPO<span className="footer-hpo-dot">.Center</span>
              </span>
              <span className="footer-hpo-tagline">Helping People Out</span>
            </span>
          </a>
        </div>

        <div className="footer-disclaimer-wrap">
          <p className="footer-disclaimer">{text.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
