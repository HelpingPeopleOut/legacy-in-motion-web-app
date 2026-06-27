export type SiteLocale = "en" | "es";

export type LocationCaseStudy = {
  title: string;
  summary: string;
  outcome: string;
};

export type LocationEntry = {
  state: string;
  city: string;
  name: string;
  stateName: string;
  stateAbbr: string;
  region?: string;
  latitude: number;
  longitude: number;
  priority: number;
  headline: string;
  subheadline: string;
  localChallenges: string[];
  services: string[];
  dropdownOptions: string[];
  caseStudies: LocationCaseStudy[];
  legacyPillarHref?: string;
  /** Radius in meters for local GeoCircle schema on priority markets. */
  geoRadiusMeters?: number;
};

const CORE_SERVICES = [
  "Retirement Planning & 401(k) Rollovers",
  "Living Benefits Life Insurance",
  "Estate & Business Planning",
  "Generational Wealth Transfer",
  "Debt Elimination Strategy",
  "Mortgage Protection",
];

const DEFAULT_DROPDOWN = [
  "Retirement & 401(k) Rollover",
  "Living Benefits Life Insurance",
  "Estate Planning & Trusts",
  "Business Owner Strategies",
  "Generational Wealth Transfer",
  "Debt Elimination Strategy",
];

function pasadenaCaseStudies(): LocationCaseStudy[] {
  return [
    {
      title: "CalPERS Pension Optimization",
      summary:
        "A Pasadena city employee nearing retirement needed to protect pension income from market volatility while planning for long-term care.",
      outcome: "Structured a tax-efficient rollover strategy with guaranteed income components — reducing sequence-of-returns risk.",
    },
    {
      title: "Multi-Generational Wealth Transfer",
      summary:
        "An SGV family wanted to pass wealth to grandchildren without probate delays or excessive California estate taxes.",
      outcome: "Implemented living benefits and estate planning tools designed to keep assets protected and transfer-ready.",
    },
  ];
}

function laCaseStudies(): LocationCaseStudy[] {
  return [
    {
      title: "Executive Bonus & Key Person Planning",
      summary:
        "A Los Angeles business owner needed to retain top talent while building a personal exit strategy.",
      outcome: "Coordinated executive bonus plans with living benefits coverage to protect both the business and family.",
    },
    {
      title: "High-Net-Worth Estate Fortress",
      summary:
        "A Westside family required probate avoidance and liquidity for potential long-term care needs.",
      outcome: "Built a layered protection plan combining living benefits with estate planning coordination.",
    },
  ];
}

function nationalCaseStudies(cityName: string): LocationCaseStudy[] {
  return [
    {
      title: `Remote Strategy Session — ${cityName}`,
      summary:
        `A ${cityName} professional wanted fiduciary-style guidance without switching to a local market-only advisor tied to volatile equities.`,
      outcome:
        "Delivered a virtual financial fortress review with retirement, living benefits, and estate planning recommendations tailored to their state.",
    },
    {
      title: "Nationwide 401(k) Protection",
      summary:
        "A client approaching retirement sought principal protection after years of market-exposed 401(k) growth.",
      outcome:
        "Rolled funds into tax-advantaged vehicles designed to participate in upside while limiting downside exposure.",
    },
  ];
}

