"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";

type ScrollToTopProps = {
  /** Marketing site (default) or client portal */
  variant?: "site" | "portal";
};

const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const SHOW_AFTER_PX = 320;

export default function ScrollToTop({ variant = "site" }: ScrollToTopProps) {
  const pathname = usePathname() ?? "";
  const isEs = pathname.startsWith("/es");
  const isLinksHub = pathname === "/links" || pathname === "/es/links";
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(scrollable > 0 ? Math.min(1, scrollTop / scrollable) : 0);
    setVisible(scrollTop > SHOW_AFTER_PX);
  }, []);

  useEffect(() => {
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const label = isEs ? "Volver arriba" : "Back to top";
  const strokeDashoffset = RING_CIRCUMFERENCE * (1 - progress);

  const layoutClass =
    variant === "site"
      ? isLinksHub
        ? "scroll-to-top--flush"
        : "scroll-to-top--above-bar scroll-to-top--above-fab"
      : "";

  return (
    <button
      type="button"
      className={`scroll-to-top scroll-to-top--${variant}${layoutClass ? ` ${layoutClass}` : ""}${visible ? " scroll-to-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label={label}
      title={label}
    >
      <svg className="scroll-to-top-ring" viewBox="0 0 56 56" aria-hidden>
        <circle className="scroll-to-top-ring-bg" cx="28" cy="28" r={RING_RADIUS} />
        <circle
          className="scroll-to-top-ring-progress"
          cx="28"
          cy="28"
          r={RING_RADIUS}
          style={{ strokeDashoffset }}
        />
      </svg>
      <span className="scroll-to-top-icon" aria-hidden>
        <ChevronUp strokeWidth={2.25} />
      </span>
      <span className="scroll-to-top-label">{isEs ? "Arriba" : "Top"}</span>
    </button>
  );
}
