"use client";

import { useState, useEffect } from "react";
import styles from "@/app/page.module.css";

export default function CinematicIntro() {
  const [stage, setStage] = useState("trapped"); 
  // Stages: trapped -> breakthrough -> hidden -> unmounted

  useEffect(() => {
    // Prevent scrolling while the cinematic plays
    document.body.style.overflow = "hidden";

    // Timing Sequence:
    // 1. Verse reads for 6.5 seconds.
    // 2. The golden light breakthrough begins.
    const breakthroughTimer = setTimeout(() => {
      setStage("breakthrough");
    }, 6500);

    // 3. The light consumes the screen, then the overlay fades out, revealing the website.
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