/**
 * Starts Next.js dev server with local-test/.env only.
 * Never loads production secrets from .env.local unless you put them there yourself.
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, "local-test", ".env");

if (!fs.existsSync(envPath)) {
  console.error("\n  local-test/.env not found. Run:  npm run local:init\n");
  process.exit(1);
}

const env = { ...process.env };

for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  const value = trimmed.slice(eq + 1).trim();
  env[key] = value;
}

env.LOCAL_TEST_MODE = "true";
env.NODE_ENV = "development";

console.log("\n  LOCAL TEST SANDBOX — mock auth & billing, not for deployment\n");

const child = spawn("npx", ["next", "dev", "--webpack"], {
  cwd: root,
  env,
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
