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
          <source
            type="image/webp"
            srcSet={advisorHeadshot.srcSet ?? advisorHeadshot.src}
            sizes={advisorHeadshot.sizes ?? "(max-width: 768px) 160px, 280px"}
          />
          <img
            src={advisorHeadshot.fallbackSrc ?? advisorHeadshot.src}
            srcSet={advisorHeadshot.fallbackSrcSet}
            alt={advisorHeadshot.alt[isEs ? "es" : "en"]}
            width={width}
            height={height}
            sizes={advisorHeadshot.sizes ?? "(max-width: 768px) 160px, 280px"}
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
