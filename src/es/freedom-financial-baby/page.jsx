"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FreedomFinancialBabySpanish() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("attachment");
    
    let fileBase64 = "";
    let fileName = "";
    let fileType = "";

    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise((resolve) => (reader.onload = resolve));
      fileBase64 = reader.result.split(',')[1];
      fileName = file.name;
      fileType = file.type;
    }

    const payload = {
      name: formData.get("Full Name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      topic: formData.get("Childrens Age Range"),
      notes: formData.get("Notes"),
      fileBase64: fileBase64,
      fileName: fileName,
      fileType: fileType
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyitmS-i4AxF7jg9GKgID5zpQAh83JjSDV5cbywccURQ4qqVPplG2kliP-RC59pCweX/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });
      router.push("/es/thanks");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar su solicitud. Por favor, inténtelo de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Riqueza Generacional para Niños | Freedom Financial Baby | Los Ángeles</title>
      <meta name="description" content="Descubra cómo construir riqueza generacional para su hijo. Ayudamos a familias en Los Ángeles y el SGV a establecer cuentas de inversión aprovechando el interés compuesto." />
      <meta name="keywords" content="Cómo construir riqueza generacional para un bebé, Cuentas de inversión para niños Los Ángeles, Seguro de vida para niños interés compuesto, Estrategias de transferencia de riqueza libres de impuestos" />
      {/* -------------------- */}

      <header className="hero fade-in">
        <div className="container">
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Freedom Financial Baby
          </p>
          <h1>Dé el regalo de un futuro hoy.</h1>
          <p>
            Transforme su forma de pensar sobre la herencia. Descubra una estrategia práctica
            y accesible para que las familias aseguren un legado financiero masivo
            para sus hijos, sin necesidad de una fortuna para comenzar.
          </p>
          <a
            href="#contact"
            className="btn-gold btn-pulse"
            style={{ marginTop: "1rem" }}
          >
            Comience su Plan Hoy
          </a>
        </div>
      </header>

      <section className="text-section fade-in">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.5rem" }}>
            Solo el 22% de los niños recibirán una herencia.
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1rem auto 0" }}
          >
            Tres duras realidades hacen que dejar una herencia tradicional
            sea poco probable para la mayoría de los padres trabajadores:
          </p>

          <div className="realities-grid card-grid">
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>01. Longevidad</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Vivir más es una bendición, pero significa que los padres necesitarán
                estirar sus ahorros para financiar una jubilación más larga,
                dejando menos atrás.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>02. Facturas Médicas</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Los costos de atención médica superan constantemente la inflación. El jubilado promedio
                gasta más de $150,000 en atención médica desde los 65 años hasta el final de su vida.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>03. Cuidado a Largo Plazo</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
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
            style={{ color: "#aaaaaa", maxWidth: "600px", margin: "1rem auto 0" }}
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
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        <div className="container content-wrapper">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
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
            <strong>Interés Compuesto</strong> (dinero creciendo sobre dinero),{" "}
            <strong>El Valor del Dinero en el Tiempo</strong> (el dinero ahorrado hoy vale
            más mañana), y <strong>Protección de Riqueza</strong> (salvaguardar
            esos activos a través de productos de seguros estratégicos y fideicomisos).
          </p>
        </div>
      </section>

      <section className="math-section fade-in text-section">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.5rem" }}>
            El Costo de Esperar
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "600px", margin: "1rem auto 2rem" }}
          >
            ¿Qué sucede si aprovecha toda la vida de un niño para el crecimiento
            compuesto en lugar de esperar hasta que tenga 18 años? Considere esta
            ilustración hipotética:
          </p>

          <div className="math-box">
            <div className="math-row">
              <div className="math-label">
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Escenario 1: Comenzando al Nacer</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Una contribución única de $13,000 crece durante 67 años.</p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Contribución Inicial</span>
                  <strong style={{ fontSize: "2rem" }}>$13,000</strong>
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
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  La misma contribución de $13,000, pero solo crece durante 49 años.
                </p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Contribución Inicial</span>
                  <strong style={{ fontSize: "2rem" }}>$13,000</strong>
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
              fontSize: "0.8rem",
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

      <section id="contact" className="lead-gen fade-in">
        <div className="container">
          <h2
            className="text-center"
            style={{ fontSize: "3.2rem", color: "var(--text-main)" }}
          >
            Plante el Árbol Hoy
          </h2>
          <p
            className="text-center"
            style={{
              color: "var(--text-muted)",
              fontSize: "1.2rem",
              marginTop: "1rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            &quot;El verdadero significado de la vida es plantar árboles bajo cuya sombra
            no esperas sentarte.&quot; Construyamos un plan para sus hijos que le
            agradecerán décadas a partir de ahora.
          </p>

          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <input type="text" name="Full Name" placeholder="Su Nombre Completo" required disabled={isSubmitting} />
              <input type="email" name="email" placeholder="Su Correo Electrónico" required disabled={isSubmitting} />
              <input type="tel" name="phone" placeholder="Su Número de Teléfono" required disabled={isSubmitting} />

              <select name="Childrens Age Range" required style={{ color: "var(--text-muted)" }} disabled={isSubmitting}>
                <option value="" disabled selected>
                  ¿En qué rango de edad están sus hijos?
                </option>
                <option value="expecting">Esperando / Recién Nacidos</option>
                <option value="toddler">1 a 5 años</option>
                <option value="child">6 a 12 años</option>
                <option value="teen">13 a 17 años</option>
                <option value="adult">18+ / Buscando otras opciones de legado</option>
              </select>

              <textarea
                name="Notes"
                rows="5"
                placeholder="Describa brevemente sus metas para el futuro financiero de sus hijos..."
                disabled={isSubmitting}
              ></textarea>
              
              <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                  Adjuntar Orden de Trabajo o Imagen (Opcional)
                </label>
                <input 
                  type="file" 
                  name="attachment" 
                  accept="image/*, application/pdf"
                  style={{ 
                    color: "var(--text-main)", 
                    background: "transparent", 
                    border: "1px dashed var(--border-light)", 
                    padding: "12px", 
                    width: "100%", 
                    borderRadius: "4px" 
                  }}
                  disabled={isSubmitting}
                />
              </div>

              <button type="submit" className="btn-gold btn-pulse" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Enviando de forma segura..." : "Solicitar una Consulta de Legado"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}