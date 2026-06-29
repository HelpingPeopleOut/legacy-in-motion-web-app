"use client";

import { advisorTeamGallery } from "@/lib/advisor-media";

const copy = {
  en: {
    teamLabel: "Nelly & her team",
    teamSub:
      "You're never alone — Legacy in Motion is supported by Experior Financial Group professionals committed to your family's success.",
  },
  es: {
    teamLabel: "Nelly y su equipo",
    teamSub:
      "Nunca está solo — Legacy in Motion cuenta con profesionales de Experior Financial Group comprometidos con el éxito de su familia.",
  },
};

export default function AdvisorTeamAside({ locale = "en" }) {
  const t = copy[locale] ?? copy.en;
  const isEs = locale === "es";
  const teamPhoto = advisorTeamGallery[0];

  if (!teamPhoto) return null;

  return (
    <aside className="faq-team-aside" aria-label={t.teamLabel}>
      <p className="advisor-gallery-label">{t.teamLabel}</p>
      <p className="faq-team-aside-sub">{t.teamSub}</p>
      <figure className="faq-team-aside-photo">
        <div className="faq-team-aside-img-wrap">
          <img
            src={teamPhoto.src}
            alt={teamPhoto.alt[isEs ? "es" : "en"]}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption>{teamPhoto.caption[isEs ? "es" : "en"]}</figcaption>
      </figure>
    </aside>
  );
}
