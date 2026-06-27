import { BUSINESS } from "@/lib/business";
import { buildSiteUrl } from "@/lib/seo-metadata";

export type SocialLink = {
  id: string;
  label: string;
  labelEs: string;
  href: string;
  network: "facebook" | "instagram" | "tiktok";
};

export type QuickFormLink = {
  id: string;
  label: string;
  labelEs: string;
  description: string;
  descriptionEs: string;
  href: string;
  accent?: "gold" | "outline";
};

export const NELLY_SOCIAL: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    labelEs: "Facebook",
    href: "https://www.facebook.com/nelly.lara.509",
    network: "facebook",
  },
  {
    id: "instagram",
    label: "Instagram",
    labelEs: "Instagram",
    href: "https://www.instagram.com/money_withnelz",
    network: "instagram",
  },
  {
    id: "tiktok",
    label: "TikTok",
    labelEs: "TikTok",
    href: "https://www.tiktok.com/@laranell14",
    network: "tiktok",
  },
];

/** JotForm + on-site quick actions — replaces external Linktree for customers. */
export const NELLY_QUICK_FORMS: QuickFormLink[] = [
  {
    id: "learn-money",
    label: "Learn Money",
    labelEs: "Aprende sobre el Dinero",
    description: "Free financial education — start here",
    descriptionEs: "Educación financiera gratuita — comience aquí",
    href: "https://form.jotform.com/251911458031047",
    accent: "gold",
  },
  {
    id: "interview",
    label: "Interview with Our Firm",
    labelEs: "Entrevista con Nuestra Firma",
    description: "Schedule a strategy conversation",
    descriptionEs: "Agende una conversación de estrategia",
    href: "https://form.jotform.com/251912200783148",
    accent: "gold",
  },
  {
    id: "life-quote",
    label: "Life Insurance Quote",
    labelEs: "Cotización de Seguro de Vida",
    description: "Term or permanent — get a quote",
    descriptionEs: "Término o permanente — solicite cotización",
    href: "https://form.jotform.com/251911548230048",
    accent: "outline",
  },
  {
    id: "children-account",
    label: "Children's Account",
    labelEs: "Cuenta para Niños",
    description: "Generational wealth for your kids",
    descriptionEs: "Riqueza generacional para sus hijos",
    href: "https://form.jotform.com/251912066869062",
    accent: "outline",
  },
];

/** Relative paths for in-app navigation (avoids cross-host / SSL issues). */
export const NELLY_ON_SITE_PATHS = {
  consultation: "/request-callback",
  consultationEs: "/es/solicitar-llamada",
  linksHub: "/links",
  linksHubEs: "/es/links",
} as const;

export const NELLY_ON_SITE_ACTIONS = {
  consultation: buildSiteUrl(NELLY_ON_SITE_PATHS.consultation),
  consultationEs: buildSiteUrl(NELLY_ON_SITE_PATHS.consultationEs),
  phone: `tel:${BUSINESS.phone.replace(/\D/g, "")}`,
  phoneDisplay: BUSINESS.phoneDisplay,
  linksHub: buildSiteUrl(NELLY_ON_SITE_PATHS.linksHub),
  linksHubEs: buildSiteUrl(NELLY_ON_SITE_PATHS.linksHubEs),
} as const;

export function getSocialUrls(): string[] {
  return NELLY_SOCIAL.map((s) => s.href);
}
