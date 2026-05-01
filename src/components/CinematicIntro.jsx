"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";

export default function CinematicIntro() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Check if they already saw the intro or if URL bypasses it
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get("skipIntro");
    const hasPlayed = sessionStorage.getItem("introPlayed");

    if (hasPlayed || skipIntro) {
      setShouldRender(false);
      sessionStorage.setItem("introPlayed", "true"); 
      return; 
    }

    // 2. Lock the screen so they must choose a language
    document.body.style.overflow = "hidden";
  }, []);

  const handleLanguageSelect = (lang) => {
    // Save token and unlock scrolling
    sessionStorage.setItem("introPlayed", "true");
    document.body.style.overflow = "";
    
    // Trigger the teleportation flash
    setStage("breakthrough");

    if (lang === "es") {
      // If Spanish, wait for the flash to blind the screen, then route
      setTimeout(() => {
        router.push("/es?skipIntro=true"); 
      }, 800);
    } else {
      // If English, wait for the flash to blind the screen, then fade out
      setTimeout(() => setStage("hidden"), 1000);
      setTimeout(() => setShouldRender(false), 2000); // Remove from DOM entirely
    }
  };

  // If already played, don't render to prevent flashing
  if (!shouldRender) return null;

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

      {/* Grouped Language Selector Cards */}
      <div className={styles.languageSelector}>
        <div className={styles.langButtonContainer}>
          
          <button onClick={() => handleLanguageSelect("en")} className={styles.langBtn}>
            <span className={styles.langBtnTitle}>English</span>
            <span className={styles.langBtnSub}>Explore Financial Freedom Solutions</span>
          </button>

          <button onClick={() => handleLanguageSelect("es")} className={styles.langBtn}>
            <span className={styles.langBtnTitle}>Español</span>
            <span className={styles.langBtnSub}>Explorar Soluciones de Libertad Financiera</span>
          </button>

        </div>
      </div>
    </div>
  );
}