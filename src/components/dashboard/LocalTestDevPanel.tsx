"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LocalTestScenario } from "@/lib/local-test-shared";
import { scenarioLabel } from "@/lib/local-test-shared";

const SCENARIOS: LocalTestScenario[] = ["free", "premium", "one_time", "hybrid", "all"];
const isStaticTest = process.env.NEXT_PUBLIC_LOCAL_TEST_MODE === "true";

function setScenarioCookie(scenario: LocalTestScenario) {
  document.cookie = `local_test_scenario=${scenario};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
}

export default function LocalTestDevPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function simulate(scenario: LocalTestScenario) {
    setLoading(scenario);
    try {
      if (isStaticTest) {
        setScenarioCookie(scenario);
        router.refresh();
        return;
      }
      await fetch("/api/local-test/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50/80 p-5">
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-amber-900">
        Preview mode
      </h2>
      <p className="mb-4 text-xs text-amber-800/90">
        Switch client tiers to preview paywalls and unlocked tools. No real charges.
      </p>
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario}
            type="button"
            disabled={loading !== null}
            onClick={() => simulate(scenario)}
            className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-xs font-medium text-amber-900 shadow-sm hover:border-amber-400 disabled:opacity-50"
          >
            {loading === scenario ? "…" : scenarioLabel(scenario)}
          </button>
        ))}
      </div>
    </div>
  );
}
