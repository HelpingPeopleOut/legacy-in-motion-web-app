"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "@/app/page.module.css";

// 1. Moving the logic into a content component
function IntroContent() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeouts = useRef([]);

  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    setIsClient(true);

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

    const isHomePage = pathname === "/" || pathname === "/es";
    const skipIntro = searchParams.get("skipIntro");

    if (isHomePage && !skipIntro) {
      setShouldRender(true);
      setStage("trapped");
      document.body.style.overflow = "hidden";
    } else {
      setShouldRender(false);
      document.body.style.overflow = "";
    }
  }, [pathname, searchParams]);

  const handleLanguageSelect = (lang) => {
    setStage("breakthrough");

    const timer1 = setTimeout(() => {
      if (lang === "es") {
        if (!pathname.startsWith("/es")) {
          router.push("/es?skipIntro=true");
        } else {
          completeIntro();
        }
      } else {
        completeIntro();
      }
    }, 600);

    timeouts.current.push(timer1);
  };

  const completeIntro = () => {
    document.body.style.overflow = "";
    const timer2 = setTimeout(() => setStage("hidden"), 400);
    const timer3 = setTimeout(() => setShouldRender(false), 1200);
    
    timeouts.current.push(timer2, timer3);
  };

  if (!isClient || !shouldRender) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tipFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(212, 175, 55, 0.3); } 50% { border-color: rgba(212, 175, 55, 0.7); box-shadow: 0 0 15px rgba(212, 175, 55, 0.2); } }
        .install-tip-box {
          position: absolute; bottom: 2rem; z-index: 100; background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 1rem;
          width: 90%; max-width: 380px; text-align: center;
          animation: tipFadeUp 0.8s ease forwards, borderGlow 3s infinite;
          animation-delay: 1.5s; opacity: 0;
        }
      `}} />

      <div className={`${styles.introOverlay} ${stage === "hidden" ? styles.hidden : ""}`}>
        <div style={{ position: "absolute", inset: 0, background: "#000", zIndex: 0 }}></div>
        <div className={`${styles.lightBreakthrough} ${stage === "breakthrough" ? styles.active : ""}`}></div>

        <div className={styles.verseContainer}>
          <p className={styles.verseText}>&quot;But those who hope in the Lord will renew their strength.&quot;</p>
          <span className={styles.verseReference}>– Isaiah 40:31</span>
        </div>

        <div className={styles.languageSelector}>
          <div className={styles.langButtonContainer}>
            <button onClick={() => handleLanguageSelect("en")} className={styles.langBtn}>
              <span className={styles.langBtnTitle}>English</span>
              <span className={styles.langBtnSub}>Financial Freedom Solutions</span>
            </button>
            <button onClick={() => handleLanguageSelect("es")} className={styles.langBtn}>
              <span className={styles.langBtnTitle}>Español</span>
              <span className={styles.langBtnSub}>Soluciones de Libertad</span>
            </button>
          </div>
        </div>

        {!isAppInstalled && (
          <div className="install-tip-box">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "#ccc", fontSize: "0.85rem" }}>
              <p style={{ color: "var(--gold)", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.75rem" }}>Quick Install</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <span>Tap</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="5" r="1.5"></circle><circle cx="12" cy="19" r="1.5"></circle></svg>
                <span>or</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                <span>then</span>
                <span style={{ color: "#fff", fontWeight: "bold" }}>"Add to Home Screen"</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// 2. Exporting the component wrapped in Suspense
export default function CinematicIntro() {
  return (
    <Suspense fallback={null}>
      <IntroContent />
    </Suspense>
  );
}