"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function SeminariosSpanish() {
  // Implementando la animación de desvanecimiento suave (fade-in)
  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

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

  // --- INVISIBLE SERVICE SCHEMA FOR GOOGLE (ES) ---
  const seminarSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Seminarios Corporativos de Bienestar Financiero",
    "provider": {
      "@type": "FinancialService",
      "name": "Legacy in Motion"
    },
    "description": "Seminarios profesionales de educación financiera para empleados en Los Ángeles y el Valle de San Gabriel.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley", "California"],
    "serviceType": "Educación Financiera"
  };

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Seminarios Corporativos de Bienestar Financiero Los Ángeles | Legacy in Motion</title>
      <meta name="description" content="Organice seminarios profesionales de educación financiera para empleados. Los temas incluyen eliminación de deudas, construcción de crédito y estrategias de crecimiento." />
      <meta name="keywords" content="Seminarios corporativos de bienestar financiero Los Ángeles, Programas de educación financiera para empleados SGV, Educación financiera para empresas, Seminarios financieros en español" />
      <Script 
        id="schema-seminars-es"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seminarSchema) }} 
      />
      {/* -------------------- */}

      <header
        className="hero fade-in"
        style={{
          padding: "14rem 0 8rem 0",
          background: "linear-gradient(to bottom, #fcfcfc, #f1f1f1)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="container">
          <span
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              marginBottom: "1rem",
              display: "inline-block",
            }}
          >
            Educación para su Organización
          </span>
          <h1
            style={{
              fontSize: "3.8rem",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            La inteligencia financiera es el beneficio definitivo.
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-muted)",
              margin: "0 auto 3rem",
              maxWidth: "750px",
              fontWeight: 300,
            }}
          >
            Nos asociamos con dueños de negocios y líderes comunitarios para organizar
            seminarios profesionales diseñados para eliminar el estrés financiero de los 
            empleados y construir una hoja de ruta hacia la verdadera riqueza.
          </p>
          <a href="#consultation" className="btn-gold btn-pulse">
            Solicitar Información de Reserva
          </a>
        </div>
      </header>

      <section
        className="topics-section fade-in"
        style={{ padding: "8rem 0", background: "var(--bg-page)" }}
      >
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "3rem" }}>
            Temas de los Seminarios
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1.5rem auto 0", fontSize: "1.2rem" }}
          >
            Sesiones personalizables basadas en el Plan de Riqueza Duradera.
          </p>

          <div className="card-grid">
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Esencial</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Gestión de Deudas y Préstamos Estudiantiles
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Vaya más allá del presupuesto básico. Enseñamos estrategias de reducción 
                agresivas que ayudan a su equipo a recuperar su flujo de efectivo 
                mientras construyen un futuro seguro.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Crédito</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Gestión y Construcción de Puntaje de Crédito
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Desmitificando el algoritmo del crédito. Aprenda pasos accionables para 
                optimizar los puntajes y obtener tasas de interés más bajas y mejor poder de endeudamiento.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Fundamentos</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Presupuesto y Lógica de Flujo de Efectivo
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                El núcleo del sistema: gestionar la brecha entre ingresos y 
                gastos para maximizar lo que se queda en su bolsillo.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Riqueza</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Cómo Crece el Dinero: Estrategias de Crecimiento
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Una inmersión educativa profunda en el interés compuesto, la protección contra 
                la volatilidad del mercado y el poder de los vehículos con ventajas fiscales.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Protección</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Gestión de Riesgos y Seguridad de Activos
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Estrategias para proteger lo que ha construido. Cubriendo beneficios en vida, 
                protección de ingresos y salvaguardando a las familias contra lo inesperado.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Optimización</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                El Impacto de los Impuestos en su Dinero
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                La educación financiera no se trata solo de lo que ganas, sino de lo que 
                conservas. Aprenda cómo la planificación fiscal cambia el legado de su riqueza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION (SPANISH) --- */}
      <GlobalLeadForm 
        title="Organice un Seminario" 
        subtitle="Complete el formulario a continuación. Por favor, incluya el nombre de su organización y el tamaño esperado de la audiencia en las notas."
        lang="es"
        sourcePage="Spanish Corporate Seminars Page"
        dropdownOptions={[
          "Gestión de Deudas y Construcción de Crédito",
          "Estrategias de Crecimiento y Gestión de Riesgos",
          "El Impacto de los Impuestos en la Riqueza",
          "Serie Integral de Bienestar Financiero"
        ]}
      />
    </>
  );
}