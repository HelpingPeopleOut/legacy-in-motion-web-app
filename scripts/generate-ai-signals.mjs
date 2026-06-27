/**
 * Syncs public AI discovery files from src/lib/ai-enterprise.ts
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const runner = path.join(root, "scripts", "generate-ai-signals-runner.ts");

const result = spawnSync(`npx --yes tsx "${runner}"`, {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
