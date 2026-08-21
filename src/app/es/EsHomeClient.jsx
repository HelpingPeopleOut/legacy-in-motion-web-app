"use client";

import { useEffect } from "react";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import HomePathwayPanel from "@/components/HomePathwayPanel";
import HomeStorySection from "@/components/HomeStorySection";
import TransformationStories from "@/components/TransformationStories";
import AdvisorHeroPhoto from "@/components/AdvisorHeroPhoto";
import MeetAdvisorSection from "@/components/MeetAdvisorSection";
import EnterpriseTrustSignals from "@/components/seo/EnterpriseTrustSignals";
import EnterpriseFaqSection from "@/components/seo/EnterpriseFaqSection";
import AdvisorTeamAside from "@/components/AdvisorTeamAside";
import RelatedIntentLinks, { DEFAULT_RELATED_ES } from "@/components/seo/RelatedIntentLinks";
import { GLOBAL_FAQS_ES } from "@/lib/ai-enterprise";
import Link from "next/link";

export default function HomeSpanish() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((section) => observer.observe(section));
  }, []);

  return (
    <>
      <header className="hero hero-index hero-premium">
        <div className="container hero-premium-grid">
          <div className="hero-intro-content">
            <p className="hero-eyebrow">Legacy in Motion · Sede Pasadena · Nacional</p>
            <h1>
              Asesor Financiero para Familias en Pasadena —{" "}
              <span className="text-gold">Problemas Resueltos, No Solo Productos.</span>
            </h1>
            <AdvisorHeroPhoto locale="es" />

            <HomeStorySection locale="es" />

            <div className="hero-action-buttons">
              <a href="/es/solicitar-llamada" className="btn-gold">Consulta Gratuita</a>
              <a href="#services" className="btn-outline">Ver Servicios</a>
            </div>
          </div>
          <HomePathwayPanel locale="es" />
        </div>
      </header>

      <EnterpriseTrustSignals locale="es" />

      <section id="framework" className="fwf-elegant-section fade-in">
        <div className="container">
          <h2>Su Plan de Riqueza de 7 Pasos</h2>
          <p style={{ marginBottom: "4rem", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto 4rem", fontSize: "1.1rem" }}>
            Una estrategia integral que combina la protección de activos personales, el crecimiento con ventajas fiscales y una estructuración comercial sólida para garantizar que su legado perdure.
          </p>
          <div className="fwf-elegant-grid">
            <article className="fwf-elegant-item"><span className="step-number">Paso 01</span><h3>Flujo de Efectivo y Deudas</h3><p>Análisis de presupuesto y flujo de efectivo para construir hábitos financieros más saludables y eliminar deudas de manera eficiente.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 02</span><h3>Fondo de Emergencia</h3><p>Establecer de 3 a 6 meses de reservas líquidas en Cuentas de Ahorro de Alto Rendimiento para superar la inflación.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 03</span><h3>Protección en Vida</h3><p>Asegurar un Seguro de Vida a Término o Permanente que cubra enfermedades crónicas, críticas y terminales.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 04</span><h3>Optimización de Jubilación</h3><p>Ejecutar Rollovers de 401(k) y utilizar Anualidades Indexadas Fijas para Ingresos de Jubilación Garantizados.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 05</span><h3>Riqueza Libre de Impuestos</h3><p>Aprovechar el Seguro de Vida con Valor en Efectivo (IULs) para ahorros con ventajas fiscales y Cuentas para Niños.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 06</span><h3>Seguridad Empresarial</h3><p>Implementar Seguros de Persona Clave y Planes de Bonificación Ejecutiva para proteger a su mejor talento.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Paso 07</span><h3>Planificación Patrimonial</h3><p>Evite el proceso de sucesión judicial mediante la orientación adecuada sobre Fideicomisos y Testamentos.</p></article>
          </div>
        </div>
      </section>

      <MeetAdvisorSection locale="es" />

      <TransformationStories locale="es" />

      <EnterpriseFaqSection
        title="Preguntas Frecuentes — Respuestas Claras"
        faqs={GLOBAL_FAQS_ES.slice(0, 6)}
        id="home-faq-es"
        aside={<AdvisorTeamAside locale="es" />}
      />

      <section className="text-section fade-in" style={{ background: "var(--bg-page)", padding: "3rem 0" }}>
        <div className="container text-center">
          <p style={{ color: "var(--text-muted)", maxWidth: "640px", margin: "0 auto 1rem" }}>
            Guías sobre rollovers, beneficios en vida, deudas y patrimonio — escritas para búsquedas reales.
          </p>
          <Link href="/es/educacion-financiera" className="btn-outline">
            Centro de Educación Financiera →
          </Link>
        </div>
      </section>

      <section className="fade-in" style={{ background: "var(--bg-page)", padding: "7rem 0" }}>
        <GlobalLeadForm
          title="¿Listo para Comenzar? Solicite una Consulta"
          subtitle="Complete el formulario a continuación. Nuestro equipo revisará su solicitud y le devolverá la llamada en menos de 24 horas."
          lang="es"
          sourcePage="Página de Inicio Principal (ES)"
          dropdownOptions={[
            "Planificación de Jubilación y Rollovers 401(k)",
            "Seguro de Vida y Beneficios en Vida",
            "Planificación Patrimonial, Fideicomisos y Testamentos",
            "Eliminación de Deudas y Análisis de Flujo de Efectivo",
            "Salida de Negocios y Bonificación Ejecutiva",
            "Cuentas de Inversión y Ahorro para Niños",
          ]}
        />
      </section>

      <section id="services" className="services fade-in text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>Experiencia Financiera Integral</h2>
          <p className="text-center text-muted" style={{ maxWidth: "700px", margin: "1rem auto 4rem", fontSize: "1.1rem" }}>
            Diseñamos estrategias personalizadas — elija la ruta que coincida con lo que busca.
          </p>
          <div className="services-wrapper">
            <div className="service-category">
              <h3>Jubilación y Ahorros</h3>
              <ul>
                <li><Link href="/es/planificacion-de-jubilacion-los-angeles">Planificación de Jubilación</Link></li>
                <li><Link href="/es/planificacion-de-jubilacion-los-angeles">Transferencias de 401(k)</Link></li>
                <li><Link href="/es/planificacion-de-jubilacion-los-angeles">Anualidades Indexadas Fijas</Link></li>
                <li><Link href="/es/locations/california/pasadena">Hub de Pasadena</Link></li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Seguros y Protección</h3>
              <ul>
                <li><Link href="/es/beneficios-en-vida-los-angeles">Beneficios en Vida</Link></li>
                <li><Link href="/es/proteccion-de-hipoteca-los-angeles">Protección Hipotecaria</Link></li>
                <li><Link href="/es/beneficios-en-vida-los-angeles">Seguro de Vida Permanente</Link></li>
                <li><Link href="/es/locations/california/los-angeles">Hub de Los Ángeles</Link></li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Legado y Familia</h3>
              <ul>
                <li><Link href="/estate-business-planning-los-angeles">Planificación Patrimonial</Link></li>
                <li><Link href="/es/futuro-financiero-infantil">Cuentas de Inversión para Niños</Link></li>
                <li><Link href="/generational-wealth-arcadia-sgv">Riqueza Generacional</Link></li>
                <li><Link href="/es/locations">Todas las ubicaciones</Link></li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Negocios y Efectivo</h3>
              <ul>
                <li><Link href="/es/estrategias-financieras-para-negocios">Seguridad Empresarial</Link></li>
                <li><Link href="/es/estrategias-financieras-para-negocios">Seguro de Persona Clave</Link></li>
                <li><Link href="/es/estrategia-libre-de-deudas">Eliminación de Deuda</Link></li>
                <li><Link href="/es/solicitar-llamada">Agendar consulta gratuita</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <RelatedIntentLinks locale="es" links={DEFAULT_RELATED_ES} />
    </>
  );
}
