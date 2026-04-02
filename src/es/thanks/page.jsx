"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ThanksSpanish() {
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
      <title>Gracias | Legacy in Motion</title>
      <meta name="robots" content="noindex, nofollow" />
      
      <section className="thanks-section fade-in">
        <div className="container content-wrapper text-center">
          <div className="icon-sparkle">✨</div>
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", color: "var(--text-main)" }}>
            Solicitud Recibida
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "3rem" }}>
            Legacy in Motion ha recibido su solicitud con éxito y nos pondremos en contacto 
            en breve para asistirle. Mientras tanto, únase a nuestra comunidad para obtener 
            consejos financieros diarios.
          </p>

          <div className="card-grid" style={{ marginBottom: "4rem" }}>
            <a
              href="https://www.instagram.com/nellylara_financial/"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2.5rem 2rem" }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--gold)" }}>
                Instagram
              </h3>
              <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500 }}>
                @nellylara_financial
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/nellylara/"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2.5rem 2rem" }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--gold)" }}>
                LinkedIn
              </h3>
              <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 500 }}>
                Conecte con Nelly
              </span>
            </a>
          </div>

          <Link href="/es" className="btn-outline">
            Volver al Inicio
          </Link>
        </div>
      </section>
    </>
  );
}