import { getLocalTestScenario, scenarioLabel } from "@/lib/local-test";

export default async function LocalTestBanner() {
  const scenario = await getLocalTestScenario();

  return (
    <div
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-medium text-amber-900"
      role="status"
    >
      Preview environment · Scenario: {scenarioLabel(scenario)} · Mock billing only
    </div>
  );
}
