"use client";

import type { FaqItem } from "@/lib/ai-enterprise";

type EnterpriseFaqSectionProps = {
  title?: string;
  faqs: FaqItem[];
  id?: string;
};

/** Visible FAQ section — mirrors FAQPage schema for AI Overviews and user trust. */
export default function EnterpriseFaqSection({
  title = "Frequently Asked Questions",
  faqs,
  id = "enterprise-faq",
}: EnterpriseFaqSectionProps) {
  return (
    <section className="text-section fade-in enterprise-faq" aria-labelledby={`${id}-heading`}>
      <div className="container content-wrapper">
        <h2 id={`${id}-heading`} style={{ fontSize: "2.2rem", marginBottom: "2rem", textAlign: "center" }}>
          {title}
        </h2>
        <div className="enterprise-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="enterprise-faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
