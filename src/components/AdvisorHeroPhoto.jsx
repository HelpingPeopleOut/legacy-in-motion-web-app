"use client";

import { advisorHeadshot } from "@/lib/advisor-media";

export default function AdvisorHeroPhoto({ locale = "en" }) {
  const isEs = locale === "es";

  return (
    <div className="advisor-hero-photo">
      <div className="advisor-hero-photo-frame">
        <img
          src={advisorHeadshot.src}
          alt={advisorHeadshot.alt[isEs ? "es" : "en"]}
          width={480}
          height={480}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="advisor-hero-photo-meta">
        <p className="advisor-hero-photo-name">Nelly Lara Cruz</p>
        <p className="advisor-hero-photo-title">
          {isEs ? "Asociada Financiera Senior" : "Senior Financial Associate"}
        </p>
        <p className="advisor-hero-photo-org">Experior Financial Group Inc.</p>
      </div>
    </div>
  );
}
