import fs from "fs";
import path from "path";

const routes = [
  ["retirement-planning-pasadena", "retirement-planning-pasadena"],
  ["living-benefits-life-insurance-los-angeles", "living-benefits-life-insurance-los-angeles"],
  ["estate-business-planning-los-angeles", "estate-business-planning-los-angeles"],
  ["generational-wealth-arcadia-sgv", "generational-wealth-arcadia-sgv"],
  ["debt-free-wealth-strategy", "debt-free-wealth-strategy"],
  ["mortgage-protection-los-angeles", "mortgage-protection-los-angeles"],
  ["business-owner-financial-strategies", "business-owner-financial-strategies"],
  ["freedom-financial-baby", "freedom-financial-baby"],
  ["workshops", "workshops"],
  ["toolbox", "toolbox"],
  ["mission", "mission"],
  ["request-callback", "request-callback"],
  ["thanks", "thanks"],
  ["service-areas", "service-areas"],
  ["financial-education", "financial-education"],
  ["es/planificacion-de-jubilacion-los-angeles", "planificacion-de-jubilacion-los-angeles"],
  ["es/beneficios-en-vida-los-angeles", "beneficios-en-vida-los-angeles"],
  ["es/estrategia-libre-de-deudas", "estrategia-libre-de-deudas"],
  ["es/proteccion-de-hipoteca-los-angeles", "proteccion-de-hipoteca-los-angeles"],
  ["es/estrategias-financieras-para-negocios", "estrategias-financieras-para-negocios"],
  ["es/futuro-financiero-infantil", "futuro-financiero-infantil"],
  ["es/seminarios", "seminarios"],
  ["es/herramientas", "herramientas"],
  ["es/mision", "mision"],
  ["es/solicitar-llamada", "solicitar-llamada"],
  ["es/gracias", "gracias"],
  ["es/educacion-financiera", "educacion-financiera"],
];

function tpl(key) {
  return `import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("${key}");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
}

for (const [dir, key] of routes) {
  const file = path.join("src/app", dir, "layout.tsx");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, tpl(key));
}

console.log(`Created ${routes.length} layout.tsx files`);
