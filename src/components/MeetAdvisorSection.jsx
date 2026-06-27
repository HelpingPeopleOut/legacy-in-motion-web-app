"use client";

import { advisorFeatured, advisorGallery } from "@/lib/advisor-media";

const copy = {
  en: {
    eyebrow: "Meet your advisor",
    title: "Real guidance from someone who's lived the struggle",
    sub: "Nelly Lara Cruz helps families across Los Angeles and the San Gabriel Valley build protection, eliminate debt, and plan for generational wealth — backed by industry recognition and a team you can trust.",
    featuredLabel: "Recognition",
    galleryLabel: "In the community",
  },
  es: {
    eyebrow: "Conozca a su asesora",
    title: "Orientación real de alguien que vivió la lucha",
    sub: "Nelly Lara Cruz ayuda a familias en Los Ángeles y el Valle de San Gabriel a construir protección, eliminar deudas y planificar riqueza generacional — respaldada por reconocimiento en la industria y un equipo de confianza.",
    featuredLabel: "Reconocimiento",
    galleryLabel: "En la comunidad",
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

        <p className="advisor-gallery-label">{t.featuredLabel}</p>
        <div className="advisor-featured-grid">
          {advisorFeatured.map((item) => (
            <figure key={item.src} className="advisor-featured-card">
              <div className="advisor-featured-img-wrap">
                <img
                  src={item.src}
                  alt={item.alt[isEs ? "es" : "en"]}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>{item.caption[isEs ? "es" : "en"]}</figcaption>
            </figure>
          ))}
        </div>

        <p className="advisor-gallery-label">{t.galleryLabel}</p>
        <div className="advisor-gallery-grid">
          {advisorGallery.map((item) => (
            <figure
              key={item.src}
              className={`advisor-gallery-item advisor-gallery-item--${item.layout}`}
            >
              <div className="advisor-gallery-img-wrap">
                <img
                  src={item.src}
                  alt={item.alt[isEs ? "es" : "en"]}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>{item.caption[isEs ? "es" : "en"]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
