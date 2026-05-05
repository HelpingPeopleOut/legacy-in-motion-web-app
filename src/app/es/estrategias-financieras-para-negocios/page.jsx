"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function EstrategiasDeNegocioPage() {
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
    "name": "Legacy in Motion - Estrategias para Negocios",
    "description": "Proteja su empresa y retenga a su mejor talento con Seguros de Persona Clave, Acuerdos de Compra-Venta y Planes de Bonificación Ejecutiva.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"],
  };

  return (
    <>
      <title>Estrategias Financieras para Dueños de Negocios | Legacy in Motion</title>
      <meta name="description" content="Proteja el futuro de su empresa. Descubra el Seguro de Persona Clave, Planes de Bonificación Ejecutiva y estrategias de continuidad comercial." />
      <Script id="schema-negocios-es" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Para Emprendedores y Fundadores</span>
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Proteja su Empresa. <br /><span className="text-gold">Recompense a los Mejores.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#ccc" }}>
            Usted ha dedicado su vida a construir su negocio. Asegúrese de que sobreviva a tragedias inesperadas, mantenga la lealtad de sus mejores empleados y construya su propia estrategia de salida libre de impuestos.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center" }}>
            <a href="#quote" className="btn-gold btn-pulse">Agendar Auditoría Empresarial</a>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Redes de Seguridad Corporativa</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
                La mayoría de los emprendedores reinvierten cada dólar en su empresa, dejando su riqueza personal atada completamente al éxito del negocio. Además, perder a un empleado clave o un socio comercial debido a una tragedia inesperada puede llevar a la empresa a la bancarrota de la noche a la mañana.
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-main)", fontWeight: 600 }}>
                Diseñamos estructuras corporativas blindadas utilizando seguros de vida especializados.
              </p>
              <ul style={{ listStylePosition: "inside", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginTop: "1.5rem" }}>
                <li>✅ <strong>Seguro de Persona Clave:</strong> Inyecta efectivo en el negocio si un empleado vital fallece o enferma gravemente, cubriendo la pérdida de ingresos y los costos de contratación.</li>
                <li>✅ <strong>Bonificación Ejecutiva:</strong> "Esposas de oro". Ofrezca a su mejor talento cuentas de jubilación con ventajas fiscales para evitar que se vayan a la competencia.</li>
                <li>✅ <strong>Acuerdos de Compra-Venta:</strong> Garantiza que tendrá el dinero líquido exacto necesario para comprar la parte de la familia de un socio fallecido y mantener el control de la empresa.</li>
              </ul>
            </div>
            <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>Su Estrategia de Salida</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Vender su negocio no es su única opción de jubilación. Puede usar dólares corporativos hoy para financiar una cuenta de jubilación personal libre de impuestos para el mañana.</p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>Permítanos mostrarle cómo sacar dinero de su empresa de manera eficiente mientras protege sus operaciones futuras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="quote" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="Asegure su Futuro Corporativo" 
          subtitle="Complete el formulario a continuación. Nos comunicaremos para discutir estrategias personalizadas para la estructura específica de su negocio."
          lang="es"
          sourcePage="Estrategias de Negocio (Español)"
          dropdownOptions={[
            "Seguro de Persona Clave",
            "Planes de Bonificación Ejecutiva (Retención)",
            "Financiamiento de Acuerdos de Compra-Venta",
            "Estrategia de Jubilación para Dueños"
          ]}
        />
      </section>
    </>
  );
}