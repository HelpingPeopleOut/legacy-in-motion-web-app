"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LocalTestScenario } from "@/lib/local-test-shared";
import { scenarioLabel } from "@/lib/local-test-shared";
import { isPreviewUnlockAll } from "@/lib/preview-access";
import { ChevronDown, FlaskConical } from "lucide-react";

const SCENARIOS: LocalTestScenario[] = ["free", "premium", "one_time", "hybrid", "all"];
const isStaticTest = process.env.NEXT_PUBLIC_LOCAL_TEST_MODE === "true";

function setScenarioCookie(scenario: LocalTestScenario) {
  document.cookie = `local_test_scenario=${scenario};path=/;max-age=${60 * 60 * 24 * 30};samesite=lax`;
}

function getScenarioFromCookie(): LocalTestScenario | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)local_test_scenario=([^;]+)/);
  const value = match?.[1];
  return SCENARIOS.includes(value as LocalTestScenario) ? (value as LocalTestScenario) : null;
}

export default function LocalTestDevPanel() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [active, setActive] = useState<LocalTestScenario | null>(() => getScenarioFromCookie());
  const previewAll = isPreviewUnlockAll();

  async function simulate(scenario: LocalTestScenario) {
    setLoading(scenario);
    try {
      if (isStaticTest) {
        setScenarioCookie(scenario);
        setActive(scenario);
        router.refresh();
        return;
      }
      await fetch("/api/local-test/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      setActive(scenario);
      router.refresh();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="portal-dev-panel portal-dev-panel--premium portal-fade-in">
      <button
        type="button"
        className="portal-dev-panel-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="portal-dev-panel-toggle-title">
          <FlaskConical className="h-4 w-4" aria-hidden />
          Preview tier simulator
          {!open && (
            <span className="portal-dev-panel-toggle-hint">
              · {active ? scenarioLabel(active) : previewAll ? "Everything unlocked" : "Tap to switch tiers"}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-amber-700 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div className="portal-dev-panel-body">
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
                className={`portal-dev-chip${active === scenario ? " active" : ""}`}
              >
                {loading === scenario ? "…" : scenarioLabel(scenario)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
