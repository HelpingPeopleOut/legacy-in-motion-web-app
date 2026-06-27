import { jsPDF } from "jspdf";
import { BUSINESS } from "./business";
import { formatUsd, type HlvBreakdown, type HlvInputs } from "./hlv";

const GOLD = { r: 166, g: 124, b: 0 };
const INK = { r: 28, g: 28, b: 30 };
const MUTED = { r: 100, g: 96, b: 90 };

function addFooter(doc: jsPDF, page: number, total: number) {
  const w = doc.internal.pageSize.getWidth();
  doc.setFontSize(8);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(
    `${BUSINESS.name} · ${BUSINESS.phoneDisplay} · ${BUSINESS.email}`,
    14,
    doc.internal.pageSize.getHeight() - 10
  );
  doc.text(`Page ${page} of ${total}`, w - 14, doc.internal.pageSize.getHeight() - 10, {
    align: "right",
  });
}

export function generateHlvReportPdf(inputs: HlvInputs, breakdown: HlvBreakdown) {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const prepared = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const clientLabel = inputs.clientName.trim() || "Client";

  // ── Cover header band ──
  doc.setFillColor(GOLD.r, GOLD.g, GOLD.b);
  doc.rect(0, 0, pageW, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(BUSINESS.name, 14, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Family Financial Security Report", 14, 28);
  doc.text(`Prepared ${prepared}`, 14, 36);

  // ── Client block ──
  let y = 54;
  doc.setTextColor(INK.r, INK.g, INK.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Prepared for: ${clientLabel}`, 14, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(
    "Human Life Value analysis using the D.I.M.E. method (Debt, Income, Mortgage, Education).",
    14,
    y
  );
  y += 12;

  // ── Executive summary box ──
  doc.setDrawColor(GOLD.r, GOLD.g, GOLD.b);
  doc.setLineWidth(0.4);
  doc.setFillColor(250, 246, 235);
  doc.roundedRect(14, y, pageW - 28, 36, 3, 3, "FD");
  doc.setTextColor(GOLD.r, GOLD.g, GOLD.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("RECOMMENDED COVERAGE", 20, y + 10);
  doc.setTextColor(INK.r, INK.g, INK.b);
  doc.setFontSize(26);
  doc.text(formatUsd(breakdown.total), 20, y + 24);
  if (breakdown.coverageGap > 0) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.text(
      `Coverage gap: ${formatUsd(breakdown.coverageGap)} below recommended need`,
      20,
      y + 32
    );
  } else if (breakdown.currentCoverage > 0) {
    doc.setFontSize(10);
    doc.setTextColor(40, 120, 80);
    doc.text("Current coverage meets or exceeds this estimate.", 20, y + 32);
  }
  y += 46;

  // ── DIME breakdown table ──
  doc.setTextColor(INK.r, INK.g, INK.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("D.I.M.E. Breakdown", 14, y);
  y += 8;

  const rows: [string, string, string][] = [
    ["D — Debt", "Credit cards, loans, final expenses", formatUsd(breakdown.debt)],
    [
      "I — Income",
      `${breakdown.years} years × ${formatUsd(breakdown.annualIncome)}/yr`,
      formatUsd(breakdown.incomeReplacement),
    ],
    ["M — Mortgage", "Outstanding mortgage balance", formatUsd(breakdown.mortgage)],
    ["E — Education", "College / education funding", formatUsd(breakdown.education)],
  ];

  doc.setFillColor(245, 245, 243);
  doc.rect(14, y, pageW - 28, 8, "F");
  doc.setFontSize(8);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text("Component", 16, y + 5.5);
  doc.text("Description", 52, y + 5.5);
  doc.text("Amount", pageW - 16, y + 5.5, { align: "right" });
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(INK.r, INK.g, INK.b);
  for (const [label, desc, amount] of rows) {
    doc.setDrawColor(230, 228, 224);
    doc.line(14, y + 8, pageW - 14, y + 8);
    doc.setFont("helvetica", "bold");
    doc.text(label, 16, y + 5.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.text(desc, 52, y + 5.5);
    doc.setFontSize(10);
    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.text(amount, pageW - 16, y + 5.5, { align: "right" });
    y += 10;
  }

  doc.setFont("helvetica", "bold");
  doc.setFillColor(GOLD.r, GOLD.g, GOLD.b);
  doc.setTextColor(255, 255, 255);
  doc.rect(14, y, pageW - 28, 10, "F");
  doc.text("Total recommended coverage", 16, y + 6.5);
  doc.text(formatUsd(breakdown.total), pageW - 16, y + 6.5, { align: "right" });
  y += 18;

  if (breakdown.currentCoverage > 0) {
    doc.setTextColor(INK.r, INK.g, INK.b);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Existing coverage on file: ${formatUsd(breakdown.currentCoverage)}`, 14, y);
    y += 6;
    doc.text(`Additional coverage to consider: ${formatUsd(breakdown.coverageGap)}`, 14, y);
    y += 12;
  }

  // ── What this means ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("What this report means for your family", 14, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  const narrative = [
    "This estimate reflects the capital required to retire debts, replace income for your household,",
    "pay off the home mortgage, and fund education goals if you were no longer there to provide.",
    "It is a planning estimate — not a quote. Your advisor will refine this based on existing policies,",
    "employer benefits, and the right product structure for your budget and timeline.",
  ];
  for (const line of narrative) {
    doc.text(line, 14, y);
    y += 5;
  }
  y += 6;

  // ── Next steps ──
  doc.setTextColor(INK.r, INK.g, INK.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Recommended next steps", 14, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const steps = [
    "1. Review beneficiary designations on all policies and retirement accounts.",
    "2. Gather existing life insurance declarations for a coverage gap review.",
    "3. Schedule a strategy session to implement protection within your budget.",
    "4. Store this report in your Digital Legacy Vault for family reference.",
  ];
  for (const step of steps) {
    doc.text(step, 16, y);
    y += 6;
  }

  // ── Advisor contact ──
  y += 4;
  doc.setDrawColor(GOLD.r, GOLD.g, GOLD.b);
  doc.setLineWidth(0.3);
  doc.line(14, y, pageW - 14, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Your Legacy in Motion advisor", 14, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(BUSINESS.legalName, 14, y);
  y += 5;
  doc.text(`Phone: ${BUSINESS.phoneDisplay}`, 14, y);
  y += 5;
  doc.text(`Email: ${BUSINESS.email}`, 14, y);
  y += 5;
  doc.text("Schedule a free strategy session at legacyinmotion.org", 14, y);

  // ── Disclaimer ──
  y += 10;
  doc.setFontSize(7.5);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  const disclaimer =
    "Disclaimer: This report is for educational and planning purposes only. It does not constitute legal, tax, or insurance advice. " +
    "Coverage needs vary by individual circumstances. Products and availability subject to underwriting. " +
    `${BUSINESS.partner}. © ${new Date().getFullYear()} ${BUSINESS.name}.`;
  const lines = doc.splitTextToSize(disclaimer, pageW - 28);
  doc.text(lines, 14, y);

  addFooter(doc, 1, 1);

  const safeName = clientLabel.replace(/[^a-z0-9]/gi, "-").replace(/-+/g, "-") || "client";
  doc.save(`Legacy-In-Motion-Security-Report-${safeName}-${new Date().toISOString().slice(0, 10)}.pdf`);
}
