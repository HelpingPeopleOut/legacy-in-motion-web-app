"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function HomeStorySection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="hero-intro-story">
      <p className="hero-intro-lead">
        At 14, my family lost our home in the financial crisis. I saw how money stress can break
        confidence, relationships, and an entire household — and that&apos;s why I help families build
        real financial security today.
      </p>

      {!expanded ? (
        <button
          type="button"
          className="hero-story-toggle"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
        >
          Read my full story
          <ChevronDown size={18} />
        </button>
      ) : (
        <>
          <p>
            My father lost his business, and I saw firsthand how financial hardship can impact everything —
            not just money, but confidence, relationships, mental health, and the stability of an entire family.
          </p>
          <p>
            Years later, after battling years of depression tied to financial stress and loss, my father was
            diagnosed with stage 4 cancer.
          </p>
          <p>Those experiences changed the direction of my life forever.</p>
          <p>
            They made me realize that most hardworking families are never truly taught how money works, how to
            protect what they build, how taxes affect their future, or how to create long-term financial security.
          </p>
          <p><strong>That&apos;s why I do what I do today.</strong></p>
          <p>
            My mission is to help families, homeowners, parents, professionals, and business owners build
            stronger financial foundations through simple education, wealth protection, retirement guidance, and
            legacy-focused planning.
          </p>
          <p className="hero-intro-closing">
            Because financial freedom isn&apos;t just about making money. It&apos;s about protecting your family,
            creating stability, and giving future generations opportunities you may never have had yourself.
          </p>
          <button
            type="button"
            className="hero-story-toggle"
            onClick={() => setExpanded(false)}
            aria-expanded={true}
          >
            Show less
            <ChevronDown size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
        </>
      )}

      <p className="hero-credential">Senior Financial Associate · Experior Financial Group Inc.</p>
    </div>
  );
}
