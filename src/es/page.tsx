"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function HomeSpanish() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Implementando la animación de desvanecimiento suave (fade-in)
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

  // --- Manejador de formulario para Google Apps Script ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("attachment");
    
    let fileBase64 = "";
    let fileName = "";
    let fileType = "";

    // Convertir archivo a texto Base64 si se adjuntó alguno
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise((resolve) => (reader.onload = resolve));
      fileBase64 = reader.result.split(',')[1];
      fileName = file.name;
      fileType = file.type;
    }

    // Empaquetar los datos para enviarlos al CRM de Google
    const payload = {
      name: formData.get("Full Name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      topic: formData.get("Primary Goal"),
      notes: formData.get("Notes"),
      fileBase64: fileBase64,
      fileName: fileName,
      fileType: fileType
    };

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyitmS-i4AxF7jg9GKgID5zpQAh83JjSDV5cbywccURQ4qqVPplG2kliP-RC59pCweX/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      
      // Redirigir a la página de agradecimiento en español
      router.push("/es/thanks");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar su solicitud. Por favor, inténtelo de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* --- SEO METADATA (SPANISH) --- */}
      <title>Consultor Financiero en Los Ángeles y SGV | Legacy in Motion</title>
      <meta name="description" content="Servicios expertos en planificación de jubilación, transferencias de pensiones y planificación patrimonial en Los Ángeles, Pasadena y el Valle de San Gabriel. Construya su fortaleza financiera." />
      <meta name="keywords" content="Planificador de jubilación en Pasadena CA, Especialista en rollover de pensión y 401k cerca de mí, Servicios de planificación patrimonial Valle de San Gabriel, Seguro de vida con beneficios en vida Los Ángeles, Consultor financiero cerca de mí" />
      {/* -------------------- */}

      <header className="hero hero-index container fade-in">
        <div className="hero-grid">
          <div>
            <h1>Los 7 Pasos hacia la Riqueza Duradera.</h1>
            <p>
              Como Asociada Financiera Senior de Experior Financial Group Inc.,
              guío a mis clientes desde la complejidad financiera hacia un camino claro y práctico
              para construir un legado. Establezca su fortaleza financiera en tan solo 90 días.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-gold btn-pulse">
                Comience su Plan
              </a>
              <a href="#framework" className="btn-outline">
                Explore el Plan
              </a>
            </div>
          </div>
          
          <div className="ig-container">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            >
              <div style={{ padding: "16px" }}>
                <a
                  href="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading"
                  style={{
                    background: "#FFFFFF",
                    lineHeight: 0,
                    padding: "0 0",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100%",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
        </div>
      </header>

      <section id="framework" className="fwf-elegant-section fade-in">
        <div className="container">
          <h2>Su Plan de Riqueza de 7 Pasos</h2>
          <p
            style={{
              marginBottom: "4rem",
              color: "var(--text-muted)",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1.1rem",
            }}
          >
            Una estrategia integral que combina la protección de activos personales, 
            el crecimiento con ventajas fiscales y una estructuración comercial sólida 
            para garantizar que su legado perdure.
          </p>

          <div className="fwf-elegant-grid">
            <article className="fwf-elegant-item">
              <span className="step-number">Paso 01</span>
              <h3>Flujo de Efectivo y Eliminación de Deudas</h3>
              <p>
                Análisis de presupuesto y flujo de efectivo para construir hábitos financieros
                más saludables y eliminar deudas de manera eficiente.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Paso 02</span>
              <h3>Planificación de Fondo de Emergencia</h3>
              <p>
                Establecer de 3 a 6 meses de reservas líquidas en Cuentas de Ahorro
                de Alto Rendimiento para superar la inflación.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Paso 03</span>
              <h3>Protección de Beneficios en Vida</h3>
              <p>
                Asegurar un Seguro de Vida a Término o Permanente que cubra enfermedades crónicas,
                críticas y terminales.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Paso 04</span>
              <h3>Optimización de la Jubilación</h3>
              <p>
                Ejecutar Rollovers (transferencias) de 401(k) y utilizar Anualidades Indexadas Fijas
                para Ingresos de Jubilación Garantizados.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Paso 05</span>
              <h3>Construcción de Riqueza Libre de Impuestos</h3>
              <p>
                Aprovechar el Seguro de Vida con Valor en Efectivo (IULs) para ahorros con ventajas
                fiscales y Cuentas de Inversión para Niños.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Paso 06</span>
              <h3>Seguridad Financiera Empresarial</h3>
              <p>
                Implementar Seguros de Persona Clave y Planes de Bonificación Ejecutiva para
                proteger y recompensar a su mejor talento.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Paso 07</span>
              <h3>Planificación Patrimonial y de Legado</h3>
              <p>
                Evite el proceso de sucesión judicial mediante la orientación adecuada sobre Fideicomisos y Testamentos, 
                garantizando Estrategias de Transferencia de Riqueza fluidas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="stories" className="stories container fade-in">
        <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
          Transformaciones Financieras Comprobadas
        </h2>
        <p
          className="text-center text-muted"
          style={{ maxWidth: "600px", margin: "0 auto 3rem", fontSize: "1.1rem" }}
        >
          El éxito financiero no es teórico. Así es como hemos implementado
          estas estrategias exactas para asegurar el futuro de las familias.
        </p>

        <div className="card-grid">
          <article className="card story-card">
            <h4>Deuda Abrumadora Eliminada</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;Trabajé con una pareja joven que se ahogaba en $60,000 de deudas de tarjetas de crédito
              y préstamos personales. En 18 meses, habían pagado más de la mitad de su deuda y 
              estaban ahorrando para su primera casa.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solución:</span> Estrategias Personalizadas de Eliminación 
              de Deudas y Análisis de Flujo de Efectivo.
            </p>
          </article>

          <article className="card story-card">
            <h4>Rollovers de Pensiones Sin Gestión</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;Un empleado federal de 34 años transfirió un TSP anterior a una
              Anualidad Indexada Fija. Esto simplificó su planificación de jubilación e
              incrementó sus ingresos proyectados para la jubilación en miles de dólares.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solución:</span> Rollovers de 401(k) y Anualidades 
              Indexadas Fijas para un crecimiento vinculado al mercado sin riesgo de pérdida.
            </p>
          </article>

          <article className="card story-card">
            <h4>Protección Durante una Enfermedad</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;Un padre descubrió que el seguro de vida de su empleador no era suficiente.
              Establecimos una póliza con beneficios en vida. Un año después, un diagnóstico 
              de cáncer desencadenó pagos que cubrieron los costos del tratamiento.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solución:</span> Seguro de Vida a Término
              con Cobertura de Enfermedades Críticas.
            </p>
          </article>

          <article className="card story-card">
            <h4>Evitar el Probate y las Disputas Familiares</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;Una familia mixta acudió a mí sin saber cómo dividir sus bienes. Los conectamos 
              con un abogado especializado para coordinar fideicomisos y testamentos. Ahora su legado está protegido 
              y se han evitado posibles disputas.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solución:</span> Estrategias de Planificación Patrimonial,
              Orientación sobre Fideicomisos y Testamentos.
            </p>
          </article>

          <article className="card story-card">
            <h4>Estrategia de Retención y Salida Empresarial</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;El propietario de una pequeña empresa quería recompensar a su mejor empleado. 
              Le ayudé a implementar una póliza de seguro de persona clave y un plan de bonificación ejecutiva, 
              lo que añadió un valor significativo a la estructura financiera del negocio.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solución:</span> Seguro de Persona Clave
              y Planes de Bonificación Ejecutiva.
            </p>
          </article>

          <article className="card story-card">
            <h4>Transferencia de Riqueza Generacional</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;Una viuda de 60 años quería dejar un legado. Le ayudé a establecer
              una póliza de seguro de vida permanente. No solo está haciendo crecer su dinero libre
              de impuestos, sino que sabe que sus nietos estarán respaldados financieramente.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solución:</span> Seguro de Vida Permanente
              con Valor en Efectivo y Planificación de Legado.
            </p>
          </article>
        </div>
      </section>

      <section id="services" className="services fade-in text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            Experiencia Financiera Integral
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1rem auto 4rem", fontSize: "1.1rem" }}
          >
            Diseñamos estrategias personalizadas a través de cada pilar de la generación de riqueza,
            asegurando que no haya vacíos en su fortaleza financiera.
          </p>

          <div className="services-wrapper">
            <div className="service-category">
              <h3>Jubilación y Ahorros</h3>
              <ul>
                <li>Planificación de Jubilación</li>
                <li>Gestión de Pensiones</li>
                <li>Transferencias de 401(k) (Rollovers)</li>
                <li>Anualidades Indexadas Fijas</li>
                <li>Ingresos Garantizados para la Jubilación</li>
                <li>Planificación de Ingresos Suplementarios</li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Seguros y Protección</h3>
              <ul>
                <li>Pólizas de Seguro de Vida</li>
                <li>Seguro de Vida a Término</li>
                <li>Seguro de Vida Permanente</li>
                <li>Cobertura de Enfermedades Críticas</li>
                <li>Cobertura de Enfermedades Crónicas y Terminales</li>
                <li>Seguro de Protección Hipotecaria</li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Legado y Familia</h3>
              <ul>
                <li>Planificación Patrimonial</li>
                <li>Planificación de Legado</li>
                <li>Orientación en Fideicomisos y Testamentos</li>
                <li>Cuentas de Inversión para Niños</li>
                <li>Cuentas de Ahorro para Niños</li>
                <li>Estrategias de Transferencia de Riqueza</li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Negocios y Flujo de Efectivo</h3>
              <ul>
                <li>Redes de Seguridad Financiera Empresarial</li>
                <li>Seguro de Persona Clave</li>
                <li>Planes de Bonificación Ejecutiva</li>
                <li>Estrategias de Eliminación de Deuda</li>
                <li>Presupuesto y Análisis de Flujo de Efectivo</li>
                <li>Planificación de Fondo de Emergencia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="lead-gen fade-in">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "3.2rem", color: "var(--text-main)" }}>
            ¿Listo para Construir su Fortaleza?
          </h2>
          <p
            className="text-center"
            style={{
              color: "var(--text-muted)",
              fontSize: "1.2rem",
              marginTop: "1rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Complete el formulario a continuación para que podamos comenzar a diseñar 
            soluciones personalizadas para su familia o negocio.
          </p>

          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <input type="text" name="Full Name" placeholder="Nombre Completo" required disabled={isSubmitting} />
              <input type="email" name="email" placeholder="Correo Electrónico" required disabled={isSubmitting} />
              <input type="tel" name="phone" placeholder="Número de Teléfono" required disabled={isSubmitting} />

              <select name="Primary Goal" required style={{ color: "var(--text-muted)" }} disabled={isSubmitting}>
                <option value="" disabled selected>
                  ¿Cuál es su principal objetivo financiero?
                </option>
                <option value="retirement">Planificación de Jubilación y Rollovers 401(k)</option>
                <option value="insurance">Seguro de Vida y Beneficios en Vida</option>
                <option value="estate">Planificación Patrimonial, Fideicomisos y Testamentos</option>
                <option value="debt">Eliminación de Deudas y Análisis de Flujo de Efectivo</option>
                <option value="business">Salida de Negocios y Bonificación Ejecutiva</option>
                <option value="children">Cuentas de Inversión y Ahorro para Niños</option>
              </select>

              <textarea name="Notes" rows="5" placeholder="Describa brevemente sus prioridades financieras actuales..." disabled={isSubmitting}></textarea>

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
                {isSubmitting ? "Enviando de forma segura..." : "Solicitar Sesión de Estrategia Gratuita"}
              </button>
            </form>
          </div>

          <p
            className="text-center"
            style={{
              marginTop: "6rem",
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "1.6rem",
              color: "var(--text-main)",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.4",
            }}
          >
            &quot;El que observa el viento no sembrará; el que mira a las nubes no segará.&quot; <br />
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--gold)",
                display: "block",
                marginTop: "1rem",
                fontFamily: "var(--font-body)",
                fontStyle: "normal",
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontWeight: 600,
              }}
            >
              – Eclesiastés 11:4
            </span>
          </p>
        </div>
      </section>
    </>
  );
}