"use client";

import { advisorEducation } from "@/lib/advisor-media";

const copy = {
  en: {
    eyebrow: "Meet your advisor",
    title: "Education-first guidance you can trust",
    sub: "Nelly Lara Cruz doesn't just sell products — she teaches families across Los Angeles and the San Gabriel Valley how money works, then builds a plan around your goals. You're backed by a recognized advisor and a team that shows up for you.",
    educationLabel: "Financial education in action",
  },
  es: {
    eyebrow: "Conozca a su asesora",
    title: "Orientación basada en educación en la que puede confiar",
    sub: "Nelly Lara Cruz no solo vende productos — enseña a las familias en Los Ángeles y el Valle de San Gabriel cómo funciona el dinero, y luego construye un plan según sus metas. Cuenta con una asesora reconocida y un equipo que está para usted.",
    educationLabel: "Educación financiera en acción",
  },
};

export default function MeetAdvisorSection({ locale = "en" }) {
  const t = copy[locale] ?? copy.en;
  const isEs = locale === "es";

  return (
    <section id="meet-advisor" className="advisor-section fade-in">
      <div className="container">
        <div className="advisor-section-header">
          <p className="advisor-section-eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
          <p>{t.sub}</p>
        </div>

        <p className="advisor-gallery-label">{t.educationLabel}</p>
        <figure className="advisor-education-card">
          <div className="advisor-education-img-wrap">
            <img
              src={advisorEducation.src}
              alt={advisorEducation.alt[isEs ? "es" : "en"]}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>{advisorEducation.caption[isEs ? "es" : "en"]}</figcaption>
        </figure>
      </div>
    </section>
  );
}
