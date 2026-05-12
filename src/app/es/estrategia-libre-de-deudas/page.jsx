"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function EstrategiaLibreDeDeudasPage() {
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
    "name": "Legacy in Motion - Estrategia de Eliminación de Deuda",
    "description": "Análisis de flujo de efectivo y estrategias personalizadas para ayudarle a salir de deudas más rápido y comenzar a construir riqueza.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"],
  };

  return (
    <>
      {/* CORRECCIÓN CRÍTICA: Se eliminaron las etiquetas ilegales <title> y <meta> del componente cliente para evitar el error 418 de hidratación de React */}
      <Script id="schema-deudas-es" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>La Libertad Financiera Comienza Aquí</span>
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Elimine Sus Deudas. <span className="text-gold">Construya Su Riqueza.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#ccc" }}>
            No tiene que esperar hasta estar libre de deudas para comenzar a construir su legado. Descubra la estrategia para eliminar rápidamente las deudas de alto interés mientras financia su futuro simultáneamente.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center" }}>
            <a href="#quote" className="btn-gold btn-pulse">Obtener Mi Análisis de Deuda Gratuito</a>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>La Ilusión del Flujo de Efectivo</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
                La mayoría de las personas creen que no ganan suficiente dinero para invertir. La realidad es que su riqueza está siendo drenada silenciosamente por un flujo de caja ineficiente, tarjetas de crédito y préstamos mal estructurados.
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-main)", fontWeight: 600 }}>
                Le ayudamos a reestructurar sus finanzas para convertir sus deudas en activos.
              </p>
              <ul style={{ listStylePosition: "inside", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginTop: "1.5rem" }}>
                <li>✅ <strong>Estrategia Bola de Nieve:</strong> Ataque y elimine la deuda tóxica en tiempo récord sin sacrificar su estilo de vida.</li>
                <li>✅ <strong>Crecimiento Simultáneo:</strong> Comience a financiar una cuenta de riqueza libre de impuestos incluso mientras paga sus deudas.</li>
                <li>✅ <strong>Claridad Financiera:</strong> Sepa exactamente a dónde va cada dólar para retomar el control de su vida.</li>
              </ul>
            </div>
            <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>Deje de Pagarle a los Bancos</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Cada dólar que usted paga en intereses de tarjetas de crédito es un dólar robado a su jubilación, a sus hijos y a su legado.</p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>Déjenos hacer los cálculos. En menos de 90 días, podemos ayudarle a establecer un camino claro para liberarse de sus deudas al 100%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="quote" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="Inicie su Camino hacia Cero Deudas" 
          subtitle="Complete el formulario a continuación. Nos pondremos en contacto para programar su análisis de flujo de efectivo gratuito."
          lang="es"
          sourcePage="Estrategia Libre de Deudas (Español)"
          dropdownOptions={[
            "Eliminación de Deudas y Análisis de Efectivo",
            "Planificación de Fondo de Emergencia",
            "Comenzar a Invertir Estando en Deuda",
            "Revisión Financiera General"
          ]}
        />
      </section>
    </>
  );
}