/** Single source of truth for programmatic location pages. */
export const LOCATIONS: LocationEntry[] = [
  {
    state: "california",
    city: "pasadena",
    name: "Pasadena",
    stateName: "California",
    stateAbbr: "CA",
    region: "San Gabriel Valley",
    latitude: 34.1478,
    longitude: -118.1445,
    priority: 1,
    geoRadiusMeters: 40000,
    headline: "Secure Your Financial Future in Pasadena & the San Gabriel Valley",
    subheadline:
      "Headquartered in Pasadena, we help SGV families protect pensions, roll over 401(k)s, and build generational wealth — with bilingual support.",
    localChallenges: [
      "CalPERS and public-sector pension decisions with complex payout options",
      "California state taxes eroding retirement and investment income",
      "Market volatility threatening 401(k) balances just before retirement",
      "Probate delays and estate taxes affecting multi-generational transfers",
    ],
    services: CORE_SERVICES,
    dropdownOptions: [
      "401(k) or CalPERS Pension Rollover",
      "Fixed Index Annuities (FIAs)",
      "Living Benefits Life Insurance",
      "Estate Planning & Trusts",
      "Generational Wealth Transfer",
    ],
    caseStudies: pasadenaCaseStudies(),
    legacyPillarHref: "/retirement-planning-pasadena",
  },
  {
    state: "california",
    city: "los-angeles",
    name: "Los Angeles",
    stateName: "California",
    stateAbbr: "CA",
    region: "Greater Los Angeles",
    latitude: 34.0522,
    longitude: -118.2437,
    priority: 1,
    geoRadiusMeters: 50000,
    headline: "Premium Wealth & Estate Planning for Los Angeles Families",
    subheadline:
      "From downtown LA to the Westside, we architect financial fortresses for executives, business owners, and families — backed by our Pasadena headquarters.",
    localChallenges: [
      "High cost of living requiring guaranteed income strategies",
      "Business owner exit planning and key person protection",
      "Estate planning for high-net-worth California residents",
      "Critical illness and long-term care liquidity gaps",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: laCaseStudies(),
    legacyPillarHref: "/estate-business-planning-los-angeles",
  },
  {
    state: "california",
    city: "arcadia",
    name: "Arcadia",
    stateName: "California",
    stateAbbr: "CA",
    region: "San Gabriel Valley",
    latitude: 34.1397,
    longitude: -118.0353,
    priority: 2,
    geoRadiusMeters: 30000,
    headline: "Generational Wealth Strategies for Arcadia & the SGV",
    subheadline:
      "Protect what you've built in Arcadia with estate planning, living benefits, and tax-efficient wealth transfer strategies.",
    localChallenges: [
      "Preserving family wealth across generations in the SGV",
      "Balancing real estate equity with retirement liquidity",
      "Coordinating trusts and insurance-based protection",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: pasadenaCaseStudies(),
    legacyPillarHref: "/generational-wealth-arcadia-sgv",
  },
  {
    state: "california",
    city: "santa-monica",
    name: "Santa Monica",
    stateName: "California",
    stateAbbr: "CA",
    region: "Westside Los Angeles",
    latitude: 34.0195,
    longitude: -118.4912,
    priority: 2,
    geoRadiusMeters: 25000,
    headline: "Westside Financial Planning in Santa Monica",
    subheadline:
      "Executive bonus plans, living benefits, and estate strategies for Santa Monica professionals and business owners.",
    localChallenges: [
      "Executive compensation optimization",
      "Coastal California cost-of-living and retirement planning",
      "Business continuity and key person coverage",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: laCaseStudies(),
    legacyPillarHref: "/living-benefits-life-insurance-los-angeles",
  },
  {
    state: "texas",
    city: "houston",
    name: "Houston",
    stateName: "Texas",
    stateAbbr: "TX",
    region: "Gulf Coast",
    latitude: 29.7604,
    longitude: -95.3698,
    priority: 3,
    headline: "Nationwide Financial Planning for Houston Families",
    subheadline:
      "Pasadena, CA–headquartered advisors serving Houston clients remotely with retirement, living benefits, and estate planning.",
    localChallenges: [
      "401(k) rollover decisions after employer changes",
      "Protecting family income from critical illness",
      "Building tax-efficient legacy strategies across state lines",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: nationalCaseStudies("Houston"),
  },
  {
    state: "texas",
    city: "dallas",
    name: "Dallas",
    stateName: "Texas",
    stateAbbr: "TX",
    region: "North Texas",
    latitude: 32.7767,
    longitude: -96.797,
    priority: 3,
    headline: "Wealth Protection Strategies for Dallas Professionals",
    subheadline:
      "Virtual consultations for Dallas-area clients seeking insurance-based financial fortresses beyond traditional market-only advice.",
    localChallenges: [
      "Business owner succession and exit planning",
      "Mortgage and income protection for growing families",
      "Nationwide-compliant retirement rollover guidance",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: nationalCaseStudies("Dallas"),
  },
  {
    state: "new-york",
    city: "new-york",
    name: "New York",
    stateName: "New York",
    stateAbbr: "NY",
    region: "New York Metro",
    latitude: 40.7128,
    longitude: -74.006,
    priority: 3,
    headline: "National Wealth Advisory for New York City Clients",
    subheadline:
      "Legacy in Motion serves NYC families nationwide — retirement optimization, living benefits, and estate planning from our Pasadena headquarters.",
    localChallenges: [
      "High-tax environment wealth preservation",
      "Executive and professional retirement transitions",
      "Estate liquidity and long-term care planning",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: nationalCaseStudies("New York City"),
  },
  {
    state: "florida",
    city: "miami",
    name: "Miami",
    stateName: "Florida",
    stateAbbr: "FL",
    region: "South Florida",
    latitude: 25.7617,
    longitude: -80.1918,
    priority: 3,
    headline: "Bilingual Financial Planning for Miami & South Florida",
    subheadline:
      "English and Spanish strategy sessions for Miami families — retirement, living benefits, and generational wealth from a national advisory firm.",
    localChallenges: [
      "Bilingual financial education and trust-building",
      "Protecting family income across international backgrounds",
      "Retirement planning for entrepreneurs and small business owners",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: nationalCaseStudies("Miami"),
  },
  {
    state: "illinois",
    city: "chicago",
    name: "Chicago",
    stateName: "Illinois",
    stateAbbr: "IL",
    region: "Chicagoland",
    latitude: 41.8781,
    longitude: -87.6298,
    priority: 3,
    headline: "Retirement & Estate Planning for Chicago Families",
    subheadline:
      "National firm, personal strategy — virtual consultations for Chicagoland clients focused on principal protection and legacy building.",
    localChallenges: [
      "Pension and 401(k) consolidation",
      "Market crash protection near retirement",
      "Multi-generational wealth transfer planning",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: nationalCaseStudies("Chicago"),
  },
  {
    state: "arizona",
    city: "phoenix",
    name: "Phoenix",
    stateName: "Arizona",
    stateAbbr: "AZ",
    region: "Valley of the Sun",
    latitude: 33.4484,
    longitude: -112.074,
    priority: 3,
    headline: "Financial Fortress Planning for Phoenix Residents",
    subheadline:
      "Serving Phoenix and Arizona statewide with retirement rollovers, living benefits, and estate strategies from Legacy in Motion.",
    localChallenges: [
      "Retiree income stability in a growing metro",
      "Healthcare and long-term care cost planning",
      "Tax-efficient wealth transfer for Arizona families",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: nationalCaseStudies("Phoenix"),
  },
  {
    state: "georgia",
    city: "atlanta",
    name: "Atlanta",
    stateName: "Georgia",
    stateAbbr: "GA",
    region: "Metro Atlanta",
    latitude: 33.749,
    longitude: -84.388,
    priority: 3,
    headline: "Wealth & Legacy Planning for Atlanta Professionals",
    subheadline:
      "Remote strategy sessions for Atlanta-area clients — insurance-based protection, retirement income, and estate coordination.",
    localChallenges: [
      "Corporate relocation and 401(k) rollovers",
      "Business owner financial strategies",
      "Protecting family wealth from market downturns",
    ],
    services: CORE_SERVICES,
    dropdownOptions: DEFAULT_DROPDOWN,
    caseStudies: nationalCaseStudies("Atlanta"),
  },
];

export function getLocation(state: string, city: string): LocationEntry | undefined {
  return LOCATIONS.find((loc) => loc.state === state && loc.city === city);
}

export function getLocationPath(loc: LocationEntry, locale: SiteLocale = "en"): string {
  const base = `/locations/${loc.state}/${loc.city}`;
  return locale === "es" ? `/es${base}` : base;
}

export function getPriorityLocations(): LocationEntry[] {
  return [...LOCATIONS].sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));
}

export function getLocationsByState(): Map<string, LocationEntry[]> {
  const map = new Map<string, LocationEntry[]>();
  for (const loc of LOCATIONS) {
    const list = map.get(loc.state) ?? [];
    list.push(loc);
    map.set(loc.state, list);
  }
  return map;
}
