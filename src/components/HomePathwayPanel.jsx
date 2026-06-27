"use client";

import Link from "next/link";
import {
  Shield,
  TrendingDown,
  PiggyBank,
  Home,
  Briefcase,
  FileHeart,
  ArrowRight,
  LayoutGrid,
  Phone,
} from "lucide-react";

const pathwaysEn = [
  {
    icon: TrendingDown,
    label: "I'm drowning in debt",
    hint: "See your payoff path",
    href: "/dashboard/tools/debt-freedom",
  },
  {
    icon: Shield,
    label: "My family isn't protected",
    hint: "Calculate coverage needed",
    href: "/dashboard/tools/human-life-value",
  },
  {
    icon: PiggyBank,
    label: "I'm behind on retirement",
    hint: "Forecast tax-free income",
    href: "/dashboard/tools/retirement-forecaster",
  },
  {
    icon: Home,
    label: "I worry about my mortgage",
    hint: "Protection strategies",
    href: "/dashboard/tools/mortgage-protection",
  },
  {
    icon: FileHeart,
    label: "No will or estate plan",
    hint: "Organize your legacy",
    href: "/dashboard/tools/legacy-vault",
  },
  {
    icon: Briefcase,
    label: "I own a business",
    hint: "Business safety nets",
    href: "/business-owner-financial-strategies",
  },
];

const pathwaysEs = [
  { icon: TrendingDown, label: "Estoy ahogado en deudas", hint: "Vea su plan de pago", href: "/dashboard/tools/debt-freedom" },
  { icon: Shield, label: "Mi familia no está protegida", hint: "Calcule la cobertura", href: "/dashboard/tools/human-life-value" },
  { icon: PiggyBank, label: "Voy tarde en jubilación", hint: "Proyecte ingresos libres de impuestos", href: "/dashboard/tools/retirement-forecaster" },
  { icon: Home, label: "Me preocupa mi hipoteca", hint: "Estrategias de protección", href: "/es/proteccion-de-hipoteca-los-angeles" },
  { icon: FileHeart, label: "No tengo testamento", hint: "Organice su legado", href: "/dashboard/tools/legacy-vault" },
  { icon: Briefcase, label: "Tengo un negocio", hint: "Red de seguridad empresarial", href: "/es/estrategias-financieras-para-negocios" },
];

const copy = {
  en: {
    eyebrow: "Start here",
    title: "What's your biggest financial concern?",
    sub: "Pick the challenge that fits you — we'll point you to the right tool or a free strategy call.",
    tools: "Explore all free tools",
    call: "Talk to an advisor — free",
  },
  es: {
    eyebrow: "Empiece aquí",
    title: "¿Cuál es su mayor preocupación financiera?",
    sub: "Elija su situación — le guiamos a la herramienta correcta o a una consulta gratuita.",
    tools: "Ver herramientas gratis",
    call: "Hablar con un asesor — gratis",
  },
};

export default function HomePathwayPanel({ locale = "en" }) {
  const pathways = locale === "es" ? pathwaysEs : pathwaysEn;
  const t = copy[locale] ?? copy.en;
  const consultHref = locale === "es" ? "/es#consultation" : "#consultation";

  return (
    <div className="home-pathway-panel">
      <div className="home-pathway-header">
        <span className="home-pathway-eyebrow">{t.eyebrow}</span>
        <h2 className="home-pathway-title">{t.title}</h2>
        <p className="home-pathway-sub">{t.sub}</p>
      </div>

      <div className="home-pathway-grid">
        {pathways.map((item) => (
          <Link key={item.label} href={item.href} className="home-pathway-card">
            <span className="home-pathway-icon" aria-hidden>
              <item.icon size={20} strokeWidth={1.75} />
            </span>
            <span className="home-pathway-card-text">
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </span>
            <ArrowRight size={16} className="home-pathway-arrow" aria-hidden />
          </Link>
        ))}
      </div>

      <div className="home-pathway-footer">
        <Link href="/dashboard" className="home-pathway-cta home-pathway-cta-tools">
          <LayoutGrid size={18} />
          {t.tools}
        </Link>
        <Link href={consultHref} className="home-pathway-cta home-pathway-cta-call">
          <Phone size={18} />
          {t.call}
        </Link>
      </div>
    </div>
  );
}
