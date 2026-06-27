/** Read rough numbers from other portal tools for friendlier prefill. */

export function readVitalSignsPrefill(): {
  monthlyIncome: number;
  monthlyExpenses: number;
  cashSavings: number;
  lifeInsurance: number;
} {
  if (typeof window === "undefined") {
    return { monthlyIncome: 0, monthlyExpenses: 0, cashSavings: 0, lifeInsurance: 0 };
  }
  try {
    const raw = localStorage.getItem("legacyInMotionVitalSigns_v2");
    if (!raw) return { monthlyIncome: 0, monthlyExpenses: 0, cashSavings: 0, lifeInsurance: 0 };
    const d = JSON.parse(raw);
    return {
      monthlyIncome: Number(d.monthlyIncome) || 0,
      monthlyExpenses: Number(d.monthlyExpenses) || 0,
      cashSavings: Number(d.cashSavings) || 0,
      lifeInsurance: Number(d.lifeInsurance) || 0,
    };
  } catch {
    return { monthlyIncome: 0, monthlyExpenses: 0, cashSavings: 0, lifeInsurance: 0 };
  }
}

export function readHlvPrefill(): {
  income: number;
  mortgage: number;
  debt: number;
} {
  if (typeof window === "undefined") return { income: 0, mortgage: 0, debt: 0 };
  try {
    const raw = localStorage.getItem("legacyInMotionHLV_v1");
    if (!raw) return { income: 0, mortgage: 0, debt: 0 };
    const d = JSON.parse(raw);
    return {
      income: Number(d.income) || 0,
      mortgage: Number(d.mortgage) || 0,
      debt: Number(d.debt) || 0,
    };
  } catch {
    return { income: 0, mortgage: 0, debt: 0 };
  }
}
