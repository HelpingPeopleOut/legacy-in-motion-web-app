"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";

export default function CinematicIntro() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Check if the URL tells us to skip, or if they already watched it
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get("skipIntro");
    const hasPlayed = sessionStorage.getItem("introPlayed");

    if (hasPlayed || skipIntro) {
      setShouldRender(false); // Instantly remove intro if already played
      sessionStorage.setItem("introPlayed", "true"); 
      return; 
    }

    // Prevent scrolling while the cinematic plays
    document.body.style.overflow = "hidden";

    // Mark as played immediately so navigating back/refreshing skips it
    sessionStorage.setItem("introPlayed", "true");

    // Timing Sequence:
    const breakthroughTimer = setTimeout(() => {
      setStage("breakthrough");
    }, 6500);

    const hideTimer = setTimeout(() => {
      setStage("hidden");
      document.body.style.overflow = ""; // Allow scrolling again
    }, 8000);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 9500);

    return () => {
      clearTimeout(breakthroughTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // Custom function to handle user clicking a language button
  const handleLanguageSelect = (lang) => {
    // Mark the intro as played and restore scrolling
    sessionStorage.setItem("introPlayed", "true");
    document.body.style.overflow = "";
    
    if (lang === "es") {
      // Send them to the Spanish site and skip the intro
      router.push("/es?skipIntro=true");
    } else {
      // If English, trigger the warp flash immediately to enter the site
      setStage("breakthrough");
      setTimeout(() => setStage("hidden"), 1000);
      setTimeout(() => setShouldRender(false), 2000);
    }
  };

  // If already played, render nothing (no flashing!)
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