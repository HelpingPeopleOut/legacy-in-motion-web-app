"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    steps: isSpanish ? "Los 7 Pasos" : "The 7-Steps",
    mission: isSpanish ? "Misión" : "Mission",
    baby: "Freedom Financial Baby",
    workshops: isSpanish ? "Talleres" : "Workshops",
    call: isSpanish ? "Llamar" : "Call",
    disclaimer: isSpanish 
      ? "Aviso legal: La información proporcionada en este sitio web es solo para fines educativos y no constituye asesoramiento financiero, legal o fiscal. La educación financiera y la planificación financiera a largo plazo deben adaptarse a las circunstancias individuales. Consulte con un profesional con licencia sobre su situación específica antes de tomar decisiones de inversión." 
      : "Disclaimer: The information provided on this website is for educational purposes only and does not constitute financial, legal, or tax advice. Financial education and long-term financial planning should be tailored to individual circumstances. Please consult with a licensed professional regarding your specific situation before making investment decisions."
  };

  return (
    <footer>
      <div className="container">
        <h3>Legacy in Motion</h3>
        <p className="footer-sub">
          {text.sub}
        </p>

        <div className="footer-links">
          <Link href={`${base}/`}>{text.home}</Link>
          <Link href={`${base}/#framework`}>{text.steps}</Link>
          <Link href={`${base}/mission`}>{text.mission}</Link>
          <Link href={`${base}/freedom-financial-baby`}>{text.baby}</Link>
          <Link href={`${base}/workshops`}>{text.workshops}</Link>
          <a href="tel:626-203-7652">{text.call}: 626-203-7652</a>
        </div>

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
    </footer>
  );
}