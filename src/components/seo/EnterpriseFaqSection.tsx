"use client";

import type { ReactNode } from "react";
import type { FaqItem } from "@/lib/ai-enterprise";

type EnterpriseFaqSectionProps = {
  title?: string;
  faqs: FaqItem[];
  id?: string;
  aside?: ReactNode;
};

/** Visible FAQ section — mirrors FAQPage schema for AI Overviews and user trust. */
export default function EnterpriseFaqSection({
  title = "Frequently Asked Questions",
  faqs,
  id = "enterprise-faq",
  aside,
}: EnterpriseFaqSectionProps) {
  const withAside = Boolean(aside);

  return (
    <section
      className={`text-section fade-in enterprise-faq${withAside ? " enterprise-faq--with-aside" : ""}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container content-wrapper">
        <h2
          id={`${id}-heading`}
          className={withAside ? "enterprise-faq-heading enterprise-faq-heading--with-aside" : undefined}
          style={withAside ? undefined : { fontSize: "2.2rem", marginBottom: "2rem", textAlign: "center" }}
        >
          {title}
        </h2>
        <div className={withAside ? "enterprise-faq-layout" : undefined}>
          <div className="enterprise-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="enterprise-faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          {withAside ? aside : null}
        </div>
      </div>
    </section>
  );
}
