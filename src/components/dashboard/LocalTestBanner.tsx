import { getLocalTestScenario, scenarioLabel } from "@/lib/local-test";

export default async function LocalTestBanner() {
  const scenario = await getLocalTestScenario();

  return (
    <div
      className="border-b border-amber-500/50 bg-amber-600 px-4 py-2 text-center text-sm font-semibold text-black"
      role="status"
    >
      LOCAL TEST SANDBOX — Not production · Mock billing · Scenario: {scenarioLabel(scenario)} · Nothing here is deployed or pushed
    </div>
  );
}
