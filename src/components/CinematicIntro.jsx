"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";

export default function CinematicIntro() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get("skipIntro");
    const hasPlayed = sessionStorage.getItem("introPlayed");

    if (hasPlayed || skipIntro) {
      setShouldRender(false);
      sessionStorage.setItem("introPlayed", "true"); 
      return; 
    }

    // Prevent scrolling while the cinematic plays and waits for selection
    document.body.style.overflow = "hidden";
    
    // NOTE: The auto-skip timers have been completely removed.
    // The intro will now stay on the screen infinitely until the user clicks a language.
  }, []);

  const handleLanguageSelect = (lang) => {
    sessionStorage.setItem("introPlayed", "true");
    document.body.style.overflow = ""; // Restore scrolling immediately
    
    // 1. Trigger the Teleportation Flash Animation
    setStage("breakthrough");

    if (lang === "es") {
      // Wait for the flash to blind the screen, then route to Spanish
      setTimeout(() => {
        router.push("/es?skipIntro=true"); 
      }, 800);
    } else {
      // Wait for the flash to blind the screen, then reveal the English homepage
      setTimeout(() => setStage("hidden"), 1000);
      
      // Fully remove from DOM to save browser memory
      setTimeout(() => setShouldRender(false), 2000);
    }
  };

  // If already played, don't render anything (prevents flashing)
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

      {/* The Pre-Entry Language Selector */}
      <div className={styles.languageSelector}>
        <p className={styles.langLabel}>Select Language / Seleccione su idioma</p>
        <div className={styles.langButtonContainer}>
          <button onClick={() => handleLanguageSelect("en")} className={styles.langBtn}>English</button>
          <button onClick={() => handleLanguageSelect("es")} className={styles.langBtn}>Español</button>
        </div>
      </div>
    </div>
  );
}