"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, FileText, Shield } from "lucide-react";
import {
  calculateHlv,
  formatUsd,
  loadHlvInputs,
  saveHlvInputs,
  type HlvInputs,
} from "@/lib/hlv";
import { generateHlvReportPdf } from "@/lib/generate-hlv-report-pdf";

export default function HlvReportPanel() {
  const [inputs, setInputs] = useState<HlvInputs>(() => loadHlvInputs());
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setInputs(loadHlvInputs());
  }, []);

  const breakdown = calculateHlv(inputs);

  const update = useCallback((patch: Partial<HlvInputs>) => {
    setInputs((prev) => {
      const next = { ...prev, ...patch };
      saveHlvInputs(next);
      return next;
    });
  }, []);

  const downloadPdf = () => {
    setGenerating(true);
    try {
      generateHlvReportPdf(inputs, breakdown);
    } finally {
      setTimeout(() => setGenerating(false), 600);
    }
  };

  return (
    <div className="portal-card p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="portal-hub-eyebrow mb-1">
            <FileText className="h-3.5 w-3.5" aria-hidden />
            Branded deliverable
          </p>
          <h3 className="font-semibold text-[var(--color-portal-text)]">
            Family Financial Security Report (PDF)
          </h3>
          <p className="mt-1 max-w-lg text-sm text-[var(--color-portal-muted)]">
            Professional PDF with D.I.M.E. breakdown, coverage gap analysis, next steps, and advisor
            contact — generated from your calculator inputs above.
          </p>
        </div>
        <div className="shrink-0 rounded-xl border border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] px-4 py-3 text-center">
          <Shield className="mx-auto mb-1 h-5 w-5 text-[var(--color-portal-gold)]" />
          <p className="text-lg font-bold text-[var(--color-portal-text)]">{formatUsd(breakdown.total)}</p>
          <p className="text-[0.65rem] font-semibold uppercase text-[var(--color-portal-muted)]">
            Report total
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="legacy-vault-field">
          <span>Client / household name (on report)</span>
          <input
            value={inputs.clientName}
            onChange={(e) => update({ clientName: e.target.value })}
            className="legacy-vault-input"
            placeholder="e.g. The Martinez Family"
          />
        </label>
        <label className="legacy-vault-field">
          <span>Existing life insurance (optional)</span>
          <input
            type="number"
            value={inputs.currentCoverage || ""}
            onChange={(e) => update({ currentCoverage: Number(e.target.value) || 0 })}
            className="legacy-vault-input"
            placeholder="0"
          />
        </label>
      </div>

      {breakdown.currentCoverage > 0 && (
        <p className="mt-3 text-sm text-[var(--color-portal-muted)]">
          Coverage gap in report:{" "}
          <strong className="text-[var(--color-portal-text)]">{formatUsd(breakdown.coverageGap)}</strong>
        </p>
      )}

      <button
        type="button"
        onClick={downloadPdf}
        disabled={generating}
        className="portal-btn-primary mt-5 text-sm disabled:opacity-60"
      >
        <Download className="h-4 w-4" />
        {generating ? "Generating PDF…" : "Download Family Security Report (PDF)"}
      </button>

      <p className="mt-3 text-xs text-[var(--color-portal-muted)]">
        Update the D.I.M.E. calculator above first — values sync automatically. Report includes
        planning disclaimer and Legacy in Motion branding.
      </p>
    </div>
  );
}
