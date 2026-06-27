/**
 * Routes `npm run build` to the correct builder:
 * - Cloudflare Pages (CF_PAGES=1): static export via build-cloudflare-pages.mjs
 * - Everywhere else: standard Next.js production build
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const isCfPages = process.env.CF_PAGES === "1";

const command = isCfPages
  ? { bin: "node", args: ["scripts/build-cloudflare-pages.mjs"] }
  : { bin: "npx", args: ["next", "build", "--webpack"] };

if (isCfPages) {
  console.log("\n  CF_PAGES detected — using static export for Cloudflare Pages\n");
}

const result = spawnSync(command.bin, command.args, {
  cwd: root,
  env: process.env,
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
