"use client";

import { advisorHeadshot } from "@/lib/advisor-media";

export default function AdvisorHeroPhoto({ locale = "en" }) {
  const isEs = locale === "es";
  const width = advisorHeadshot.width ?? 480;
  const height = advisorHeadshot.height ?? 480;

  return (
    <div className="advisor-hero-photo">
      <div className="advisor-hero-photo-frame">
        <picture>
          <source srcSet={advisorHeadshot.src} type="image/webp" />
          <img
            src={advisorHeadshot.fallbackSrc ?? advisorHeadshot.src}
            alt={advisorHeadshot.alt[isEs ? "es" : "en"]}
            width={width}
            height={height}
            sizes="(max-width: 768px) 220px, 280px"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div className="advisor-hero-photo-meta">
        <p className="advisor-hero-photo-name">Nelly Lara Cruz</p>
        <p className="advisor-hero-photo-title">
          {isEs ? "Asociada Financiera Senior" : "Senior Financial Associate"}
        </p>
        <p className="advisor-hero-photo-org">
          {isEs ? "Retrato profesional · Experior Financial Group Inc." : "Professional portfolio · Experior Financial Group Inc."}
        </p>
      </div>
    </div>
  );
}
