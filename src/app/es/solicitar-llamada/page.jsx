"use client";

import { useEffect } from "react";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function SolicitarLlamadaPage() {
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
      <title>Solicitar Llamada e Instalar App | Legacy in Motion</title>
      <meta name="description" content="Solicite una consulta estratégica financiera gratuita y aprenda cómo instalar la aplicación de Legacy in Motion directamente en su teléfono." />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-card)" }}>
        <div className="container text-center">
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
            Construyamos Su <span className="text-gold">Legado.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "var(--text-muted)" }}>
            Solicite una llamada a continuación para hablar directamente con un experto, o instale nuestra aplicación para mantener nuestras herramientas financieras en su bolsillo.
          </p>
        </div>
      </section>

      {/* THE APP SCRIPT CRM FORM */}
      <div className="fade-in" style={{ marginTop: "-4rem" }}>
        <GlobalLeadForm 
          title="Programe Su Sesión Estratégica Gratuita"
          subtitle="Nuestro equipo revisará su solicitud y le devolverá la llamada en menos de 24 horas para comenzar su plan financiero."
          sourcePage="Spanish Request Callback Portal"
          dropdownOptions={[
            "Consulta General",
            "Planificación de Jubilación y 401(k)",
            "Seguro de Vida y Beneficios en Vida",
            "Planificación Patrimonial y Fideicomisos",
            "Estrategia para Eliminar Deudas"
          ]}
        />
      </div>

      {/* APP INSTALLATION INSTRUCTIONS */}
      <section className="fade-in" style={{ background: "var(--bg-page)", padding: "6rem 0" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem" }}>Cómo Instalar Nuestra App</h2>
          
          <div className="comp-grid">
            {/* Apple / iOS Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🍎</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>iPhone y iPad (Safari)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                1. Abra este sitio web en el navegador <strong>Safari</strong>.<br />
                2. Toque el ícono de <strong>Compartir</strong> (el cuadrado con una flecha apuntando hacia arriba) en la parte inferior de la pantalla.<br />
                3. Desplácese por el menú y toque <strong>"Agregar a inicio"</strong>.<br />
                4. Toque <strong>Agregar</strong> en la esquina superior derecha.
              </p>
            </div>

            {/* Android Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤖</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Android (Chrome)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                1. Abra este sitio web en el navegador <strong>Chrome</strong>.<br />
                2. Toque el ícono de <strong>Menú</strong> (tres puntos) en la esquina superior derecha de la pantalla.<br />
                3. Toque <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.<br />
                4. Siga las instrucciones para agregar el ícono a su teléfono.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}