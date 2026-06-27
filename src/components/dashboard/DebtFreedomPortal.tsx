"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import DebtFreedomVisualizer from "@/components/DebtFreedomVisualizer";

type DebtInputs = { debt: number; rate: number; payment: number };

function calcPayoff(debt: number, rate: number, payment: number) {
  if (debt <= 0) return null;
  const monthlyRate = rate / 100 / 12;
  if (payment <= debt * monthlyRate) return null;
  let months = 0;
  let balance = debt;
  let interest = 0;
  while (balance > 0 && months < 600) {
    const int = balance * monthlyRate;
    interest += int;
    balance = balance + int - payment;
    months++;
  }
  return { months, interest };
}

export default function DebtFreedomPortal() {
  const [inputs, setInputs] = useState<DebtInputs>({ debt: 0, rate: 22, payment: 300 });

  const onValuesChange = useCallback((v: DebtInputs) => {
    setInputs(v);
  }, []);

  const boosts = useMemo(() => {
    return [0, 50, 100, 200].map((extra) => {
      const r = calcPayoff(inputs.debt, inputs.rate, inputs.payment + extra);
      return { extra, ...r };
    });
  }, [inputs]);

  const base = boosts[0];

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <Zap className="h-3.5 w-3.5" aria-hidden />
          Debt payoff
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">See your path out of debt</h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          Credit cards and consumer debt first. Small extra payments can shave years off — compare below.
        </p>
      </div>

      <DebtFreedomVisualizer onValuesChange={onValuesChange} />

      {base?.months && inputs.debt > 0 && (
        <div className="portal-card p-5">
          <h3 className="mb-3 font-semibold text-[var(--color-portal-text)]">What if you paid a little more?</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-[var(--color-portal-muted)]">
                  <th className="pb-2 pr-4">Extra / month</th>
                  <th className="pb-2 pr-4">Debt-free in</th>
                  <th className="pb-2">Interest paid</th>
                </tr>
              </thead>
              <tbody>
                {boosts.map(({ extra, months, interest }) =>
                  months ? (
                    <tr key={extra} className="border-t border-[var(--color-portal-border)]">
                      <td className="py-2 pr-4 font-medium">{extra === 0 ? "Current plan" : `+ $${extra}`}</td>
                      <td className="py-2 pr-4">
                        {Math.floor(months / 12)}y {months % 12}m
                      </td>
                      <td className="py-2 text-red-700">${Math.round(interest ?? 0).toLocaleString()}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
          <Link
            href="/dashboard/tools/financial-vital-signs"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-portal-gold)] hover:underline"
          >
            Check debt pressure in Vital Signs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
