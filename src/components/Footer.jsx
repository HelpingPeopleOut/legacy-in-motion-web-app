"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NELLY_SOCIAL } from "@/lib/nelly-links";

export default function Footer() {
  // Grab the current URL path to detect language
  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");

  // Base path for links so they stay within their current language
  const base = isSpanish ? "/es" : "";

  // Auto-switching translation dictionary
  const text = {
    sub: isSpanish 
      ? "Nelly Lara | Asociada Financiera Senior | Orgullosamente asociada con Experior Financial Group Inc." 
      : "Nelly Lara | Senior Financial Associate | Proudly partnered with Experior Financial Group Inc.",
    home: isSpanish ? "Inicio" : "Home",
    mission: isSpanish ? "Misión" : "Mission",
    baby: "Freedom Financial Baby",
    workshops: isSpanish ? "Talleres" : "Workshops",
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
      : "Disclaimer: The information provided on this website is for educational purposes only and does not constitute financial, legal, or tax advice. Financial education and long-term financial planning should be tailored to individual circumstances. Please consult with a licensed professional regarding your specific situation before making investment decisions."
  };

  return (
    <footer>
      <div className="container text-center">
        <h3>Legacy in Motion</h3>
        <p className="footer-sub">
          {text.sub}
        </p>

        {/* --- ENTERPRISE 3-COLUMN FOOTER GRID --- */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "2rem", 
          margin: "3rem 0", 
          textAlign: "left" 
        }}>
          
          {/* Column 1: Company Links */}
          <div>
            <h4 style={{ color: "var(--gold)", marginBottom: "1.2rem", fontSize: "1.1rem" }}>{text.companyLabel}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <Link href={`${base}/`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{text.home}</Link>
              <Link href={`${base}/mission`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{text.mission}</Link>
              <Link href={`${base}/freedom-financial-baby`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{text.baby}</Link>
              <Link href={`${base}/workshops`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{text.workshops}</Link>
            </div>
          </div>

          {/* Column 2: SEO Pillar Pages (Dynamic by Language) */}
          <div>
            <h4 style={{ color: "var(--gold)", marginBottom: "1.2rem", fontSize: "1.1rem" }}>{text.servicesLabel}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {isSpanish ? (
                <>
                  <Link href="/es/planificacion-de-jubilacion-los-angeles" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Planificación de Jubilación</Link>
                  <Link href="/es/beneficios-en-vida-los-angeles" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Beneficios en Vida</Link>
                  <Link href="/es/estrategia-libre-de-deudas" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Estrategia Libre de Deudas</Link>
                  <Link href="/es/proteccion-de-hipoteca-los-angeles" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Protección de Hipoteca</Link>
                  <Link href="/es/estrategias-financieras-para-negocios" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Estrategias para Negocios</Link>
                </>
              ) : (
                <>
                  <Link href="/retirement-planning-pasadena" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Retirement & Rollovers</Link>
                  <Link href="/estate-business-planning-los-angeles" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Estate & Business Planning</Link>
                  <Link href="/generational-wealth-arcadia-sgv" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Generational Wealth</Link>
                  <Link href="/living-benefits-life-insurance-los-angeles" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Living Benefits Protection</Link>
                  <Link href="/debt-free-wealth-strategy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Debt Elimination Strategy</Link>
                  <Link href="/mortgage-protection-los-angeles" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Mortgage Protection</Link>
                  <Link href="/business-owner-financial-strategies" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Business Owner Strategies</Link>
                </>
              )}
              {/* Link to the Master Directory in both languages */}
              <Link href="/service-areas" style={{ color: "var(--text-main)", textDecoration: "none", fontWeight: 600, marginTop: "0.5rem" }}>{text.areasLabel}</Link>
            </div>
          </div>

          {/* Column 3: Contact & Action */}
          <div>
            <h4 style={{ color: "var(--gold)", marginBottom: "1.2rem", fontSize: "1.1rem" }}>{text.contactLabel}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <a href="tel:626-203-7652" style={{ color: "var(--text-muted)", textDecoration: "none" }}>{text.call}: (626) 203-7652</a>
              <Link href={`${base}/#consultation`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{text.book}</Link>
              <Link href={`${base}/links`} style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>{text.quickLinks}</Link>
            </div>
            <div className="footer-social-row" style={{ marginTop: "1.25rem" }}>
              <p style={{ color: "var(--gold)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.65rem" }}>{text.follow}</p>
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
        {/* ------------------------------------------- */}

        <div style={{ borderTop: "1px solid var(--border-light)", padding: "2rem 0 0 0" }}>
          <p
            style={{
              color: "#666666",
              fontSize: "0.85rem",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            {text.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}