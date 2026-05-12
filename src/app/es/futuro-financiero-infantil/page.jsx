"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function FuturoFinancieroInfantil() {
  // Smooth fade-in scroll animation
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

  // --- INVISIBLE PRODUCT SCHEMA FOR GOOGLE (ES) ---
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Freedom Financial Baby (Futuro Financiero Infantil)",
    "brand": {
      "@type": "FinancialService",
      "name": "Legacy in Motion"
    },
    "description": "Cuentas de inversión para niños que aprovechan el interés compuesto y estrategias de transferencia de riqueza libres de impuestos para familias en Los Ángeles y el Valle de San Gabriel.",
    "category": "Seguro de Vida / Construcción de Riqueza",
    "audience": {
      "@type": "Audience",
      "audienceType": "Padres y Abuelos"
    }
  };

  return (
    <>
      {/* CORRECCIÓN CRÍTICA: Se eliminaron las etiquetas ilegales <title> y <meta> del componente cliente para evitar el error 418 de hidratación de React */}
      <Script 
        id="schema-freedom-baby-es"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} 
      />

      <header className="hero fade-in" style={{ padding: "14rem 0 8rem 0" }}>
        <div className="container">
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
              color: "var(--gold)",
              marginBottom: "1rem",
              display: "inline-block"
            }}
          >
            Freedom Financial Baby
          </span>
          <h1 style={{ fontSize: "3.8rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Dé el regalo de un futuro hoy.
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Transforme su forma de pensar sobre la herencia. Descubra una estrategia práctica
            y accesible para que las familias aseguren un legado financiero masivo
            para sus hijos, sin necesidad de una fortuna para comenzar.
          </p>
          <div className="hero-buttons">
            <a
              href="#consultation"
              className="btn-gold btn-pulse"
            >
              Comience su Plan Hoy
            </a>
          </div>
        </div>
      </header>

      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            Solo el 22% de los niños recibirán una herencia.
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1rem auto 0", fontSize: "1.1rem" }}
          >
            Tres duras realidades hacen que dejar una herencia tradicional
            sea poco probable para la mayoría de los padres trabajadores:
          </p>

          <div className="realities-grid card-grid">
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>01. Longevidad</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Vivir más es una bendición, pero significa que los padres necesitarán
                estirar sus ahorros para financiar una jubilación más larga,
                dejando menos atrás.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>02. Facturas Médicas</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Los costos de atención médica superan constantemente la inflación. El jubilado promedio
                gasta más de $150,000 en atención médica desde los 65 años hasta el final de su vida.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>03. Cuidado a Largo Plazo</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                El 70% de las personas mayores de 65 años necesitarán algún tipo de apoyo
                a largo plazo, lo que puede costar fácilmente cientos de miles de dólares en sus últimos años.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-section fade-in">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            ¿Qué plan de legado es más realista?
          </h2>
          <p
            className="text-center"
            style={{ color: "#aaaaaa", maxWidth: "600px", margin: "1rem auto 0", fontSize: "1.1rem" }}
          >
            Ambas opciones crean una base sólida, pero una es mucho más
            alcanzable para la familia moderna.
          </p>

          <div className="comp-grid">
            <div className="comp-card">
              <h4 style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", color: "#aaaaaa", marginBottom: "1rem" }}>
                Opción 1: La Lucha Tradicional
              </h4>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                Intentar ahorrar lo suficiente para financiar su propia jubilación, cubrir su
                cuidado al final de la vida y <em>aún así</em> dejar a cada uno de sus hijos una
                herencia masiva de sus ahorros personales restantes.
              </p>
            </div>
            <div className="comp-card gold-focus">
              <h4 style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", color: "var(--gold)", marginBottom: "1rem" }}>
                Opción 2: El Enfoque de Riqueza Duradera
              </h4>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                Eliminar la carga de una herencia de suma global. Crear una poderosa base
                de jubilación para cada hijo comenzando con una pequeña
                fracción de esa cantidad cuando son jóvenes, transformando sus años
                tempranos en años de ganancia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="text-section fade-in text-center"
        style={{ borderBottom: "1px solid var(--border-light)", background: "var(--bg-page)" }}
      >
        <div className="container content-wrapper">
          <h2 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
            Sentido Común que Vale Millones
          </h2>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              marginBottom: "2rem",
            }}
          >
            Dado que es tan difícil dejar una herencia más adelante en la vida, ¿por qué
            no utilizar el mayor activo financiero que tiene un niño para construir la
            base de su futuro ahora mismo?
          </p>
          <h3
            className="text-gold"
            style={{
              fontSize: "2rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Ese activo es el TIEMPO.
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              marginTop: "2rem",
            }}
          >
            La estrategia Freedom Financial Baby aprovecha tres conceptos simples:{" "}
            <strong style={{ color: "var(--text-main)" }}>Interés Compuesto</strong> (dinero creciendo sobre dinero),{" "}
            <strong style={{ color: "var(--text-main)" }}>El Valor del Dinero en el Tiempo</strong> (el dinero ahorrado hoy vale
            más mañana), y <strong style={{ color: "var(--text-main)" }}>Protección de Riqueza</strong> (salvaguardar
            esos activos a través de productos de seguros estratégicos y fideicomisos).
          </p>
        </div>
      </section>

      <section className="math-section fade-in text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            El Costo de Esperar
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "650px", margin: "1rem auto 2rem", fontSize: "1.1rem" }}
          >
            ¿Qué sucede si aprovecha toda la vida de un niño para el crecimiento
            compuesto en lugar de esperar hasta que tenga 18 años? Considere esta
            ilustración hipotética:
          </p>

          <div className="math-box">
            <div className="math-row">
              <div className="math-label">
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Escenario 1: Comenzando al Nacer</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>Una contribución única de $13,000 crece durante 67 años.</p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Contribución Inicial</span>
                  <strong style={{ fontSize: "2.2rem" }}>$13,000</strong>
                </div>
                <div className="math-number highlight">
                  <span>Valor a los 67 Años</span>
                  <strong>$1,000,442</strong>
                </div>
              </div>
            </div>

            <div className="math-row">
              <div className="math-label">
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Escenario 2: Comenzando a los 18 Años</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
                  La misma contribución de $13,000, pero solo crece durante 49 años.
                </p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Contribución Inicial</span>
                  <strong style={{ fontSize: "2.2rem" }}>$13,000</strong>
                </div>
                <div className="math-number">
                  <span>Valor a los 67 Años</span>
                  <strong>$311,486</strong>
                </div>
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.85rem",
              color: "#888",
              maxWidth: "900px",
              margin: "2rem auto 0",
              textAlign: "justify",
            }}
          >
            *Aviso legal: Este es un escenario hipotético solo para fines ilustrativos. 
            Asume una tasa de interés anual promedio del 6.5%, capitalizada mensualmente.
            No representa una inversión real en un producto específico y no tiene en cuenta
            cargos, gastos o impuestos, que reducirían los resultados. Invertir conlleva riesgos.
            Consulte con Legacy in Motion para diseñar un plan personalizado.
          </p>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION (SPANISH) --- */}
      <GlobalLeadForm 
        title="Plante el Árbol Hoy" 
        subtitle="&quot;El verdadero significado de la vida es plantar árboles bajo cuya sombra no esperas sentarte.&quot; Construyamos un plan para sus hijos que le agradecerán décadas a partir de ahora."
        lang="es"
        sourcePage="Spanish Freedom Financial Baby Page"
        dropdownOptions={[
          "Esperando / Recién Nacidos",
          "1 a 5 años",
          "6 a 12 años",
          "13 a 17 años",
          "18+ / Buscando otras opciones de legado"
        ]}
      />
    </>
  );
}