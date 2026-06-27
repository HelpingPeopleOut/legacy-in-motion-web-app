export type ToolAccess = "free" | "premium" | "one_time" | "hybrid";

/** Who primarily uses this tool in day-to-day work */
export type ToolAudience = "customer" | "agent" | "other";

/** Functional type — analyzers, trackers, etc. */
export type ToolCategory = "analyzer" | "tracker" | "simulator" | "portal";

export interface ToolDefinition {
  slug: string;
  name: string;
  description: string;
  access: ToolAccess;
  audience: ToolAudience;
  /** Product key required for one_time tools */
  productKey?: "HLV_REPORT" | "LEGACY_VAULT";
  category: ToolCategory;
  icon: string;
  advisorCta?: string;
  existingComponent?: string;
}

export const TOOL_AUDIENCE_META: Record<
  ToolAudience,
  { label: string; shortLabel: string; description: string }
> = {
  customer: {
    label: "For clients",
    shortLabel: "Clients",
    description:
      "Self-serve between meetings — track progress, organize documents, and stay on top of your plan.",
  },
  agent: {
    label: "For advisors",
    shortLabel: "Advisors",
    description:
      "Advisor Pro ($15/mo or $100/yr) — client premium tools plus meeting prep, What-If modeling, and upcoming releases.",
  },
  other: {
    label: "Workshops & learning",
    shortLabel: "Workshops",
    description:
      "Educational calculators and scenario tools for seminars, prospecting, and joint planning sessions.",
  },
};

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  analyzer: "Analyzer",
  tracker: "Tracker",
  simulator: "Simulator",
  portal: "Vault & portal",
};

