"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LocalTestScenario } from "@/lib/local-test-shared";
import { scenarioLabel } from "@/lib/local-test-shared";
import { isPreviewUnlockAll } from "@/lib/preview-access";

const SCENARIOS: LocalTestScenario[] = ["free", "premium", "one_time", "hybrid", "all"];
const isStaticTest = process.env.NEXT_PUBLIC_LOCAL_TEST_MODE === "true";

function setScenarioCookie(scenario: LocalTestScenario) {
  document.cookie = `local_test_scenario=${scenario};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
}

export default function LocalTestDevPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const previewAll = isPreviewUnlockAll();

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
    <div className="portal-dev-panel">
      <h2>Preview mode — tier simulator</h2>
      <p>
        {previewAll
          ? "All tools are unlocked by default. Switch tiers below to preview paywalls and billing states."
          : "Switch client tiers to preview paywalls and unlocked tools. No real charges."}
      </p>
      <div className="portal-dev-chips">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario}
            type="button"
            disabled={loading !== null}
            onClick={() => simulate(scenario)}
            className="portal-dev-chip"
          >
            {loading === scenario ? "…" : scenarioLabel(scenario)}
          </button>
        ))}
      </div>
    </div>
  );
}
