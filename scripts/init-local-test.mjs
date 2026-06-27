/**
 * One-time setup for the local test sandbox.
 * Creates gitignored local-test/.env — safe to edit freely, never pushed.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const localDir = path.join(root, "local-test");
const envDest = path.join(localDir, ".env");
const envExample = path.join(root, "env", "local-test.example");
const gitkeep = path.join(localDir, ".gitkeep");

if (!fs.existsSync(localDir)) {
  fs.mkdirSync(localDir, { recursive: true });
}

if (!fs.existsSync(envDest)) {
  fs.copyFileSync(envExample, envDest);
  console.log("Created local-test/.env from template");
} else {
  console.log("local-test/.env already exists — left unchanged");
}

if (!fs.existsSync(gitkeep)) {
  fs.writeFileSync(
    gitkeep,
    "# This folder is gitignored except this note file is not used — entire local-test/ is ignored.\n"
  );
}

console.log(`
Local test sandbox is ready.

  npm run dev:local    Start the app in safe test mode
  npm run dev          Normal dev (needs Clerk/Stripe if using dashboard)

Open http://localhost:3000/dashboard — no login required in test mode.
Use the amber "Local test controls" panel to switch Free / Premium / Hybrid tiers.

Everything in local-test/ stays on your machine and is NOT committed to git.
`);
