/** Professional portfolio headshot — hero & business profile (optimized WebP + JPEG) */
export const advisorHeadshot = {
  src: "/images/nelly/nelly-hero.webp",
  srcSet:
    "/images/nelly/nelly-hero-160.webp 160w, /images/nelly/nelly-hero-320.webp 320w, /images/nelly/nelly-hero.webp 480w",
  fallbackSrc: "/images/nelly/nelly-hero.jpg",
  fallbackSrcSet:
    "/images/nelly/nelly-hero-160.jpg 160w, /images/nelly/nelly-hero-320.jpg 320w, /images/nelly/nelly-hero.jpg 480w",
  /** Mobile displays ~144–220 CSS px; preload the 320w candidate for 2x DPR */
  preloadSrc: "/images/nelly/nelly-hero-320.webp",
  width: 480,
  height: 480,
  sizes: "(max-width: 768px) 160px, 280px",
  alt: {
    en: "Nelly Lara Cruz — professional business portrait, Senior Financial Associate",
    es: "Nelly Lara Cruz — retrato profesional de negocios, Asociada Financiera Senior",
  },
  caption: {
    en: "Your dedicated financial associate",
    es: "Su asociada financiera dedicada",
  },
};

/** Educating audiences about personal finance */
export const advisorEducation = {
  src: "/images/nelly/gallery-05.webp",
  fallbackSrc: "/images/nelly/gallery-05.jpg",
  width: 550,
  height: 733,
  alt: {
    en: "Nelly Lara Cruz presenting financial education — Elite Honor Graduate, Class of 2025",
    es: "Nelly Lara Cruz presentando educación financiera — Graduada de Honor Elite, Clase 2025",
  },
  caption: {
    en: "Educating families on how money really works — Elite Honor Graduate · Sr. Financial Associate · Class of 2025",
    es: "Educando a familias sobre cómo funciona el dinero — Graduada de Honor Elite · Asociada Financiera Sr. · Clase 2025",
  },
};

/** Shown when visitors read Nelly's personal story */
export const advisorStoryPhoto = {
  src: "/images/nelly/gallery-06.webp",
  fallbackSrc: "/images/nelly/gallery-06.jpg",
  width: 600,
  height: 800,
  alt: {
    en: "Nelly Lara Cruz — financial advisor helping families build legacy and security",
    es: "Nelly Lara Cruz — asesora financiera ayudando a familias a construir legado y seguridad",
  },
  caption: {
    en: "The advisor behind your financial plan",
    es: "La asesora detrás de su plan financiero",
  },
};

/** Nelly and her Experior Financial Group team */
export const advisorTeamGallery = [
  {
    src: "/images/nelly/gallery-01.webp",
    fallbackSrc: "/images/nelly/gallery-01.jpg",
    width: 603,
    height: 800,
    alt: {
      en: "Nelly Lara Cruz with Legacy in Motion advisory team",
      es: "Nelly Lara Cruz con el equipo asesor de Legacy in Motion",
    },
    caption: {
      en: "Nelly & her advisory leadership team",
      es: "Nelly y su equipo de liderazgo asesor",
    },
    layout: "wide",
  },
];
