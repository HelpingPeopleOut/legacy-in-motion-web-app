"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";

export default function CinematicIntro() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Native browser URL checking bypasses Next.js Suspense bugs
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get("skipIntro");
    const hasPlayed = sessionStorage.getItem("introPlayed");

    if (!hasPlayed && !skipIntro) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
    } else {
      sessionStorage.setItem("introPlayed", "true"); 
    }
  }, []);

  const handleLanguageSelect = (lang) => {
    sessionStorage.setItem("introPlayed", "true");
    document.body.style.overflow = "";
    
    setStage("breakthrough");

    setTimeout(() => {
      if (lang === "es") {
        router.push("/es?skipIntro=true"); 
      } else {
        router.push("/?skipIntro=true"); 
      }
      
      setStage("hidden");
      setTimeout(() => setShouldRender(false), 1000);
    }, 800);
  };

  if (!isClient || !shouldRender) return null;

  return (
    <div className={`${styles.introOverlay} ${stage === "hidden" ? styles.hidden : ""}`}>
      <div className={`${styles.lightBreakthrough} ${stage === "breakthrough" ? styles.active : ""}`}></div>

      <div className={styles.verseContainer}>
        <p className={styles.verseText}>
          &quot;But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.&quot;
        </p>
        <span className={styles.verseReference}>– Isaiah 40:31</span>
      </div>

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