"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TrustedPartners() {
  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");

  // Translations
  const title = isSpanish ? "Nuestros Socios de Confianza" : "Our Trusted Partners";
  const engineeredBy = isSpanish ? "Aplicación Web Diseñada y Optimizada por:" : "Enterprise Web App Engineered by:";

  // Array of objects for better SEO alt tags
  const partners = [
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/uv-insurance-logo.svg", alt: "UV Insurance" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/ia-logo.svg", alt: "iA Financial Group" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/empire-logo.svg", alt: "Empire Life" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/bluecross-logo.png", alt: "Blue Cross" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/logo-desjardins-en.svg", alt: "Desjardins" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/06/Trustage-Logo-new.svg", alt: "TruStage" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/mydignity-logo.png", alt: "MyDignity" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/assumption-logo-new-480x92.png", alt: "Assumption Life" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/humania-logo.png", alt: "Humania" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/serenia-life_logo.svg", alt: "Serenia Life" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/cpp-logo-en-480x403.png", alt: "CPP" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/manulife-logo-en.svg", alt: "Manulife" },
    { src: "https://experiorfinancial.com/wp-content/uploads/2024/03/beneva-logo.svg", alt: "Beneva" }
  ];

  return (
    <section className="trusted-partners fade-in" style={{ padding: "5rem 0 4rem", background: "var(--bg-page)" }}>
      <div className="container">
        
        {/* INSURANCE PARTNERS MARQUEE */}
        <h2 className="text-center" style={{ fontSize: "2.2rem", marginBottom: "3rem", color: "var(--text-main)" }}>
          {title}
        </h2>
        <div className="marquee-container" style={{ marginBottom: "4rem" }}>
          <div className="marquee-track">
            {/* Render the logos twice so it creates an infinite scrolling effect */}
            {[...partners, ...partners].map((partner, index) => (
              <div className="marquee-item" key={index}>
                <img src={partner.src} alt={partner.alt} loading="lazy" style={{ maxHeight: "45px", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>

        {/* HPO.CENTER DIGITAL PARTNER BADGE */}
        <div 
          className="hpo-badge"
          style={{ 
            textAlign: "center", 
            borderTop: "1px solid var(--border-light)", 
            paddingTop: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span style={{ 
            color: "var(--text-muted)", 
            fontSize: "0.85rem", 
            textTransform: "uppercase", 
            letterSpacing: "2px", 
            marginBottom: "1rem",
            fontWeight: 500
          }}>
            {engineeredBy}
          </span>
          
          <a 
            href="https://www.hpo.center" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", transition: "transform 0.3s ease" }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {/* If you have a specific PNG/SVG logo file, you can uncomment this img tag: */}
            {/* <img src="/hpo-logo.png" alt="HPO Center Web Development" style={{ height: "40px" }} /> */}
            
            {/* This is a beautifully styled, fallback CSS logo until you drop your image file in */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "var(--font-heading)",
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-1px"
            }}>
              HPO<span style={{ color: "var(--gold)" }}>.Center</span>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}