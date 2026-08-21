import { advisorHeadshot } from "@/lib/advisor-media";

/** Server component — keep LCP portrait in the initial HTML with no client JS. */
export default function AdvisorHeroPhoto({ locale = "en" }: { locale?: "en" | "es" }) {
  const isEs = locale === "es";
  const width = advisorHeadshot.width ?? 288;
  const height = advisorHeadshot.height ?? 288;

  return (
    <div className="advisor-hero-photo">
      <div className="advisor-hero-photo-frame">
        <picture>
          <source
            type="image/webp"
            srcSet={advisorHeadshot.srcSet ?? advisorHeadshot.src}
            sizes={advisorHeadshot.sizes}
          />
          <img
            src={advisorHeadshot.src}
            srcSet={advisorHeadshot.srcSet}
            alt={advisorHeadshot.alt[isEs ? "es" : "en"]}
            width={width}
            height={height}
            sizes={advisorHeadshot.sizes}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
      </div>
      <div className="advisor-hero-photo-meta">
        <p className="advisor-hero-photo-name">Nelly Lara Cruz</p>
        <p className="advisor-hero-photo-title">
          {isEs ? "Asociada Financiera Senior" : "Senior Financial Associate"}
        </p>
        <p className="advisor-hero-photo-org">
          {isEs
            ? "Retrato profesional · Experior Financial Group Inc."
            : "Professional portfolio · Experior Financial Group Inc."}
        </p>
      </div>
    </div>
  );
}
