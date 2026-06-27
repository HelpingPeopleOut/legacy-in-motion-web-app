"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BUSINESS } from "@/lib/business";
import { CheckCircle2, Copy, FileUp, Lock, Mail, MessageSquare, Phone } from "lucide-react";

const DOCS_KEY = "legacyInMotionSecureDocs_v2";
const MSG_KEY = "legacyInMotionSecureMsg_v2";

const DOCUMENT_TYPES = [
  { id: "id", label: "Government ID (driver license / passport)" },
  { id: "paystub", label: "Recent pay stub or W-2" },
  { id: "policy", label: "Existing life insurance (if any)" },
  { id: "mortgage", label: "Mortgage statement (if relevant)" },
  { id: "beneficiary", label: "Beneficiary forms (if updating)" },
  { id: "bank", label: "Voided check (for draft setup only)" },
];

const MESSAGE_TEMPLATES = [
  {
    id: "apply",
    label: "Starting an application",
    text: "Hi — I'm ready to move forward with coverage. I've checked off the documents I can provide. Please let me know the best secure way to send them and any next steps.",
  },
  {
    id: "review",
    label: "Annual review",
    text: "Hi — I'd like to schedule a policy review. My family situation / income has changed and I want to make sure coverage still fits.",
  },
  {
    id: "question",
    label: "Quick question",
    text: "Hi — I have a question about my plan (see below). Please let me know when you have a few minutes for a call.",
  },
];

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(DOCS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function SecureDocumentHub() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("Legacy in Motion — client portal");
  const [copyStatus, setCopyStatus] = useState<"idle" | "done">("idle");

  useEffect(() => {
    setChecked(loadChecked());
    setMessage(localStorage.getItem(MSG_KEY) ?? "");
  }, []);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem(DOCS_KEY, JSON.stringify(next));
  };

  const saveMessage = (text: string) => {
    setMessage(text);
    localStorage.setItem(MSG_KEY, text);
  };

  const readyCount = DOCUMENT_TYPES.filter((d) => checked[d.id]).length;
  const readyList = DOCUMENT_TYPES.filter((d) => checked[d.id]).map((d) => d.label);

  const mailtoBody = encodeURIComponent(
    `${message}\n\n---\nDocuments I have ready:\n${readyList.length ? readyList.map((l) => `• ${l}`).join("\n") : "(none checked yet)"}\n\nSent via Legacy in Motion Client Portal`
  );
  const mailto = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  const copyMessage = async () => {
    const text = `To: ${BUSINESS.email}\nPhone: ${BUSINESS.phoneDisplay}\nSubject: ${subject}\n\n${message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      window.prompt("Copy this message:", text);
    }
  };

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <Lock className="h-3.5 w-3.5" aria-hidden />
          Get things moving
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
          Documents & messages for your advisor
        </h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          Check off what you have ready, draft a message, then email Nelly or call. For sensitive files,
          your advisor will send a secure upload link — don&apos;t attach SSNs or full account numbers
          in email.
        </p>
        <a
          href={`tel:${BUSINESS.phone}`}
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-portal-gold)]"
        >
          <Phone className="h-4 w-4" />
          {BUSINESS.phoneDisplay}
        </a>
      </div>

      <div className="portal-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">What do you have ready?</h3>
          <span className="text-sm font-semibold text-[var(--color-portal-gold)]">
            {readyCount}/{DOCUMENT_TYPES.length}
          </span>
        </div>
        <ul className="space-y-2">
          {DOCUMENT_TYPES.map((doc) => {
            const done = !!checked[doc.id];
            return (
              <li key={doc.id}>
                <button
                  type="button"
                  onClick={() => toggle(doc.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors ${
                    done ? "border-[var(--color-portal-accent)] bg-[var(--color-portal-accent-light)]/40" : "border-[var(--color-portal-border)]"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--color-portal-accent)]" />
                  ) : (
                    <FileUp className="h-5 w-5 shrink-0 text-[var(--color-portal-muted)]" />
                  )}
                  {doc.label}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-[var(--color-portal-muted)]">
          Store policy numbers & locations in your{" "}
          <Link href="/dashboard/tools/legacy-vault" className="font-semibold text-[var(--color-portal-gold)] underline">
            Digital Legacy Vault
          </Link>
          .
        </p>
      </div>

      <div className="portal-card space-y-4 p-5">
        <h3 className="flex items-center gap-2 font-semibold">
          <MessageSquare className="h-5 w-5 text-[var(--color-portal-gold)]" />
          Message your advisor
        </h3>
        <div className="flex flex-wrap gap-2">
          {MESSAGE_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              className="portal-filter-chip"
              onClick={() => saveMessage(t.text)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <label className="legacy-vault-field">
          <span>Subject</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="legacy-vault-input" />
        </label>
        <label className="legacy-vault-field">
          <span>Your message</span>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => saveMessage(e.target.value)}
            className="legacy-vault-input resize-y"
            placeholder="What you need, best times to call, etc."
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <a href={mailto} className="portal-btn-primary text-sm">
            <Mail className="h-4 w-4" />
            Email advisor
          </a>
          <button type="button" className="portal-btn-secondary text-sm" onClick={copyMessage}>
            <Copy className="h-4 w-4" />
            {copyStatus === "done" ? "Copied!" : "Copy message"}
          </button>
        </div>
      </div>
    </div>
  );
}
