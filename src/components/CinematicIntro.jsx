"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/page.module.css";

export default function CinematicIntro() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // 1. Detect PWA Installation
    const checkPWAStatus = () => {
      const isStandalone = 
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsAppInstalled(isStandalone);
    };
    checkPWAStatus();

    // 2. NATIVE URL CHECK (Bypasses Next.js Suspense Bug!)
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
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tipFadeUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(212, 175, 55, 0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.5); } 50% { border-color: rgba(212, 175, 55, 0.6); box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.2); } }
        .install-tip-box {
          position: absolute; bottom: 2.5rem; z-index: 10; background: rgba(5, 5, 5, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 1.2rem; width: 90%; max-width: 400px; text-align: center; animation: tipFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, borderGlow 3s infinite alternate; animation-delay: 2.5s, 3.7s; opacity: 0;
        }
      `}} />

      <div className={`${styles.introOverlay} ${stage === "hidden" ? styles.hidden : ""}`}>
        <div className={styles.oppressiveShadow}></div>
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

        {!isAppInstalled && (
          <div className="install-tip-box">
            <p style={{ color: "var(--gold)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 1rem 0", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              App Install Tip
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", color: "#cccccc", fontSize: "0.9rem", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", lineHeight: "1.4" }}>
                <span>Once inside, tap</span>
                <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: "6px", display: "flex", alignItems: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="5" r="1.5"></circle><circle cx="12" cy="19" r="1.5"></circle></svg>
                </div>
                <span>or</span>
                <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px 8px", borderRadius: "6px", display: "flex", alignItems: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(212, 175, 55, 0.1)", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid rgba(212, 175, 55, 0.3)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                <span style={{ fontWeight: "700", color: "#ffffff" }}>Add to Home Screen</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}