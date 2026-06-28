"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function TrustedPartners() {
  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");

  // Translations
  const title = isSpanish ? "Nuestros Socios de Confianza" : "Our Trusted Partners";

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
              <div className="marquee-item" key={index} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <Image 
                  src={partner.src} 
                  alt={partner.alt} 
                  width={160} 
                  height={45} 
                  style={{ objectFit: "contain", maxHeight: "45px", width: "auto" }} 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}