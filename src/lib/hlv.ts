import { BUSINESS } from "./business";

export const HLV_STORAGE_KEY = "legacyInMotionHLV_v1";

export interface HlvInputs {
  debt: number;
  income: number;
  years: number;
  mortgage: number;
  education: number;
  currentCoverage: number;
  clientName: string;
  preparedBy: string;
}

export const DEFAULT_HLV_INPUTS: HlvInputs = {
  debt: 15000,
  income: 60000,
  years: 10,
  mortgage: 350000,
  education: 50000,
  currentCoverage: 0,
  clientName: "",
  preparedBy: BUSINESS.name,
};

export interface HlvBreakdown {
  debt: number;
  incomeReplacement: number;
  mortgage: number;
  education: number;
  total: number;
  currentCoverage: number;
  coverageGap: number;
  years: number;
  annualIncome: number;
}

export function calculateHlv(inputs: Partial<HlvInputs>): HlvBreakdown {
  const debt = Number(inputs.debt) || 0;
  const income = Number(inputs.income) || 0;
  const years = Math.min(40, Math.max(1, Number(inputs.years) || 10));
  const mortgage = Number(inputs.mortgage) || 0;
  const education = Number(inputs.education) || 0;
  const currentCoverage = Number(inputs.currentCoverage) || 0;
  const incomeReplacement = income * years;
  const total = debt + incomeReplacement + mortgage + education;
  const coverageGap = Math.max(0, total - currentCoverage);

  return {
    debt,
    incomeReplacement,
    mortgage,
    education,
    total,
    currentCoverage,
    coverageGap,
    years,
    annualIncome: income,
  };
}

export function loadHlvInputs(): HlvInputs {
  if (typeof window === "undefined") return { ...DEFAULT_HLV_INPUTS };
  try {
    const raw = localStorage.getItem(HLV_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_HLV_INPUTS };
    return { ...DEFAULT_HLV_INPUTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_HLV_INPUTS };
  }
}

export function saveHlvInputs(inputs: HlvInputs) {
  localStorage.setItem(HLV_STORAGE_KEY, JSON.stringify(inputs));
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
