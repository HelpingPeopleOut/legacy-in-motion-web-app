import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildAiPluginManifest,
  buildEnterpriseProfile,
  buildHumansTxt,
  buildLlmsTxt,
  buildLlmsTxtEs,
} from "../src/lib/ai-enterprise";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public");

const profile = buildEnterpriseProfile();
const llms = buildLlmsTxt();
const llmsEs = buildLlmsTxtEs();
const llmsFull = `${llms}\n\n## Machine Profile (JSON)\n${JSON.stringify(profile, null, 2)}`;
const humans = buildHumansTxt();
const aiPlugin = buildAiPluginManifest();

fs.writeFileSync(path.join(outDir, "llms.txt"), llms, "utf8");
fs.writeFileSync(path.join(outDir, "llms-es.txt"), llmsEs, "utf8");
fs.writeFileSync(path.join(outDir, "llms-full.txt"), llmsFull, "utf8");
fs.writeFileSync(path.join(outDir, "humans.txt"), humans, "utf8");
fs.writeFileSync(path.join(outDir, "ai-plugin.json"), JSON.stringify(aiPlugin, null, 2), "utf8");
fs.writeFileSync(path.join(outDir, "enterprise-profile.json"), JSON.stringify(profile, null, 2), "utf8");

console.log(
  "✓ Generated llms.txt, llms-es.txt, llms-full.txt, humans.txt, ai-plugin.json, enterprise-profile.json"
);
