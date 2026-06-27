/**
 * Cloudflare Pages static build → /out
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const apiDir = path.join(root, "src", "app", "api");
const apiBackup = path.join(root, "src", "app", "_api_cf_backup");
const middleware = path.join(root, "src", "middleware.ts");
const middlewareBackup = path.join(root, "src", "_middleware_cf_backup.ts");
const layout = path.join(root, "src", "app", "layout.tsx");
const layoutBackup = path.join(root, "src", "app", "_layout_cf_backup.tsx");
const layoutCf = path.join(root, "src", "app", "layout.cloudflare.tsx");
const productionLayout = path.join(root, "src", "components", "ProductionRootLayout.tsx");
const productionBackup = path.join(root, "src", "components", "_ProductionRootLayout_cf_backup.tsx");

const moved = [];

function move(src, dest) {
  if (fs.existsSync(src)) {
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
    fs.renameSync(src, dest);
    moved.push([dest, src]);
  }
}

function copyReplace(src, dest) {
  if (fs.existsSync(layout)) {
    fs.copyFileSync(layout, layoutBackup);
    moved.push([layoutBackup, layout]);
  }
  fs.copyFileSync(src, dest);
}

function restore() {
  if (fs.existsSync(layoutBackup)) {
    fs.copyFileSync(layoutBackup, layout);
    fs.unlinkSync(layoutBackup);
  }
  for (const [from, to] of moved.reverse()) {
    if (from === layoutBackup) continue;
    if (fs.existsSync(from)) {
      if (fs.existsSync(to)) fs.rmSync(to, { recursive: true, force: true });
      fs.renameSync(from, to);
    }
  }
}

console.log("\n  Building for Cloudflare Pages (static export → /out)\n");

spawnSync("npm", ["run", "generate:ai-signals"], { cwd: root, stdio: "inherit", shell: true });

move(apiDir, apiBackup);
move(middleware, middlewareBackup);
move(productionLayout, productionBackup);
copyReplace(layoutCf, layout);

const env = {
  ...process.env,
  CF_PAGES: "1",
  LOCAL_TEST_MODE: "true",
  NEXT_PUBLIC_LOCAL_TEST_MODE: "true",
  NEXT_PUBLIC_APP_URL: "https://test-legacy-in-motion-web-app.pages.dev",
};

const result = spawnSync("npx", ["next", "build", "--webpack"], {
  cwd: root,
  env,
  stdio: "inherit",
  shell: true,
});

restore();

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (!fs.existsSync(path.join(root, "out"))) {
  console.error("Build finished but /out folder was not created.");
  process.exit(1);
}

console.log("\n  ✓ Static export ready in /out\n");
