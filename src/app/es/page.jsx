"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

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

      {/* 1. HERO SECTION (SPANISH) */}
      <header className="hero hero-index container fade-in">
        <div className="hero-grid" style={{ alignItems: "center" }}>
          
          {/* INSTAGRAM FIRST - This makes it show at the top on mobile */}
          <div className="ig-container">
            <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: "#FFF", border: 0, margin: 0, padding: 0, width: "100%" }}>
              <div style={{ padding: "16px" }}>
                <a href="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: "#FFFFFF", lineHeight: 0, padding: "0 0", textAlign: "center", textDecoration: "none", width: "100%" }} target="_blank" rel="noopener noreferrer">
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", flexGrow: 0, height: "40px", marginRight: "14px", width: "40px" }}></div>
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                      <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", marginBottom: "6px", width: "100px" }}></div>
                      <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", width: "60px" }}></div>
                    </div>
                  </div>
                  <div style={{ padding: "19% 0" }}></div>
                  <div style={{ paddingTop: "8px" }}>
                    <div style={{ color: "#3897f0", fontFamily: "Arial,sans-serif", fontSize: "14px", fontStyle: "normal", fontWeight: 550, lineHeight: "18px" }}>
                      Ver esta publicación en Instagram
                    </div>
                  </div>
                  <div style={{ padding: "12.5% 0" }}></div>
                </a>
              </div>
            </blockquote>
            <Script async src="//www.instagram.com/embed.js" strategy="lazyOnload" />
          </div>

          {/* TEXT CONTENT SECOND */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
            
            {/* ELEGANT LOGO INJECTION */}
            <div style={{ marginBottom: "1.5rem" }}>
              <img 
                src="/android-chrome-192x192.png" 
                alt="Logo de Legacy in Motion" 
                style={{ width: "110px", height: "auto", filter: "drop-shadow(0 10px 20px rgba(212, 175, 55, 0.15))" }} 
              />
            </div>

            <h1 style={{ lineHeight: "1.15", textAlign: "left", margin: "0 0 1.5rem 0" }}>
              Establezca Su <br />
              <span className="text-gold">Fortaleza Financiera.</span>
            </h1>
            <p style={{ textAlign: "left", margin: "0 0 2.5rem 0", maxWidth: "600px" }}>
              Como Asociada Financiera Senior de Experior Financial Group Inc.,
              guío a mis clientes desde la complejidad financiera hacia un camino claro y práctico
              para construir riqueza generacional.
            </p>
            <div className="hero-buttons" style={{ justifyContent: "flex-start" }}>
              <a href="#consultation" className="btn-gold btn-pulse">
                Agendar una Consulta
              </a>
              <a href="#framework" className="btn-outline">
                Explore el Plan
              </a>
            </div>
          </div>
          
        </div>
      </header>

      {/* 2. THE BLUEPRINT (SOLUTIONS FIRST) */}
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

      {/* 3. PROVEN TRANSFORMATIONS */}
      <section id="stories" className="stories fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>Transformaciones Comprobadas</h2>
          <p className="text-center text-muted" style={{ maxWidth: "600px", margin: "0 auto 3rem", fontSize: "1.1rem" }}>El éxito financiero no es teórico. Así es como hemos implementado estas estrategias exactas para asegurar el futuro de las familias.</p>
          <div className="card-grid">
            <article className="card story-card">
              <h4 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Deuda Abrumadora Eliminada</h4>
              <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>&quot;Trabajé con una pareja joven que se ahogaba en $60,000 de deudas de tarjetas de crédito. En 18 meses, habían pagado más de la mitad de su deuda y estaban ahorrando para su primera casa.&quot;</p>
              <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}><span className="text-gold">Solución:</span> Estrategias de Eliminación de Deudas y Análisis de Flujo de Efectivo.</p>
            </article>
            <article className="card story-card">
              <h4 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Rollovers Sin Gestión</h4>
              <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>&quot;Un empleado federal transfirió un TSP anterior a una Anualidad Indexada Fija. Esto simplificó su planificación e incrementó sus ingresos proyectados en miles de dólares.&quot;</p>
              <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}><span className="text-gold">Solución:</span> Rollovers de 401(k) y Anualidades Indexadas Fijas.</p>
            </article>
            <article className="card story-card">
              <h4 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Protección Durante Enfermedad</h4>
              <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>&quot;Establecimos una póliza con beneficios en vida para un padre. Un año después, un diagnóstico de cáncer desencadenó pagos que cubrieron los costos del tratamiento.&quot;</p>
              <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}><span className="text-gold">Solución:</span> Seguro de Vida a Término con Cobertura de Enfermedades Críticas.</p>
            </article>
            <article className="card story-card">
              <h4 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Evitar Disputas Familiares</h4>
              <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>&quot;Los conectamos con un abogado especializado para coordinar fideicomisos y testamentos. Ahora su legado está protegido y se han evitado posibles disputas.&quot;</p>
              <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}><span className="text-gold">Solución:</span> Orientación sobre Fideicomisos y Testamentos.</p>
            </article>
          </div>
        </div>
      </section>

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

      {/* 6. BIBLE VERSE CAPSTONE (SPANISH) */}
      <section style={{ paddingBottom: "4rem", background: "var(--bg-page)" }}>
        <div className="container fade-in">
          <p className="text-center" style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.6rem", color: "var(--text-main)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.4" }}>
            &quot;Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.&quot; <br />
            <span style={{ fontSize: "0.9rem", color: "var(--gold)", display: "block", marginTop: "1rem", fontFamily: "var(--font-body)", fontStyle: "normal", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 600 }}>
              – Juan 16:33
            </span>
          </p>
        </div>
      </section>
    </>
  );
}