export const TOOLS: ToolDefinition[] = [
  // ─── Client tools ─────────────────────────────────────────────────────────
  {
    slug: "legacy-vault",
    name: "Digital Legacy & Vault",
    description: "Organize wills, trusts, policy numbers, and beneficiary instructions in one secure place.",
    access: "one_time",
    audience: "customer",
    productKey: "LEGACY_VAULT",
    category: "portal",
    icon: "vault",
    advisorCta: "No Will or Trust? Schedule a legacy planning session.",
  },
  {
    slug: "beneficiary-checklist",
    name: "Beneficiary Review Checklist",
    description: "Walk through every account and policy to confirm beneficiaries are current and aligned with your wishes.",
    access: "free",
    audience: "customer",
    category: "tracker",
    icon: "users",
    advisorCta: "Not sure who to name? Book a beneficiary alignment review.",
  },
  {
    slug: "debt-freedom",
    name: "Debt Freedom Visualizer",
    description: "Visualize credit card payoff time, total interest, and how extra payments shorten the journey.",
    access: "free",
    audience: "customer",
    category: "simulator",
    icon: "zap",
    existingComponent: "DebtFreedomVisualizer",
  },
  {
    slug: "emergency-fund",
    name: "Emergency Fund Builder",
    description: "Build a 3–6 month cash cushion — set a goal, track progress, and see how long it takes at your savings pace.",
    access: "premium",
    audience: "customer",
    category: "tracker",
    icon: "piggy",
    existingComponent: "ProgressTracker",
  },
  {
    slug: "financial-vital-signs",
    name: "Financial Vital Signs",
    description: "A 2-minute checkup — emergency savings, debt pressure, family protection, and monthly breathing room. Rough estimates welcome.",
    access: "premium",
    audience: "customer",
    category: "tracker",
    icon: "activity",
  },
  {
    slug: "policy-ladder",
    name: "Policy Maturity & Ladder Tracker",
    description: "List your policies once — see what's expiring next, when premiums are due, and avoid lapse gaps.",
    access: "premium",
    audience: "customer",
    category: "tracker",
    icon: "layers",
    advisorCta: "Term ending soon? Book a review before coverage lapses.",
  },
  {
    slug: "secure-portal",
    name: "Secure Document Hub & Messenger",
    description: "Check off documents you have ready, draft a message, and email or call your advisor to move forward.",
    access: "hybrid",
    audience: "customer",
    category: "portal",
    icon: "lock",
  },
  {
    slug: "mortgage-protection",
    name: "Mortgage Protection Estimator",
    description: "Estimate income-replacement coverage to protect your home if the unexpected happens.",
    access: "free",
    audience: "customer",
    category: "analyzer",
    icon: "home-shield",
    advisorCta: "Want a full mortgage protection review? Schedule a free strategy call.",
  },

  // ─── Advisor tools ────────────────────────────────────────────────────────
  {
    slug: "human-life-value",
    name: "Human Life Value Analyzer",
    description: "Calculate exact life insurance coverage using income, debt, mortgage, and education costs.",
    access: "one_time",
    audience: "agent",
    productKey: "HLV_REPORT",
    category: "analyzer",
    icon: "shield",
    advisorCta: "Book a call to secure this coverage with the right policy.",
    existingComponent: "DIMECalculator",
  },
  {
    slug: "term-vs-permanent",
    name: "Term vs. Permanent Simulator",
    description: "Compare permanent life cash value growth vs. buying term and investing the difference.",
    access: "free",
    audience: "agent",
    category: "simulator",
    icon: "chart",
    existingComponent: "TaxFreeComparison",
  },
  {
    slug: "meeting-prep",
    name: "Client Meeting Prep Kit",
    description: "Pre-call checklist — discovery questions, documents to request, and follow-up prompts.",
    access: "free",
    audience: "agent",
    category: "portal",
    icon: "clipboard",
  },
  {
    slug: "what-if-scenarios",
    name: "What-If Scenario Modeler",
    description: "Toggle life events in a meeting — see cash-flow impact and whether protection may need to increase.",
    access: "hybrid",
    audience: "agent",
    category: "simulator",
    icon: "git-branch",
    advisorCta: "Life changing? Schedule a plan review before you commit.",
  },

  // ─── Workshops & shared learning ──────────────────────────────────────────
  {
    slug: "retirement-forecaster",
    name: "Tax-Free Retirement Forecaster",
    description: "Project retirement income: taxable accounts vs. IULs, Roth IRAs, and annuities.",
    access: "premium",
    audience: "other",
    category: "simulator",
    icon: "trending",
    advisorCta: "Let's fix your tax gap — schedule a tax-free retirement strategy session.",
    existingComponent: "WealthCalculator",
  },
  {
    slug: "rule-of-72",
    name: "Rule of 72 Calculator",
    description: "See how fast your money doubles at any rate of return — great for workshop demos.",
    access: "free",
    audience: "other",
    category: "simulator",
    icon: "calculator",
    existingComponent: "RuleOf72",
  },
  {
    slug: "cost-of-waiting",
    name: "Cost of Waiting",
    description: "Show what delaying a financial plan really costs over 5, 10, and 20 years.",
    access: "free",
    audience: "other",
    category: "simulator",
    icon: "clock",
    existingComponent: "CostOfWaiting",
  },
  {
    slug: "college-funding",
    name: "College Funding Planner",
    description: "Estimate monthly savings needed for college — workshop-friendly, ties into protection conversations.",
    access: "free",
    audience: "other",
    category: "analyzer",
    icon: "graduation",
    advisorCta: "Need a 529 or life-insurance funding strategy? Let's map it out.",
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByAudience(audience: ToolAudience): ToolDefinition[] {
  return TOOLS.filter((t) => t.audience === audience);
}

export function groupToolsByAudience(
  tools: ToolDefinition[] = TOOLS
): Record<ToolAudience, ToolDefinition[]> {
  return {
    customer: tools.filter((t) => t.audience === "customer"),
    agent: tools.filter((t) => t.audience === "agent"),
    other: tools.filter((t) => t.audience === "other"),
  };
}
