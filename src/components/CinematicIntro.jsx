"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function IntroContent() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

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

    try {
      const skipIntro = searchParams.get("skipIntro");
      const hasPlayed = sessionStorage.getItem("introPlayed");

      if (!hasPlayed && !skipIntro) {
        setShouldRender(true);
        document.body.style.overflow = "hidden";
      } else {
        sessionStorage.setItem("introPlayed", "true"); 
      }
    } catch (error) {
      // Catch incognito browsers that block sessionStorage
      setShouldRender(false);
      document.body.style.overflow = "";
    }
  }, [searchParams]);

  const handleLanguageSelect = (lang) => {
    try { sessionStorage.setItem("introPlayed", "true"); } catch (e) {}
    document.body.style.overflow = "";
    setStage("breakthrough");

    setTimeout(() => {
      if (lang === "es") router.push("/es?skipIntro=true"); 
      else router.push("/?skipIntro=true");
      
      setTimeout(() => setStage("hidden"), 400);
      setTimeout(() => setShouldRender(false), 1200);
    }, 600);
  };

  if (!isClient || !shouldRender) return null;

  return (
    <>
      <div className={`intro-overlay ${stage === "hidden" ? "hidden" : ""}`}>
        <div className="oppressive-shadow"></div>
        <div className={`light-breakthrough ${stage === "breakthrough" ? "active" : ""}`}></div>

        <div className="verse-container">
          <p className="verse-text">
            &quot;But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.&quot;
          </p>
          <span className="verse-reference">– Isaiah 40:31</span>
        </div>

        <div className="language-selector">
          <div className="lang-button-container">
            <button onClick={() => handleLanguageSelect("en")} className="lang-btn">
              <span className="lang-btn-title">English</span>
              <span className="lang-btn-sub">Explore Financial Freedom Solutions</span>
            </button>

            <button onClick={() => handleLanguageSelect("es")} className="lang-btn">
              <span className="lang-btn-title">Español</span>
              <span className="lang-btn-sub">Explorar Soluciones de Libertad Financiera</span>
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

export default function CinematicIntro() {
  return (
    <Suspense fallback={null}>
      <IntroContent />
    </Suspense>
  );
}