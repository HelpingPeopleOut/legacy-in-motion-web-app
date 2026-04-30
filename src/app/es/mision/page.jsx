"use client";

import { useEffect } from "react";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function MissionSpanish() {
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

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Nuestra Misión | Educación Financiera y Consultoría Los Ángeles</title>
      <meta name="description" content="Legacy in Motion se dedica a eliminar el analfabetismo financiero. Empoderamos a las familias y dueños de negocios en Los Ángeles y el SGV con educación financiera experta." />
      <meta name="keywords" content="Educación financiera Los Ángeles, Educación financiera SGV, Conviértase en asesor financiero Los Ángeles, Planificación financiera comunidades desatendidas, Misión de Legacy in Motion" />
      {/* -------------------- */}

      <header className="hero fade-in" style={{ padding: "14rem 0 8rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.8rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Empoderando a Familias y Dueños de Negocios a través de la Educación Financiera.
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Nuestra misión es eliminar el analfabetismo financiero ayudando a las familias y 
            empresarios a obtener el conocimiento y las estrategias que necesitan para tomar 
            el control de su futuro financiero.
          </p>
          <div className="hero-buttons">
            {/* Actualizado a #consultation para coincidir con el GlobalLeadForm */}
            <a href="#consultation" className="btn-gold btn-pulse">
              Inicie su Viaje Financiero
            </a>
            <a href="#consultation" className="btn-outline">
              Programe una Consulta Gratuita
            </a>
          </div>
        </div>
      </header>

      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "2rem" }}>Nuestra Misión</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            El analfabetismo financiero es uno de los mayores desafíos económicos del mundo, 
            afectando a miles de millones de personas. Nuestra misión es empoderar a las 
            familias y dueños de negocios con la educación y las herramientas financieras 
            que necesitan para tomar decisiones seguras sobre su dinero.
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Nos apasiona especialmente llegar a las comunidades desatendidas y ayudar a las 
            personas a romper el ciclo de la deuda, los malos hábitos financieros y la falta 
            de conocimiento. Creemos que cada familia merece acceso a orientación y 
            oportunidades—ninguna familia es demasiado grande o demasiado pequeña para nosotros.
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "var(--text-main)" }}>
            A medida que crecemos, también estamos comprometidos a desarrollar líderes que 
            compartan esta misión y estén dedicados a llevar la educación financiera a más 
            comunidades en todo el país.
          </p>

          <div className="mission-highlight" style={{ background: "var(--bg-card)", borderLeft: "4px solid var(--gold)", padding: "2.5rem", borderRadius: "0 12px 12px 0", marginTop: "3rem", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "var(--gold)" }}>Por Qué Esto Importa</h3>
            <p style={{ fontSize: "1.05rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
              A muchas familias y dueños de negocios nunca se les enseñó cómo funciona 
              realmente el dinero. Las escuelas rara vez enseñan educación financiera, dejando 
              a las personas solas para navegar por decisiones importantes. Como resultado, 
              muchas personas trabajadoras enfrentan desafíos como deudas abrumadoras, falta de 
              ahorros, protección limitada y gran incertidumbre sobre su futuro financiero.
            </p>
            <p style={{ fontSize: "1.05rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
              Creemos que la educación financiera debe ser accesible para todos. Cuando 
              las personas entienden cómo funciona el dinero, se empoderan para tomar decisiones 
              más inteligentes, construir bases sólidas y crear oportunidades para las 
              futuras generaciones.
            </p>
            <p style={{ fontSize: "1.1rem", marginTop: "1.5rem", color: "var(--text-main)" }}>
              <strong>
                Nuestro objetivo es proporcionar el conocimiento, la orientación y el apoyo 
                necesarios para ayudar a las familias y empresarios a pasar de la 
                incertidumbre a la confianza financiera.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="fade-in" style={{ padding: "4rem 0 6rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div className="card-grid">
            <div className="card info-box">
              <h3 style={{ fontSize: "1.8rem", color: "var(--gold)", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                A Quién Ayudamos
              </h3>
              <ul style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Familias que buscan construir un futuro financiero más sólido</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Emprendedores y dueños de negocios que buscan estrategias más inteligentes</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Individuos que quieren mejorar su conocimiento financiero</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Comunidades desatendidas que han sido ignoradas por los sistemas tradicionales</li>
              </ul>
              <p style={{ marginTop: "1.5rem", fontStyle: "italic", color: "var(--text-main)", fontSize: "0.95rem", fontWeight: 500 }}>
                Nuestro objetivo es hacer que la educación y las herramientas financieras sean accesibles para todos.
              </p>
            </div>

            <div className="card info-box">
              <h3 style={{ fontSize: "1.8rem", color: "var(--gold)", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                Cómo Ayudamos
              </h3>
              <ul style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Entender cómo funciona realmente el dinero</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Construir mejores hábitos financieros</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Reducir y eliminar deudas eficientemente</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Proteger sus ingresos y activos familiares</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Crear estrategias financieras a largo plazo</li>
              </ul>
              <p style={{ marginTop: "1.5rem", fontStyle: "italic", color: "var(--text-main)", fontSize: "0.95rem", fontWeight: 500 }}>
                Nuestro enfoque prioriza la educación—porque las decisiones informadas crean futuros más fuertes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-section fade-in" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-light)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.8rem", marginBottom: "1.5rem" }}>Liderazgo e Impacto</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
            Nuestra misión va más allá de la educación. Estamos construyendo una comunidad de 
            líderes apasionados por compartir el conocimiento financiero y empoderar a otros. 
            Al desarrollar líderes que creen en esta misión, podemos expandir nuestro alcance 
            e impactar a más familias y comunidades en todo el país.
          </p>

          <h2 style={{ fontSize: "2.8rem", marginTop: "4rem", marginBottom: "1.5rem" }}>Únase a la Misión</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            Creemos que el verdadero cambio ocurre cuando las personas se unen con un 
            propósito compartido. Siempre buscamos personas apasionadas que quieran marcar la 
            diferencia ayudando a las familias a tener acceso a la educación financiera.
          </p>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
            Ya sea que desee crecer como líder, servir a su comunidad o ayudar a otros a 
            construir un mejor futuro financiero, hay un lugar para usted en esta misión. 
            Juntos, podemos empoderar a más familias en toda la nación.
          </p>
          <div style={{ marginTop: "3rem" }}>
            <a href="#consultation" className="btn-outline">
              Obtenga Más Información Sobre Unirse al Equipo
            </a>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION (SPANISH) --- */}
      <GlobalLeadForm 
        title="Su Futuro Financiero Comienza Hoy" 
        subtitle="Ya sea una familia en busca de orientación o un dueño de negocio buscando mejores estrategias, estamos aquí para ayudar. Comience su camino hacia el empoderamiento financiero hoy."
        lang="es"
        sourcePage="Spanish Mission & Recruitment Page"
        dropdownOptions={[
          "Programar una Consulta Gratuita",
          "Más Información Sobre Unirse al Equipo",
          "Educación Financiera / Seminarios",
          "Otra Consulta"
        ]}
      />
    </>
  );
}