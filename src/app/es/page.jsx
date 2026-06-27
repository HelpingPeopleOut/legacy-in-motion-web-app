"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import HomePathwayPanel from "@/components/HomePathwayPanel";
import HomeStorySection from "@/components/HomeStorySection";
import TransformationStories from "@/components/TransformationStories";
import AdvisorHeroPhoto from "@/components/AdvisorHeroPhoto";
import MeetAdvisorSection from "@/components/MeetAdvisorSection";

export default function HomeSpanish() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion",
    "url": "https://www.legacyinmotion.org/es",
    "description": "Consultoría financiera experta. Especialistas en Planificación de Jubilación, Seguros de Vida con Beneficios en Vida y Planificación Patrimonial.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"]
  };

  return (
    <>
      <Script
        id="schema-org-home-es"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />

      <header className="hero hero-index hero-premium fade-in">
        <div className="container hero-premium-grid">
          <div className="hero-intro-content">
            <p className="hero-eyebrow">Legacy in Motion · Asesoría Financiera</p>
            <h1>
              Resuelva Sus Problemas Financieros — <span className="text-gold">No Solo Venda Productos.</span>
            </h1>
            <AdvisorHeroPhoto locale="es" />

            <HomeStorySection locale="es" />

            <div className="hero-action-buttons">
              <a href="#consultation" className="btn-gold btn-pulse">Consulta Gratuita</a>
              <a href="/dashboard" className="btn-outline">Portal de Herramientas</a>
            </div>
          </div>
          <HomePathwayPanel locale="es" />
        </div>
      </header>

      {/* 2. THE BLUEPRINT */}
      <section id="framework" className="fwf-elegant-section fade-in">
        <div className="container">
          <h2>Su Plan de Riqueza de 7 Pasos</h2>
          <p style={{ marginBottom: "4rem", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto 4rem", fontSize: "1.1rem" }}>
            Una estrategia integral que combina la protección de activos personales, el crecimiento con ventajas fiscales y una estructuración comercial sólida para garantizar que su legado perdure.
          </p>
          <div className="fwf-elegant-grid">
            <article className="fwf-elegant-item"><span className="step-number">Paso 01</span><h3>Flujo de Efectivo y Deudas</h3><p>Análisis de presupuesto y flujo de efectivo para construir hábitos financieros más saludables y eliminar deudas de manera eficiente.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 02</span><h3>Fondo de Emergencia</h3><p>Establecer de 3 a 6 meses de reservas líquidas en Cuentas de Ahorro de Alto Rendimiento para superar la inflación.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 03</span><h3>Protección en Vida</h3><p>Asegurar un Seguro de Vida a Término o Permanente que cubra enfermedades crónicas, críticas y terminales.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 04</span><h3>Optimización de Jubilación</h3><p>Ejecutar Rollovers de 401(k) y utilizar Anualidades Indexadas Fijas para Ingresos de Jubilación Garantizados.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 05</span><h3>Riqueza Libre de Impuestos</h3><p>Aprovechar el Seguro de Vida con Valor en Efectivo (IULs) para ahorros con ventajas fiscales y Cuentas para Niños.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 06</span><h3>Seguridad Empresarial</h3><p>Implementar Seguros de Persona Clave y Planes de Bonificación Ejecutiva para proteger a su mejor talento.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 07</span><h3>Planificación Patrimonial</h3><p>Evite el proceso de sucesión judicial mediante la orientación adecuada sobre Fideicomisos y Testamentos.</p></article>
          </div>
        </div>
      </section>

      <MeetAdvisorSection locale="es" />

      {/* 3. PROVEN TRANSFORMATIONS + INSTAGRAM */}
      <TransformationStories locale="es" />

      {/* 4. REQUEST A CALLBACK FORM (SPANISH) */}
      <section id="consultation" className="fade-in" style={{ background: "var(--bg-page)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="¿Listo para Comenzar? Solicite una Consulta" 
          subtitle="Complete el formulario a continuación. Nuestro equipo revisará su solicitud y le devolverá la llamada en menos de 24 horas."
          lang="es"
          sourcePage="Página de Inicio Principal (ES)"
          dropdownOptions={[
            "Planificación de Jubilación y Rollovers 401(k)",
            "Seguro de Vida y Beneficios en Vida",
            "Planificación Patrimonial, Fideicomisos y Testamentos",
            "Eliminación de Deudas y Análisis de Flujo de Efectivo",
            "Salida de Negocios y Bonificación Ejecutiva",
            "Cuentas de Inversión y Ahorro para Niños"
          ]}
        />
      </section>

      {/* 5. SERVICES DIRECTORY */}
      <section id="services" className="services fade-in text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>Experiencia Financiera Integral</h2>
          <p className="text-center text-muted" style={{ maxWidth: "700px", margin: "1rem auto 4rem", fontSize: "1.1rem" }}>Diseñamos estrategias personalizadas a través de cada pilar de la generación de riqueza, asegurando que no haya vacíos en su fortaleza financiera.</p>
          <div className="services-wrapper">
            <div className="service-category"><h3>Jubilación y Ahorros</h3><ul><li>Planificación de Jubilación</li><li>Gestión de Pensiones</li><li>Transferencias de 401(k)</li><li>Anualidades Indexadas Fijas</li></ul></div>
            <div className="service-category"><h3>Seguros y Protección</h3><ul><li>Pólizas de Seguro de Vida</li><li>Seguro de Vida Permanente</li><li>Cobertura de Enfermedades Críticas</li><li>Seguro de Protección Hipotecaria</li></ul></div>
            <div className="service-category"><h3>Legado y Familia</h3><ul><li>Planificación Patrimonial</li><li>Fideicomisos y Testamentos</li><li>Cuentas de Inversión para Niños</li><li>Transferencia de Riqueza</li></ul></div>
            <div className="service-category"><h3>Negocios y Efectivo</h3><ul><li>Seguridad Empresarial</li><li>Seguro de Persona Clave</li><li>Bonificación Ejecutiva</li><li>Eliminación de Deuda</li></ul></div>
          </div>
        </div>
      </section>
    </>
  );
}