"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const copy = {
  en: {
    lead: "At 14, my family lost our home in the financial crisis. I saw how money stress can break confidence, relationships, and an entire household — and that's why I help families build real financial security today.",
    readMore: "Read my full story",
    showLess: "Show less",
    credential: "Senior Financial Associate · Experior Financial Group Inc.",
    expanded: [
      "My father lost his business, and I saw firsthand how financial hardship can impact everything — not just money, but confidence, relationships, mental health, and the stability of an entire family.",
      "Years later, after battling years of depression tied to financial stress and loss, my father was diagnosed with stage 4 cancer.",
      "Those experiences changed the direction of my life forever.",
      "They made me realize that most hardworking families are never truly taught how money works, how to protect what they build, how taxes affect their future, or how to create long-term financial security.",
      "That's why I do what I do today.",
      "My mission is to help families, homeowners, parents, professionals, and business owners build stronger financial foundations through simple education, wealth protection, retirement guidance, and legacy-focused planning.",
    ],
    closing:
      "Because financial freedom isn't just about making money. It's about protecting your family, creating stability, and giving future generations opportunities you may never have had yourself.",
    whyBold: "That's why I do what I do today.",
  },
  es: {
    lead: "A los 14 años mi familia perdió nuestro hogar en la crisis financiera. Vi cómo el estrés financiero puede quebrar la confianza, las relaciones y todo un hogar — y por eso hoy ayudo a las familias a construir seguridad financiera real.",
    readMore: "Leer mi historia completa",
    showLess: "Mostrar menos",
    credential: "Asociada Financiera Senior · Experior Financial Group Inc.",
    expanded: [
      "Mi padre perdió su negocio, y vi de primera mano cómo la dificultad financiera impacta todo — no solo el dinero, sino la confianza, las relaciones, la salud mental y la estabilidad de toda una familia.",
      "Años después, tras años de depresión ligada al estrés financiero y las pérdidas, a mi padre le diagnosticaron cáncer en etapa 4.",
      "Esas experiencias cambiaron el rumbo de mi vida para siempre.",
      "Me hicieron comprender que a la mayoría de las familias trabajadoras nunca se les enseña cómo funciona el dinero, cómo proteger lo que construyen, cómo los impuestos afectan su futuro, o cómo crear seguridad financiera a largo plazo.",
      "Por eso hago lo que hago hoy.",
      "Mi misión es ayudar a familias, propietarios, padres, profesionales y dueños de negocios a construir bases financieras más sólidas mediante educación simple, protección patrimonial, orientación de jubilación y planificación enfocada en el legado.",
    ],
    closing:
      "Porque la libertad financiera no se trata solo de ganar dinero. Se trata de proteger a su familia, crear estabilidad y dar a las futuras generaciones oportunidades que usted quizás nunca tuvo.",
    whyBold: "Por eso hago lo que hago hoy.",
  },
};

export default function HomeStorySection({ locale = "en" }) {
  const [expanded, setExpanded] = useState(false);
  const t = copy[locale] ?? copy.en;

  return (
    <div className="hero-intro-story">
      <p className="hero-intro-lead">{t.lead}</p>

      {!expanded ? (
        <button
          type="button"
          className="hero-story-toggle"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
        >
          {t.readMore}
          <ChevronDown size={18} />
        </button>
      ) : (
        <>
          {t.expanded.map((paragraph, i) => (
            <p key={i}>{i === 4 ? <strong>{paragraph}</strong> : paragraph}</p>
          ))}
          <p className="hero-intro-closing">{t.closing}</p>
          <button
            type="button"
            className="hero-story-toggle"
            onClick={() => setExpanded(false)}
            aria-expanded={true}
          >
            {t.showLess}
            <ChevronDown size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
        </>
      )}

      <p className="hero-credential">{t.credential}</p>
    </div>
  );
}
