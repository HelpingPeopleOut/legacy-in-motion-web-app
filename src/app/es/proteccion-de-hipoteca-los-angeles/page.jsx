"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function ProteccionHipotecaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in").forEach(sec => observer.observe(sec));
  }, []);

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion - Protección de Hipoteca",
    "description": "Mantenga a su familia en su hogar. Seguro de protección hipotecaria con beneficios en vida para cubrir su préstamo en caso de muerte, cáncer o infarto.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"],
  };

  return (
    <>
      {/* CORRECCIÓN CRÍTICA: Se eliminaron las etiquetas ilegales <title> y <meta> del componente cliente para evitar el error 418 de hidratación de React */}
      <Script id="schema-hipoteca-es" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Para Propietarios de Casa en California</span>
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            No Deje Que El Banco <span className="text-gold">Le Quite Su Casa.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#ccc" }}>
            Si usted sufriera un infarto, un derrame cerebral o falleciera inesperadamente mañana, ¿podría su familia seguir pagando la hipoteca? Asegure su futuro por muy poco dinero.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center" }}>
            <a href="#quote" className="btn-gold btn-pulse">Obtener Cotización Gratuita</a>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Más Que Un Seguro De Muerte</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
                La mayoría de la gente piensa que la Protección Hipotecaria solo paga si mueren. Pero, ¿qué pasa si sobrevive a una enfermedad grave y simplemente no puede trabajar durante 6 meses?
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-main)", fontWeight: 600 }}>
                Nuestros planes modernos de Protección Hipotecaria incluyen Beneficios en Vida.
              </p>
              <ul style={{ listStylePosition: "inside", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginTop: "1.5rem" }}>
                <li>✅ <strong>Pague la casa por completo</strong> si usted fallece.</li>
                <li>✅ <strong>Acceda a efectivo en vida</strong> si es diagnosticado con Cáncer, un Infarto o Derrame Cerebral.</li>
                <li>✅ <strong>Personalizable</strong> para ajustarse exactamente al monto de su préstamo y presupuesto mensual.</li>
              </ul>
            </div>
            <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>La Realidad de los 30 Días</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Si su hogar perdiera su ingreso principal, ¿cuántos meses podría continuar pagando su hipoteca antes de que el banco emita un aviso de ejecución hipotecaria (foreclosure)?</p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>Proteger el mayor activo de su familia es más económico de lo que piensa. Puede asegurar una póliza en días, a menudo sin examen médico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="quote" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="Descubra lo Económico que es Protegerse" 
          subtitle="Complete el formulario a continuación. Prepararemos una cotización personalizada basada en el monto de su préstamo."
          lang="es"
          sourcePage="Protección de Hipoteca (Español)"
          dropdownOptions={[
            "Cotización de Protección de Hipoteca",
            "Seguro de Vida con Beneficios en Vida",
            "Revisar mi Póliza Actual"
          ]}
        />
      </section>
    </>
  );
}