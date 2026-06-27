export type ToolAccess = "free" | "premium" | "one_time" | "hybrid";

export interface ToolDefinition {
  slug: string;
  name: string;
  description: string;
  access: ToolAccess;
  /** Product key required for one_time tools */
  productKey?: "HLV_REPORT" | "LEGACY_VAULT";
  category: "analyzer" | "tracker" | "simulator" | "portal";
  icon: string;
  advisorCta?: string;
  existingComponent?: string;
}

export const TOOLS: ToolDefinition[] = [
  {
    slug: "human-life-value",
    name: "Human Life Value Analyzer",
    description: "Calculate exact life insurance coverage using income, debt, mortgage, and education costs.",
    access: "one_time",
    productKey: "HLV_REPORT",
    category: "analyzer",
    icon: "shield",
    advisorCta: "Book a call to secure this coverage with the right policy.",
    existingComponent: "DIMECalculator",
  },
  {
    slug: "legacy-vault",
    name: "Digital Legacy & Vault",
    description: "Organize wills, trusts, policy numbers, and beneficiary instructions in one secure place.",
    access: "one_time",
    productKey: "LEGACY_VAULT",
    category: "portal",
    icon: "vault",
    advisorCta: "No Will or Trust? Schedule a legacy planning session.",
  },
  {
    slug: "term-vs-permanent",
    name: "Term vs. Permanent Simulator",
    description: "Compare permanent life cash value growth vs. buying term and investing the difference.",
    access: "free",
    category: "simulator",
    icon: "chart",
    existingComponent: "TaxFreeComparison",
  },
  {
    slug: "financial-vital-signs",
    name: "Financial Vital Signs",
    description: "Net worth, liquidity, debt-to-income, and coverage — your financial health at a glance.",
    access: "premium",
    category: "tracker",
    icon: "activity",
  },
  {
    slug: "policy-ladder",
    name: "Policy Maturity & Ladder Tracker",
    description: "Track multiple policies, premium due dates, and expiration alerts.",
    access: "premium",
    category: "tracker",
    icon: "layers",
  },
  {
    slug: "retirement-forecaster",
    name: "Tax-Free Retirement Forecaster",
    description: "Project retirement income: taxable accounts vs. IULs, Roth IRAs, and annuities.",
    access: "premium",
    category: "simulator",
    icon: "trending",
    advisorCta: "Let's fix your tax gap — schedule a tax-free retirement strategy session.",
    existingComponent: "WealthCalculator",
  },
  {
    slug: "emergency-fund",
    name: "Emergency Fund Builder",
    description: "Gamified tracker to build your 3–6 month financial safety net.",
    access: "premium",
    category: "tracker",
    icon: "piggy",
    existingComponent: "ProgressTracker",
  },
  {
    slug: "what-if-scenarios",
    name: "What-If Scenario Modeler",
    description: "Model buying a home, having a child, or early retirement — see the impact instantly.",
    access: "hybrid",
    category: "simulator",
    icon: "git-branch",
  },
  {
    slug: "secure-portal",
    name: "Secure Document Hub & Messenger",
    description: "Encrypted uploads for underwriting docs and direct advisor messaging.",
    access: "hybrid",
    category: "portal",
    icon: "lock",
  },
  {
    slug: "debt-freedom",
    name: "Debt Freedom Visualizer",
    description: "Visualize your path to becoming debt-free.",
    access: "free",
    category: "simulator",
    icon: "zap",
    existingComponent: "DebtFreedomVisualizer",
  },
  {
    slug: "rule-of-72",
    name: "Rule of 72 Calculator",
    description: "See how fast your money doubles at any rate of return.",
    access: "free",
    category: "simulator",
    icon: "calculator",
    existingComponent: "RuleOf72",
  },
  {
    slug: "cost-of-waiting",
    name: "Cost of Waiting",
    description: "See what delaying your financial plan really costs over time.",
    access: "free",
    category: "simulator",
    icon: "clock",
    existingComponent: "CostOfWaiting",
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
