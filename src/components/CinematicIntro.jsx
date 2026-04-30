"use client";

import { useState, useEffect } from "react";
import styles from "@/app/page.module.css";

export default function CinematicIntro() {
  const [stage, setStage] = useState("trapped"); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures we only run browser-specific code on the client

    // 1. Check if the URL tells us to skip, or if they already watched it
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get("skipIntro");
    const hasPlayed = sessionStorage.getItem("introPlayed");

    if (hasPlayed || skipIntro) {
      setStage("unmounted");
      sessionStorage.setItem("introPlayed", "true"); // Guarantee it's marked
      return; 
    }

    // Prevent scrolling while the cinematic plays
    document.body.style.overflow = "hidden";

    // Mark as played immediately so navigating back/refreshing skips it
    sessionStorage.setItem("introPlayed", "true");

    // Timing Sequence:
    // 1. Verse reads for 6.5 seconds.
    // 2. The light breakthrough begins.
    const breakthroughTimer = setTimeout(() => {
      setStage("breakthrough");
    }, 6500);

    // 3. The light consumes the screen, then the overlay fades out.
    const hideTimer = setTimeout(() => {
      setStage("hidden");
      document.body.style.overflow = ""; // Allow scrolling again
    }, 8000);

    // 4. Remove from DOM completely for performance
    const unmountTimer = setTimeout(() => {
      setStage("unmounted");
    }, 9500);

    return () => {
      clearTimeout(breakthroughTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // Prevent hydration mismatch and instantly hide if already played
  if (!isClient) return null;
  if (stage === "unmounted") return null;

  return (
    <div className={`${styles.introOverlay} ${stage === "hidden" ? styles.hidden : ""}`}>
      {/* The Heavy/Trapped Background */}
      <div className={styles.oppressiveShadow}></div>

      {/* The Breakthrough Light that shatters the darkness */}
      <div className={`${styles.lightBreakthrough} ${stage === "breakthrough" ? styles.active : ""}`}></div>

      {/* The Word */}
      <div className={styles.verseContainer}>
        <p className={styles.verseText}>
          &quot;But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.&quot;
        </p>
        <span className={styles.verseReference}>– Isaiah 40:31</span>
      </div>
    </div>
  );
}