"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, Copy } from "lucide-react";

const STORAGE_KEY = "legacyInMotionMeetingPrep_v1";

const SECTIONS = [
  {
    title: "Before the call",
    items: [
      "Confirm date, time, and video/phone link",
      "Review any prior notes or HLV results",
      "Pull term vs. permanent comparison if relevant",
      "Have blank beneficiary checklist ready to share",
    ],
  },
  {
    title: "Discovery questions",
    items: [
      "Who depends on your income today?",
      "What debts would survive you (mortgage, business, student loans)?",
      "Do you have a will, trust, or updated beneficiaries?",
      "What keeps you up at night financially?",
      "Timeline — when do you want protection or retirement income in place?",
    ],
  },
  {
    title: "Documents to request",
    items: [
      "Existing life insurance declarations (if any)",
      "Mortgage statement or payoff estimate",
      "Employer benefits summary",
      "Recent tax return or W-2 for income verification",
      "List of retirement accounts and approximate balances",
    ],
  },
  {
    title: "After the meeting",
    items: [
      "Send recap email with agreed next steps",
      "Schedule follow-up within 7 days",
      "Invite client to Legacy Vault & beneficiary checklist",
      "Log outcome in CRM (quoted, thinking, not fit)",
    ],
  },
];

type Checked = Record<string, boolean>;

function itemKey(section: number, index: number) {
  return `${section}-${index}`;
}

function loadChecked(): Checked {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Checked) : {};
  } catch {
    return {};
  }
}

export default function AgentMeetingPrep() {
  const [checked, setChecked] = useState<Checked>({});
  const [clientName, setClientName] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "done">("idle");

  useEffect(() => {
    setChecked(loadChecked());
    setClientName(localStorage.getItem(`${STORAGE_KEY}_name`) ?? "");
  }, []);

  const toggle = (key: string) => {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const saveName = (name: string) => {
    setClientName(name);
    localStorage.setItem(`${STORAGE_KEY}_name`, name);
  };

  const totalItems = SECTIONS.reduce((n, s) => n + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  const copyAll = async () => {
    const lines = [
      `Meeting prep${clientName ? ` — ${clientName}` : ""}`,
      `Progress: ${done}/${totalItems}`,
      "",
      ...SECTIONS.flatMap((s, si) => [
        s.title.toUpperCase(),
        ...s.items.map((text, ii) => {
          const mark = checked[itemKey(si, ii)] ? "[x]" : "[ ]";
          return `${mark} ${text}`;
        }),
        "",
      ]),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      window.prompt("Copy:", lines.join("\n"));
    }
  };

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <ClipboardCheck className="h-3.5 w-3.5" aria-hidden />
          Advisor workflow
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">Client meeting prep</h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          Use this before every discovery or review call. Progress saves on this device.
        </p>
        <label className="legacy-vault-field mt-4">
          <span>Client name (optional)</span>
          <input
            value={clientName}
            onChange={(e) => saveName(e.target.value)}
            className="legacy-vault-input"
            placeholder="e.g. Maria & James Rodriguez"
          />
        </label>
        <p className="mt-3 text-xs text-[var(--color-portal-muted)]">
          Checklist progress: {done} of {totalItems} items
        </p>
      </div>

      {SECTIONS.map((section, si) => (
        <div key={section.title} className="portal-card p-5">
          <h3 className="mb-3 font-semibold text-[var(--color-portal-text)]">{section.title}</h3>
          <ul className="space-y-2">
            {section.items.map((text, ii) => {
              const key = itemKey(si, ii);
              const isDone = !!checked[key];
              return (
                <li key={key}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-transparent p-2 hover:bg-[var(--color-portal-bg)]">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggle(key)}
                      className="mt-1 h-4 w-4 accent-[var(--color-portal-gold)]"
                    />
                    <span className={`text-sm ${isDone ? "text-[var(--color-portal-muted)] line-through" : "text-[var(--color-portal-text)]"}`}>
                      {text}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <button type="button" className="portal-btn-secondary text-sm" onClick={copyAll}>
        <Copy className="h-4 w-4" />
        {copyStatus === "done" ? "Copied!" : "Copy full checklist"}
      </button>
    </div>
  );
}
