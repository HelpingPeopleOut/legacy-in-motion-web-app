"use client";

import { useEffect } from "react";
import Link from "next/link";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import { BUSINESS } from "@/lib/business";

export default function SolicitarLlamadaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="hero" style={{ padding: "10rem 0 3rem 0", background: "var(--bg-card)" }}>
        <div className="container text-center">
          <p className="hero-eyebrow">Legacy in Motion · Consulta Gratuita</p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", marginBottom: "1rem" }}>
            Solicitar Consulta Financiera Gratuita
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "640px", margin: "0 auto 1.5rem", color: "var(--text-muted)" }}>
            Hable con Nelly Lara sobre jubilación, beneficios en vida, patrimonio, deudas o negocios —
            bilingüe. Sede en Pasadena con sesiones virtuales en todo EE. UU.
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <a href={`tel:${BUSINESS.phone.replace(/\D/g, "")}`} className="btn-outline">
              Llamar {BUSINESS.phoneDisplay}
            </a>
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bg-page)", paddingTop: "2rem", paddingBottom: "2rem" }}>
        <GlobalLeadForm
          title="Agende su llamada gratuita"
          subtitle="Complete unos datos y nos comunicaremos dentro de un día hábil — sin presión de productos."
          sourcePage="Spanish Request Callback / Contact"
          dropdownOptions={[
            "Consulta General",
            "Planificación de Jubilación y 401(k)",
            "Seguro de Vida y Beneficios en Vida",
            "Planificación Patrimonial y Fideicomisos",
            "Estrategia para Eliminar Deudas",
            "Estrategias para Negocios",
          ]}
        />
      </section>

      <section className="fade-in" style={{ background: "var(--bg-card)", padding: "4rem 0 6rem" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>¿Prefiere las herramientas en su teléfono?</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
            Instale Legacy in Motion como aplicación para calculadoras — opcional y separado de su consulta.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/es/herramientas" className="btn-outline">Abrir herramientas →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
