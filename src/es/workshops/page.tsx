"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WorkshopsSpanish() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      name: formData.get("Contact Name") + " (" + formData.get("Organization") + ")",
      email: formData.get("email"),
      phone: formData.get("phone"),
      topic: formData.get("Workshop Topic"),
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
      <title>Talleres Corporativos de Bienestar Financiero Los Ángeles | Legacy in Motion</title>
      <meta name="description" content="Organice talleres profesionales de educación financiera para empleados. Los temas incluyen eliminación de deudas, construcción de crédito y estrategias de crecimiento." />
      <meta name="keywords" content="Talleres corporativos de bienestar financiero Los Ángeles, Programas de educación financiera para empleados SGV, Educación financiera para empresas, Seminarios financieros en español" />
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
            talleres profesionales diseñados para eliminar el estrés financiero de los 
            empleados y construir una hoja de ruta hacia la verdadera riqueza.
          </p>
          <a href="#inquiry" className="btn-gold btn-pulse">
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
            Temas de las Clases Magistrales
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

      <section
        id="inquiry"
        className="lead-gen dark-theme fade-in"
        style={{ padding: "8rem 0", background: "var(--bg-dark)", color: "#ffffff" }}
      >
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "3rem", color: "#ffffff" }}>
            Organice una Sesión
          </h2>
          <p
            className="text-center"
            style={{ color: "#aaa", maxWidth: "600px", margin: "1.5rem auto 0", fontSize: "1.1rem" }}
          >
            Complete el formulario de consulta a continuación. Esto se dirige directamente a 
            Legacy in Motion para comenzar a coordinar su evento.
          </p>

          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <input type="text" name="Organization" placeholder="Nombre de la Organización" required disabled={isSubmitting} />
                </div>
                <div>
                  <input type="text" name="Contact Name" placeholder="Nombre de la Persona de Contacto" required disabled={isSubmitting} />
                </div>
                <div>
                  <input type="email" name="email" placeholder="Correo Electrónico" required disabled={isSubmitting} />
                </div>
                <div>
                  <input type="tel" name="phone" placeholder="Número de Teléfono" required disabled={isSubmitting} />
                </div>
                <div className="form-full">
                  <select name="Workshop Topic" required disabled={isSubmitting}>
                    <option value="" disabled selected>Seleccione el Tema Principal de Interés</option>
                    <option value="Debt & Credit">Gestión de Deudas y Construcción de Crédito</option>
                    <option value="Growth & Wealth">Estrategias de Crecimiento y Gestión de Riesgos</option>
                    <option value="Taxes & Wealth">El Impacto de los Impuestos en la Riqueza</option>
                    <option value="Full Series">Serie Integral de Bienestar Financiero</option>
                  </select>
                </div>
                <div className="form-full">
                  <textarea
                    name="Notes"
                    rows="6"
                    placeholder="Cuéntenos sobre su grupo (tamaño estimado de audiencia, fechas preferidas, ubicación)..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <div className="form-full" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
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
              </div>

              <button type="submit" className="btn-gold" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Enviando Solicitud..." : "Enviar Consulta de Reserva"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}