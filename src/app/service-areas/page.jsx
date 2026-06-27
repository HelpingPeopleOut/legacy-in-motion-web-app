"use client";

import { useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function ServiceAreasDirectory() {
  // Smooth fade-in scroll animation
  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  // --- GOD MODE REGIONAL SCHEMA ---
  // This explicitly maps her territory for AI and Google without a GBP
  const regionalSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion",
    "description": "Enterprise-grade wealth management, estate planning, and retirement optimization across Southern California.",
    "areaServed": [
      { "@type": "City", "name": "Pasadena" },
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "City", "name": "Santa Monica" },
      { "@type": "City", "name": "Arcadia" },
      { "@type": "City", "name": "Azusa" },
      { "@type": "City", "name": "Baldwin Park" },
      { "@type": "City", "name": "Covina" },
      { "@type": "City", "name": "West Covina" },
      { "@type": "City", "name": "El Monte" },
      { "@type": "Region", "name": "San Gabriel Valley" },
      { "@type": "State", "name": "California" }
    ]
  };

  return (
    <>
      {/* CRITICAL FIX: Removed illegal <title> and <meta> tags from client component to prevent React Error 418 Hydration Crash */}
      <Script 
        id="schema-regional-hub"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regionalSchema) }} 
      />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-dark)", color: "#fff" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.8rem", maxWidth: "900px", margin: "0 auto 1.5rem", color: "#fff" }}>
            Protecting Wealth Across <br/><span className="text-gold">Southern California</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#ccc" }}>
            From the San Gabriel Valley to the Westside, we architect custom financial fortresses for California families, public employees, and business owners.
          </p>
        </div>
      </section>

      {/* THE MASTER DIRECTORY GRID */}
      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.8rem" }}>Find Your Local Financial Hub</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "1rem auto 0" }}>
              Select your region below to discover customized strategies for local taxes, pensions, and estate laws.
            </p>
          </div>

          <div className="card-grid">
            {/* SGV / PASADENA HUB */}
            <article className="card" style={{ borderTop: "4px solid var(--gold)", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>San Gabriel Valley</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", flexGrow: 1 }}>
                Specialized planning for Pasadena, Arcadia, Azusa, Baldwin Park, Covina, and surrounding SGV communities. Focus areas include CalPERS management and generational wealth.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link href="/locations/california/pasadena" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Pasadena Hub (New)
                </Link>
                <Link href="/retirement-planning-pasadena" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Retirement Hub (Pasadena)
                </Link>
                <Link href="/generational-wealth-arcadia-sgv" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Wealth Hub (Arcadia)
                </Link>
              </div>
            </article>

            {/* LOS ANGELES / WESTSIDE HUB */}
            <article className="card" style={{ borderTop: "4px solid var(--gold)", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Greater Los Angeles</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", flexGrow: 1 }}>
                Serving the heart of LA through Santa Monica and the Westside. Focus areas include high-net-worth estate planning, living benefits, and executive bonuses.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link href="/locations/california/los-angeles" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Los Angeles Hub (New)
                </Link>
                <Link href="/estate-business-planning-los-angeles" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Estate & Business Hub (LA)
                </Link>
                <Link href="/living-benefits-life-insurance-los-angeles" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Living Benefits Hub (LA)
                </Link>
              </div>
            </article>

            {/* SPANISH / HISPANIC MARKET HUB */}
            <article className="card" style={{ borderTop: "4px solid var(--gold)", background: "var(--bg-card)", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Servicios en Español</h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", flexGrow: 1 }}>
                Asesoría financiera completa en su idioma. Proteja a su familia con seguros de vida con beneficios en vida y construya un legado generacional en California.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Link href="/es/planificacion-de-jubilacion-los-angeles" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Jubilación y Rollovers
                </Link>
                <Link href="/es/beneficios-en-vida-los-angeles" className="btn-outline" style={{ width: "100%", display: "block" }}>
                  Beneficios en Vida
                </Link>
              </div>
            </article>
          </div>
          <p className="text-center" style={{ marginTop: "2.5rem" }}>
            <Link href="/locations" className="btn-gold" style={{ display: "inline-block", padding: "0.85rem 1.5rem" }}>
              Browse All US Location Pages →
            </Link>
          </p>
        </div>
      </section>

      {/* GLOBAL LEAD CAPTURE FORM */}
      <GlobalLeadForm 
        title="Request Your Local Consultation" 
        subtitle="Fill out the form below. Our team will match you with the exact strategies needed for your specific California city."
        sourcePage="Master Service Areas Directory"
        dropdownOptions={[
          "Retirement & Pensions (401k/CalPERS)",
          "Living Benefits & Life Insurance",
          "Estate Planning & Trusts",
          "Business Exit & Executive Plans",
          "Generational Wealth Transfer"
        ]}
      />
    </>
  );
}