"use client";

import { useEffect, useRef } from "react";

const REEL_URL =
  "https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&utm_campaign=loading";

export default function InstagramEmbed({ className = "" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadEmbed = () => {
      if (typeof window !== "undefined" && window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
      loadEmbed();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = loadEmbed;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return (
    <div ref={containerRef} className={`ig-embed-wrap ${className}`}>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#F4F4F4",
                borderRadius: "50%",
                flexGrow: 0,
                height: 40,
                marginRight: 14,
                width: 40,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: 4,
                  flexGrow: 0,
                  height: 14,
                  marginBottom: 6,
                  width: 100,
                }}
              />
              <div
                style={{
                  backgroundColor: "#F4F4F4",
                  borderRadius: 4,
                  flexGrow: 0,
                  height: 14,
                  width: 60,
                }}
              />
            </div>
          </div>
          <p
            style={{
              color: "#c9c8cd",
              fontFamily: "Arial,sans-serif",
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
