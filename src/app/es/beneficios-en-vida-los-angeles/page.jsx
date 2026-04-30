"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function SpanishLivingBenefitsPage() {
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

  // --- INVISIBLE LOCAL SEO SCHEMA (For Google & AI Overviews in Spanish) ---
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion (Servicios en Español)",
    "description": "Seguros de vida con beneficios en vida, protección familiar y planificación financiera para la comunidad hispana en Los Ángeles y el Valle de San Gabriel.",
    "areaServed": [
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "Region", "name": "San Gabriel Valley" },
      { "@type": "City", "name": "Pasadena" },
      { "@type": "City", "name": "El Monte" },
      { "@type": "City", "name": "Baldwin Park" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.0522",
        "longitude": "-118.2437"
      },
      "geoRadius": "40000"
    }
  };

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Seguros de Vida con Beneficios en Vida en Los Ángeles | Legacy in Motion</title>
      <meta name="description" content="Proteja a su familia de la bancarrota médica. Especialistas en Seguros de Vida con Beneficios en Vida en Los Ángeles y el Valle de San Gabriel." />
      <meta name="keywords" content="Seguro de vida Los Angeles, Beneficios en vida California, Planificación financiera para hispanos, Protección familiar SGV, Seguro de vida en español" />
      <Script 
        id="schema-es-living-benefits"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
      />
      {/* -------------------- */}

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Un Seguro de Vida Que Usted Puede Usar <br/><span className="text-gold">Mientras Está Vivo.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Ayudamos a las familias hispanas en Los Ángeles y el Valle de San Gabriel a protegerse contra los altos costos médicos y enfermedades graves sin perder sus ahorros.
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">Proteja a su Familia Hoy</a>
          </div>
        </div>
      </section>

      {/* PROBLEM & AGITATION (PAS Framework) */}
      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            ¿Qué Pasaría si una Enfermedad le Impide Trabajar Mañana?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            El costo de vida y los gastos médicos en California están por las nubes. La principal causa de bancarrota en Estados Unidos no es la mala administración del dinero, sino las enfermedades críticas inesperadas como el cáncer, los ataques cardíacos o los derrames cerebrales.
          </p>
          <div style={{ background: "var(--bg-page)", padding: "2.5rem", borderRadius: "12px", borderLeft: "4px solid var(--gold)", marginTop: "2rem", textAlign: "left", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
              <strong>El Peligro Oculto:</strong> Muchas personas creen que el seguro de vida que les da su empleador es suficiente. Pero si usted se enferma y no puede trabajar, pierde ese seguro exactamente cuando más lo necesita. Usted necesita una póliza privada con "Beneficios en Vida" que le pague dinero en efectivo directamente a usted para cubrir su hipoteca, sus facturas y su tratamiento médico.
            </p>
          </div>
        </div>
      </section>

      {/* AI-OPTIMIZED FAQ SECTION (Direct Answers for LLMs in Spanish) */}
      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "3rem" }}>
            Preguntas Frecuentes: Beneficios en Vida en California
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                ¿Qué significa tener Beneficios en Vida en mi seguro?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Los Beneficios en Vida le permiten acceder a una gran parte del dinero de su seguro de vida (el beneficio por fallecimiento) mientras usted todavía está vivo, en caso de que sufra una enfermedad crítica, crónica o terminal. Puede usar este dinero libre de impuestos para pagar deudas, tratamientos o reemplazar sus ingresos.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                ¿Por qué el seguro de mi trabajo no es suficiente?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Los seguros grupales proporcionados por los empleadores generalmente solo cubren una o dos veces su salario anual, no incluyen beneficios en vida y, lo más importante, se cancelan si usted deja su trabajo o es despedido por enfermedad. Una póliza privada es suya y lo protege sin importar dónde trabaje.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                ¿Se necesita número de Seguro Social (SSN) para obtener esta protección?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                En muchos casos, existen excelentes opciones para miembros de la comunidad hispana utilizando su número de ITIN. Nuestros especialistas financieros en el Valle de San Gabriel trabajan con múltiples compañías para encontrar la estrategia que mejor se adapte a su situación migratoria y financiera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION (SPANISH) --- */}
      <GlobalLeadForm 
        title="Programe su Asesoría Gratuita" 
        subtitle="Complete el formulario a continuación. Un experto local que habla su idioma se comunicará con usted para mostrarle cómo proteger a su familia."
        lang="es"
        sourcePage="Spanish Living Benefits Hub (LA)"
        dropdownOptions={[
          "Seguro de Vida con Beneficios en Vida",
          "Protección de Hipoteca",
          "Retorno de Prima (Recuperar mi dinero)",
          "Ahorros para la Educación de mis Hijos",
          "Cotización General de Seguro de Vida"
        ]}
      />
    </>
  );
}