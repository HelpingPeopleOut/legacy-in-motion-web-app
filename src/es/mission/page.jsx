"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MissionSpanish() {
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

    const formData = new FormData(e.target);
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
      topic: formData.get("Inquiry Type"),
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
      <title>Nuestra Misión | Educación Financiera y Consultoría Los Ángeles</title>
      <meta name="description" content="Legacy in Motion se dedica a eliminar el analfabetismo financiero. Empoderamos a las familias y dueños de negocios en Los Ángeles y el SGV con educación financiera experta." />
      <meta name="keywords" content="Educación financiera Los Ángeles, Educación financiera SGV, Conviértase en asesor financiero Los Ángeles, Planificación financiera comunidades desatendidas, Misión de Legacy in Motion" />
      {/* -------------------- */}

      <header className="hero fade-in">
        <div className="container">
          <h1>Empoderando a Familias y Dueños de Negocios a través de la Educación Financiera.</h1>
          <p>
            Nuestra misión es eliminar el analfabetismo financiero ayudando a las familias y 
            empresarios a obtener el conocimiento y las estrategias que necesitan para tomar 
            el control de su futuro financiero.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-gold btn-pulse">
              Inicie su Viaje Financiero
            </a>
            <a href="#contact" className="btn-outline">
              Programe una Consulta Gratuita
            </a>
          </div>
        </div>
      </header>

      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center">Nuestra Misión</h2>
          <p>
            El analfabetismo financiero es uno de los mayores desafíos económicos del mundo, 
            afectando a miles de millones de personas. Nuestra misión es empoderar a las 
            familias y dueños de negocios con la educación y las herramientas financieras 
            que necesitan para tomar decisiones seguras sobre su dinero.
          </p>
          <p>
            Nos apasiona especialmente llegar a las comunidades desatendidas y ayudar a las 
            personas a romper el ciclo de la deuda, los malos hábitos financieros y la falta 
            de conocimiento. Creemos que cada familia merece acceso a orientación y 
            oportunidades—ninguna familia es demasiado grande o demasiado pequeña para nosotros.
          </p>
          <p>
            A medida que crecemos, también estamos comprometidos a desarrollar líderes que 
            compartan esta misión y estén dedicados a llevar la educación financiera a más 
            comunidades en todo el país.
          </p>

          <div className="mission-highlight">
            <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Por Qué Esto Importa</h3>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              A muchas familias y dueños de negocios nunca se les enseñó cómo funciona 
              realmente el dinero. Las escuelas rara vez enseñan educación financiera, dejando 
              a las personas solas para navegar por decisiones importantes. Como resultado, 
              muchas personas trabajadoras enfrentan desafíos como deudas abrumadoras, falta de 
              ahorros, protección limitada y gran incertidumbre sobre su futuro financiero.
            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              Creemos que la educación financiera debe ser accesible para todos. Cuando 
              las personas entienden cómo funciona el dinero, se empoderan para tomar decisiones 
              más inteligentes, construir bases sólidas y crear oportunidades para las 
              futuras generaciones.
            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              <strong>
                Nuestro objetivo es proporcionar el conocimiento, la orientación y el apoyo 
                necesarios para ayudar a las familias y empresarios a pasar de la 
                incertidumbre a la confianza financiera.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="fade-in" style={{ paddingBottom: "6rem" }}>
        <div className="container">
          <div className="card-grid">
            <div className="card info-box">
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "var(--gold)",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-light)",
                  paddingBottom: "0.5rem",
                }}
              >
                A Quién Ayudamos
              </h3>
              <ul>
                <li>Familias que buscan construir un futuro financiero más sólido</li>
                <li>Emprendedores y dueños de negocios que buscan estrategias más inteligentes</li>
                <li>Individuos que quieren mejorar su conocimiento financiero</li>
                <li>Comunidades desatendidas que han sido ignoradas por los sistemas tradicionales</li>
              </ul>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                }}
              >
                Nuestro objetivo es hacer que la educación y las herramientas financieras sean accesibles para todos.
              </p>
            </div>

            <div className="card info-box">
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "var(--gold)",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-light)",
                  paddingBottom: "0.5rem",
                }}
              >
                Cómo Ayudamos
              </h3>
              <ul>
                <li>Entender cómo funciona realmente el dinero</li>
                <li>Construir mejores hábitos financieros</li>
                <li>Reducir y eliminar deudas</li>
                <li>Proteger sus ingresos y activos</li>
                <li>Crear estrategias financieras a largo plazo</li>
              </ul>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                }}
              >
                Nuestro enfoque prioriza la educación—porque las decisiones informadas crean futuros más fuertes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="text-section fade-in"
        style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <div className="container content-wrapper text-center">
          <h2>Liderazgo e Impacto</h2>
          <p>
            Nuestra misión va más allá de la educación. Estamos construyendo una comunidad de 
            líderes apasionados por compartir el conocimiento financiero y empoderar a otros. 
            Al desarrollar líderes que creen en esta misión, podemos expandir nuestro alcance 
            e impactar a más familias y comunidades en todo el país.
          </p>

          <h2 style={{ marginTop: "4rem" }}>Únase a la Misión</h2>
          <p>
            Creemos que el verdadero cambio ocurre cuando las personas se unen con un 
            propósito compartido. Siempre buscamos personas apasionadas que quieran marcar la 
            diferencia ayudando a las familias a tener acceso a la educación financiera.
          </p>
          <p>
            Ya sea que desee crecer como líder, servir a su comunidad o ayudar a otros a 
            construir un mejor futuro financiero, hay un lugar para usted en esta misión. 
            Juntos, podemos empoderar a más familias en toda la nación.
          </p>
          <div style={{ marginTop: "3rem" }}>
            <a href="#contact" className="btn-outline">
              Obtenga Más Información Sobre Unirse al Equipo
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="lead-gen fade-in">
        <div className="container">
          <h2
            className="text-center"
            style={{ fontSize: "3.2rem", color: "var(--text-main)" }}
          >
            Su Futuro Financiero Comienza Hoy
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
            Ya sea una familia en busca de orientación o un dueño de negocio buscando mejores 
            estrategias, estamos aquí para ayudar. Comience su camino hacia el empoderamiento financiero hoy.
          </p>

          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <input type="text" name="Full Name" placeholder="Nombre Completo" required disabled={isSubmitting} />
              <input type="email" name="email" placeholder="Correo Electrónico" required disabled={isSubmitting} />
              <input type="tel" name="phone" placeholder="Número de Teléfono" required disabled={isSubmitting} />

              <select name="Inquiry Type" required style={{ color: "var(--text-muted)" }} disabled={isSubmitting}>
                <option value="" disabled selected>¿Cómo podemos ayudarle hoy?</option>
                <option value="consultation">Programar una Consulta Gratuita</option>
                <option value="join_team">Más Información Sobre Unirse al Equipo</option>
                <option value="education">Educación Financiera / Talleres</option>
                <option value="other">Otra Consulta</option>
              </select>

              <textarea
                name="Notes"
                rows="5"
                placeholder="Describa brevemente lo que busca lograr..."
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
                {isSubmitting ? "Enviando de forma segura..." : "Inicie su Viaje Financiero"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}