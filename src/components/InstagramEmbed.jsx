"use client";

import { useState } from "react";

const REEL_URL =
  "https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&utm_campaign=loading";

function loadInstagramScript() {
  if (typeof window === "undefined") return;
  if (window.instgrm?.Embeds) {
    window.instgrm.Embeds.process();
    return;
  }
  if (document.querySelector('script[src*="instagram.com/embed.js"]')) return;

  const script = document.createElement("script");
  script.src = "https://www.instagram.com/embed.js";
  script.async = true;
  script.onload = () => window.instgrm?.Embeds?.process();
  document.body.appendChild(script);
}

/** Loads Instagram embed.js only after explicit user interaction (PageSpeed-friendly). */
export default function InstagramEmbed({ className = "" }) {
  const [active, setActive] = useState(false);

  const activate = () => {
    setActive(true);
    queueMicrotask(loadInstagramScript);
  };

  if (!active) {
    return (
      <div className={`ig-embed-wrap ${className}`}>
        <button type="button" className="ig-poster" onClick={activate}>
          <span className="ig-poster-label">Watch on Instagram</span>
          <span className="ig-poster-hint">Tap to load the embed — keeps this page fast on mobile.</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`ig-embed-wrap ${className}`}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={REEL_URL}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          margin: 0,
          maxWidth: "100%",
          minWidth: 0,
          padding: 0,
          width: "100%",
        }}
      >
        <a
          href={REEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#FFFFFF",
            lineHeight: 0,
            padding: "0 0",
            textAlign: "center",
            textDecoration: "none",
            width: "100%",
            display: "block",
          }}
        >
          <div style={{ padding: "19% 0" }} />
          <p
            style={{
              color: "#c9c8cd",
              fontFamily: "Georgia, serif",
              fontSize: 14,
              fontWeight: 550,
              lineHeight: "17px",
              margin: "8px 0 0 0",
              overflow: "hidden",
              padding: "8px 0 7px",
              textAlign: "center",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            View this post on Instagram
          </p>
        </a>
      </blockquote>
    </div>
  );
}
