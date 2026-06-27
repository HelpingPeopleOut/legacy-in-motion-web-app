"use client";

import dynamic from "next/dynamic";
import { TrendingDown, Shield, Heart, Landmark } from "lucide-react";

const InstagramEmbed = dynamic(() => import("@/components/InstagramEmbed"), {
  ssr: false,
  loading: () => (
    <div className="ig-embed-wrap" style={{ minHeight: 320, background: "#f4f4f4", borderRadius: 12 }} />
  ),
});

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const storiesEn = [
  {
    icon: TrendingDown,
    title: "Overwhelming Debt Eliminated",
    quote:
      "I worked with a young couple drowning in $60,000 of credit card and personal loan debt. Within 18 months, they had paid off over half their debt and were saving for their first home.",
    solution: "Customized Debt Elimination Strategies & Cash Flow Analysis.",
    metric: "$60K",
    metricLabel: "debt addressed",
  },
  {
    icon: Landmark,
    title: "Unmanaged Pension Rollovers",
    quote:
      "A 34-year-old federal employee rolled a previous TSP into a Fixed Indexed Annuity. This simplified his retirement planning and increased his projected retirement income by thousands.",
    solution: "401(k) Rollovers & Fixed Indexed Annuities.",
    metric: "+$1K+",
    metricLabel: "monthly income",
  },
  {
    icon: Shield,
    title: "Protection During Illness",
    quote:
      "A father discovered his employer life insurance wasn't enough. We set up a policy with living benefits. A year later, a cancer diagnosis triggered payouts that covered treatment costs.",
    solution: "Term Life Insurance with Critical Illness Coverage.",
    metric: "100%",
    metricLabel: "treatment covered",
  },
  {
    icon: Heart,
    title: "Avoiding Probate",
    quote:
      "A blended family came to me unsure how to divide assets. We connected them with an estate attorney to coordinate trusts and wills. Now their legacy is protected.",
    solution: "Estate Planning Strategies, Trusts, and Wills Guidance.",
    metric: "Legacy",
    metricLabel: "secured",
  },
];

const storiesEs = [
  {
    icon: TrendingDown,
    title: "Deuda Abrumadora Eliminada",
    quote:
      "Trabajé con una pareja joven que se ahogaba en $60,000 de deudas de tarjetas de crédito. En 18 meses, habían pagado más de la mitad de su deuda y estaban ahorrando para su primera casa.",
    solution: "Estrategias de Eliminación de Deudas y Análisis de Flujo de Efectivo.",
    metric: "$60K",
    metricLabel: "deuda abordada",
  },
  {
    icon: Landmark,
    title: "Rollovers Sin Gestión",
    quote:
      "Un empleado federal transfirió un TSP anterior a una Anualidad Indexada Fija. Esto simplificó su planificación e incrementó sus ingresos proyectados en miles de dólares.",
    solution: "Rollovers de 401(k) y Anualidades Indexadas Fijas.",
    metric: "+$1K+",
    metricLabel: "ingreso mensual",
  },
  {
    icon: Shield,
    title: "Protección Durante Enfermedad",
    quote:
      "Establecimos una póliza con beneficios en vida para un padre. Un año después, un diagnóstico de cáncer desencadenó pagos que cubrieron los costos del tratamiento.",
    solution: "Seguro de Vida a Término con Cobertura de Enfermedades Críticas.",
    metric: "100%",
    metricLabel: "tratamiento cubierto",
  },
  {
    icon: Heart,
    title: "Evitar Disputas Familiares",
    quote:
      "Los conectamos con un abogado especializado para coordinar fideicomisos y testamentos. Ahora su legado está protegido y se han evitado posibles disputas.",
    solution: "Orientación sobre Fideicomisos y Testamentos.",
    metric: "Legado",
    metricLabel: "asegurado",
  },
];

const copy = {
  en: {
    title: "Proven Financial Transformations",
    sub: "Financial success isn't theoretical. Here is how we've implemented these exact strategies to secure families' futures.",
    igLabel: "Follow on Instagram",
    igHandle: "@nellylara_financial",
    igHref: "https://www.instagram.com/nellylara_financial/",
    solution: "Solution",
  },
  es: {
    title: "Transformaciones Comprobadas",
    sub: "El éxito financiero no es teórico. Así es como hemos implementado estas estrategias exactas para asegurar el futuro de las familias.",
    igLabel: "Síguenos en Instagram",
    igHandle: "@nellylara_financial",
    igHref: "https://www.instagram.com/nellylara_financial/",
    solution: "Solución",
  },
};

export default function TransformationStories({ locale = "en" }) {
  const t = copy[locale] ?? copy.en;
  const stories = locale === "es" ? storiesEs : storiesEn;

  return (
    <section id="stories" className="stories stories-showcase fade-in">
      <div className="container">
        <div className="stories-showcase-header">
          <h2>{t.title}</h2>
          <p>{t.sub}</p>
        </div>

        <div className="stories-showcase-grid">
          <aside className="stories-ig-panel">
            <div className="stories-ig-panel-inner">
              <div className="stories-ig-label">
                <InstagramIcon className="stories-ig-icon" />
                <span>{t.igLabel}</span>
              </div>
              <InstagramEmbed />
              <a
                href={t.igHref}
                target="_blank"
                rel="noopener noreferrer"
                className="stories-ig-link"
              >
                {t.igHandle}
              </a>
            </div>
          </aside>

          <div className="stories-cards-scroll">
            <div className="stories-cards-grid">
              {stories.map((story) => {
                const Icon = story.icon;
                return (
                  <article key={story.title} className="story-card-v2">
                    <div className="story-card-v2-top">
                      <span className="story-card-v2-icon">
                        <Icon aria-hidden />
                      </span>
                      <div className="story-card-v2-metric">
                        <strong>{story.metric}</strong>
                        <small>{story.metricLabel}</small>
                      </div>
                    </div>
                    <h4>{story.title}</h4>
                    <p className="story-card-v2-quote">&ldquo;{story.quote}&rdquo;</p>
                    <p className="story-card-v2-solution">
                      <span className="text-gold">{t.solution}:</span> {story.solution}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
