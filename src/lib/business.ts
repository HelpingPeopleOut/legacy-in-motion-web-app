/** Canonical NAP + brand constants for SEO schema and metadata. */
export const BUSINESS = {
  name: "Legacy in Motion",
  legalName: "Legacy in Motion — Nelly Lara, Senior Financial Associate",
  partner: "Experior Financial Group Inc.",
  url: "https://www.legacyinmotion.org",
  logo: "https://www.legacyinmotion.org/android-chrome-512x512.png",
  phone: "+1-626-203-7652",
  phoneDisplay: "(626) 203-7652",
  email: "info@legacyinmotion.org",
  address: {
    streetAddress: "Pasadena, CA",
    addressLocality: "Pasadena",
    addressRegion: "CA",
    postalCode: "91101",
    addressCountry: "US",
  },
  geo: {
    latitude: 34.1478,
    longitude: -118.1445,
  },
  /** Headquarters region — physical credibility anchor. */
  headquartersRegion: "San Gabriel Valley, California",
  /** Nationwide service capability for schema and copy. */
  nationalServiceArea: "United States",
  serviceType: "Financial Planning & Wealth Protection",
  languages: ["English", "Spanish"],
  social: {
    facebook: "https://www.facebook.com/nelly.lara.509",
    instagram: "https://www.instagram.com/money_withnelz",
    tiktok: "https://www.tiktok.com/@laranell14",
  },
  quickLinksHub: "/links",
} as const;

/** E-E-A-T trust constants for schema, metadata, and visible UI */
export const TRUST = {
  advisorName: "Nelly Lara",
  advisorLegalName: "Nelly Lara Cruz",
  jobTitle: "Senior Financial Associate",
  affiliation: "Experior Financial Group Inc.",
  educationHighlight: "Elite Honor Graduate — Class of 2025",
  serviceModel: "Education-first financial planning — products only after you understand your options",
  complianceNote:
    "Insurance products offered through licensed professionals affiliated with Experior Financial Group Inc. This website is for educational purposes and does not constitute personalized tax, legal, or investment advice.",
  disclosuresUrl: "https://experiorfinancial.com",
  yearsExperience: "10+",
  consultationsOffered: "Free private strategy session — no obligation",
} as const;

/** Social / OG — use professional headshot until dedicated 1200×630 asset is added */
export const DEFAULT_OG_IMAGE = "/images/nelly/nelly-professional.jpg";
export const ADVISOR_HEADSHOT_URL = "/images/nelly/nelly-professional.jpg";
