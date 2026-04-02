"use client";

import { usePathname } from "next/navigation";

export default function TrustedPartners() {
  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");

  const title = isSpanish ? "Nuestros Socios de Confianza" : "Our Trusted Partners";

  // The 13 partner logos extracted from Experior
  const logos = [
    "https://experiorfinancial.com/wp-content/uploads/2024/03/uv-insurance-logo.svg",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/ia-logo.svg",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/empire-logo.svg",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/bluecross-logo.png",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/logo-desjardins-en.svg",
    "https://experiorfinancial.com/wp-content/uploads/2024/06/Trustage-Logo-new.svg",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/mydignity-logo.png",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/assumption-logo-new-480x92.png",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/humania-logo.png",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/serenia-life_logo.svg",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/cpp-logo-en-480x403.png",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/manulife-logo-en.svg",
    "https://experiorfinancial.com/wp-content/uploads/2024/03/beneva-logo.svg"
  ];

  return (
    <section className="trusted-partners fade-in">
      <div className="container">
        <h2 className="text-center" style={{ fontSize: "2.2rem", marginBottom: "3rem", color: "var(--text-main)" }}>
          {title}
        </h2>
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Render the logos twice so it creates an infinite scrolling effect */}
            {[...logos, ...logos].map((src, index) => (
              <div className="marquee-item" key={index}>
                <img src={src} alt="Trusted Insurance Partner" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}