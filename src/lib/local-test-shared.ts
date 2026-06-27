export type LocalTestScenario =
  | "free"
  | "premium"
  | "hybrid"
  | "one_time"
  | "all";

export function scenarioLabel(scenario: LocalTestScenario): string {
  const labels: Record<LocalTestScenario, string> = {
    free: "Free client",
    premium: "Premium subscriber",
    hybrid: "Hybrid / Advisor+",
    one_time: "One-time purchases only",
    all: "Everything unlocked",
  };
  return labels[scenario];
}
