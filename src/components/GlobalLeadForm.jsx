"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function SpanishRetirementPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Custom form handler for Google Apps Script
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
      topic: formData.get("Primary Goal"),
      notes: formData.get("Notes") + " (Lead from ES Retirement/Rollover Page)",
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

  // --- INVISIBLE LOCAL SEO SCHEMA (For Google & AI Overviews in Spanish) ---
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion (Servicios de Jubilación)",
    "description": "Expertos en planificación de jubilación, transferencias de 401(k) (rollovers) y anualidades indexadas fijas para la comunidad hispana en Los Ángeles y el Valle de San Gabriel.",
    "areaServed": [
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "City", "name": "Pasadena" },
      { "@type": "City", "name": "El Monte" },
      { "@type": "City", "name": "Downey" },
      { "@type": "Region", "name": "San Gabriel Valley" }
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
      <title>Planificación de Jubilación y Rollover de 401(k) en Los Ángeles | Legacy in Motion</title>
      <meta name="description" content="Proteja sus ahorros de jubilación de las caídas del mercado. Especialistas en transferencias de 401(k), pensiones y Anualidades Indexadas Fijas en California." />
      <meta name="keywords" content="Planificación de jubilación Los Angeles, Rollover de 401k en español, Proteger dinero del mercado, Anualidades indexadas fijas California, Asesor financiero hispano" />
      <Script 
        id="schema-es-retirement"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
      />
      {/* -------------------- */}

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Asegure su Jubilación. <br/><span className="text-gold">Cero Riesgo de Perder en el Mercado.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Usted ha trabajado duro durante décadas. Le ayudamos a transferir su 401(k) o pensión a cuentas seguras que crecen con el mercado, pero que nunca pierden su capital cuando la economía cae.
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">Proteger Mis Ahorros</a>
          </div>
        </div>
      </section>

      {/* PROBLEM & AGITATION (PAS Framework) */}
      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            ¿Sobrevivirá su 401(k) a la Próxima Caída de Wall Street?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Muchos trabajadores en California dejan sus cuentas de 401(k) olvidadas en antiguos empleos, completamente expuestas a la volatilidad del mercado de valores. Una caída del 20% podría retrasar su jubilación por años.
          </p>
          <div style={{ background: "var(--bg-page)", padding: "2.5rem", borderRadius: "12px", borderLeft: "4px solid var(--gold)", marginTop: "2rem", textAlign: "left", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
              <strong>La Realidad que los Bancos no le Dicen:</strong> Usted no tiene que arriesgar su dinero para hacerlo crecer. Si está a punto de jubilarse o ha cambiado de trabajo, puede realizar un "Rollover" (transferencia libre de impuestos) hacia una Anualidad Indexada Fija. Usted participa de las ganancias del mercado, pero si el mercado cae, usted no pierde ni un centavo.
            </p>
          </div>
        </div>
      </section>

      {/* AI-OPTIMIZED FAQ SECTION (Direct Answers for LLMs in Spanish) */}
      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "3rem" }}>
            Preguntas Frecuentes sobre Jubilación y Rollovers
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                ¿Qué debo hacer con mi 401(k) si cambio de trabajo o me jubilo?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Nunca debe dejar su dinero en la cuenta de su antiguo empleador ni retirarlo en efectivo (ya que pagaría altas penalidades). La mejor opción es hacer un "Rollover Directo" hacia una cuenta IRA o una Anualidad Indexada Fija (FIA). Esto transfiere su dinero sin pagar impuestos al IRS y le da control total sobre sus fondos.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                ¿Puedo perder mi dinero si la economía o el mercado caen?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Si su dinero está en un 401(k) tradicional o en la bolsa de valores, sí. Pero si transfiere sus fondos a una Anualidad Indexada Fija a través de nuestra estrategia, su capital está protegido por un "piso de cero". Si el mercado cae un 30%, su cuenta simplemente se queda en cero pérdidas; no gana ese año, pero no pierde un solo dólar de sus ahorros.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                ¿Qué es un ingreso garantizado de por vida?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Es una estrategia financiera que estructura sus ahorros para pagarle un "cheque de pago" mensual constante por el resto de su vida, sin importar cuánto tiempo viva ni cómo se comporte la economía. Es como crear su propia pensión privada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM (En Español) */}
      <section id="consultation" className="lead-gen fade-in" style={{ borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "3.2rem", color: "var(--text-main)" }}>
            Solicite su Revisión de Jubilación Gratuita
          </h2>
          <p className="text-center" style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginTop: "1rem", maxWidth: "600px", margin: "1rem auto 3rem" }}>
            Hable con nuestros expertos locales en Los Ángeles para averiguar cuánto ingreso garantizado podría generar a partir de su 401(k) o pensión.
          </p>

          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input type="text" name="Full Name" placeholder="Nombre Completo" required disabled={isSubmitting} />
                <input type="email" name="email" placeholder="Correo Electrónico" required disabled={isSubmitting} />
                <input type="tel" name="phone" placeholder="Número de Teléfono" className="form-full" required disabled={isSubmitting} />

                <select name="Primary Goal" className="form-full" required style={{ color: "var(--text-muted)" }} disabled={isSubmitting}>
                  <option value="" disabled selected>¿Qué tipo de cuenta desea proteger?</option>
                  <option value="401k Antiguo">Transferencia de 401(k) Antiguo</option>
                  <option value="Pension / Retiro">Gestión de Pensión / Retiro</option>
                  <option value="Planificacion General">Planificación General de Jubilación</option>
                  <option value="Proteccion de Mercado">Proteger mis ahorros de caídas del mercado</option>
                </select>

                <textarea name="Notes" className="form-full" rows="4" placeholder="Describa brevemente cuánto tiempo falta para su jubilación..." disabled={isSubmitting}></textarea>

                <div className="form-full" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                  <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                    Adjuntar Estado de Cuenta (Opcional - 100% Seguro)
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

                <button type="submit" className="btn-gold btn-pulse form-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando su solicitud..." : "Solicitar Mi Estrategia Gratuita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}