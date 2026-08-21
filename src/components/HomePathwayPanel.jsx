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
    hint: "Debt-free wealth strategy",
    href: "/debt-free-wealth-strategy",
  },
  {
    icon: Shield,
    label: "My family isn't protected",
    hint: "Living benefits coverage",
    href: "/living-benefits-life-insurance-los-angeles",
  },
  {
    icon: PiggyBank,
    label: "I'm behind on retirement",
    hint: "401(k) & pension planning",
    href: "/retirement-planning-pasadena",
  },
  {
    icon: Home,
    label: "I worry about my mortgage",
    hint: "Homeowner protection",
    href: "/mortgage-protection-los-angeles",
  },
  {
    icon: FileHeart,
    label: "No will or estate plan",
    hint: "Estate & legacy planning",
    href: "/estate-business-planning-los-angeles",
  },
  {
    icon: Briefcase,
    label: "I own a business",
    hint: "Business safety nets",
    href: "/business-owner-financial-strategies",
  },
];

const pathwaysEs = [
  {
    icon: TrendingDown,
    label: "Estoy ahogado en deudas",
    hint: "Estrategia libre de deudas",
    href: "/es/estrategia-libre-de-deudas",
  },
  {
    icon: Shield,
    label: "Mi familia no está protegida",
    hint: "Beneficios en vida",
    href: "/es/beneficios-en-vida-los-angeles",
  },
  {
    icon: PiggyBank,
    label: "Voy tarde en jubilación",
    hint: "Planificación de jubilación",
    href: "/es/planificacion-de-jubilacion-los-angeles",
  },
  {
    icon: Home,
    label: "Me preocupa mi hipoteca",
    hint: "Protección de hipoteca",
    href: "/es/proteccion-de-hipoteca-los-angeles",
  },
  {
    icon: FileHeart,
    label: "No tengo testamento",
    hint: "Planificación patrimonial",
    href: "/estate-business-planning-los-angeles",
  },
  {
    icon: Briefcase,
    label: "Tengo un negocio",
    hint: "Red de seguridad empresarial",
    href: "/es/estrategias-financieras-para-negocios",
  },
];

const copy = {
  en: {
    eyebrow: "Start here",
    title: "What's your biggest financial concern?",
    sub: "Pick the challenge that fits you — we'll point you to the right guide or a free strategy call.",
    tools: "Explore all free tools",
    call: "Talk to an advisor — free",
  },
  es: {
    eyebrow: "Empiece aquí",
    title: "¿Cuál es su mayor preocupación financiera?",
    sub: "Elija su situación — le guiamos a la página correcta o a una consulta gratuita.",
    tools: "Ver herramientas gratis",
    call: "Hablar con un asesor — gratis",
  },
};

export default function HomePathwayPanel({ locale = "en" }) {
  const pathways = locale === "es" ? pathwaysEs : pathwaysEn;
  const t = copy[locale] ?? copy.en;
  const consultHref = locale === "es" ? "/es/solicitar-llamada" : "/request-callback";

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
