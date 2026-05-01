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
      <title>Instalar App y Solicitar Llamada | Legacy in Motion</title>
      <meta name="description" content="Instale la aplicación de Legacy in Motion para herramientas exclusivas, o solicite una llamada de nuestros expertos." />

      {/* HERO SECTION - FOCUSED ON APP */}
      <section className="hero fade-in" style={{ padding: "10rem 0 4rem 0", background: "var(--bg-card)" }}>
        <div className="container text-center">
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
            Su Fortaleza Financiera, <br/><span className="text-gold">En Su Bolsillo.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "var(--text-muted)" }}>
            Instale la aplicación de Legacy in Motion para acceder a nuestras herramientas al instante, o solicite una llamada de nuestro equipo a continuación.
          </p>
        </div>
      </section>

      {/* APP INSTALLATION INSTRUCTIONS - MOVED TO TOP */}
      <section className="fade-in" style={{ background: "var(--bg-card)", paddingBottom: "6rem" }}>
        <div className="container text-center">
          <div className="comp-grid" style={{ marginTop: "0" }}>
            {/* Apple / iOS Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-page)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🍎</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>iPhone y iPad (Safari)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6", textAlign: "left", display: "inline-block" }}>
                1. Abra esta página en el navegador <strong>Safari</strong>.<br />
                2. Toque el ícono de <strong>Compartir</strong> (cuadrado con flecha) en la parte inferior.<br />
                3. Desplácese y toque <strong>"Agregar a inicio"</strong>.<br />
                4. Toque <strong>Agregar</strong> en la esquina superior derecha.
              </p>
            </div>

            {/* Android Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-page)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤖</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Android (Chrome)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6", textAlign: "left", display: "inline-block" }}>
                1. Abra esta página en el navegador <strong>Chrome</strong>.<br />
                2. Toque el ícono de <strong>Menú</strong> (tres puntos) arriba a la derecha.<br />
                3. Toque <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla"</strong>.<br />
                4. Siga las instrucciones para agregar el ícono.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE APP SCRIPT CRM FORM - SECONDARY OPTION */}
      <section className="fade-in" style={{ background: "var(--bg-page)", paddingTop: "4rem", paddingBottom: "2rem" }}>
        <GlobalLeadForm 
          title="¿Prefiere hablar con nosotros ahora?"
          subtitle="Solicite una llamada a continuación y nos comunicaremos con usted en menos de 24 horas."
          sourcePage="Spanish App Install / Callback Portal"
          dropdownOptions={[
            "Consulta General",
            "Planificación de Jubilación y 401(k)",
            "Seguro de Vida y Beneficios en Vida",
            "Planificación Patrimonial y Fideicomisos",
            "Estrategia para Eliminar Deudas"
          ]}
        />
      </section>
    </>
  );
}