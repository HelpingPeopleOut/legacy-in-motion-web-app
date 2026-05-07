"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function IntroContent() {
  const [stage, setStage] = useState("trapped"); 
  const [shouldRender, setShouldRender] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  // React State for Ultra-Reliable Fade-In (Bypasses CSS Keyframe Bugs)
  const [showContent, setShowContent] = useState(false);
  
  const router = useRouter();
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

    // STRICT SESSION STORAGE LOGIC (Runs exactly ONCE per session)
    const skipIntro = searchParams.get("skipIntro");
    const hasPlayed = sessionStorage.getItem("introPlayed");

    if (!hasPlayed && !skipIntro) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      
      // Safely trigger CSS transitions 100ms after mount
      const t = setTimeout(() => setShowContent(true), 100);
      timeouts.current.push(t);
    } else {
      sessionStorage.setItem("introPlayed", "true"); 
    }
  }, [searchParams]);

  const handleLanguageSelect = (lang) => {
    sessionStorage.setItem("introPlayed", "true");
    document.body.style.overflow = ""; // Unlock screen instantly
    setStage("breakthrough");

    const timer1 = setTimeout(() => {
      if (lang === "es") {
        router.push("/es?skipIntro=true"); 
        completeIntro();
      } else {
        completeIntro();
      }
    }, 600);

    timeouts.current.push(timer1);
  };

  const completeIntro = () => {
    document.body.style.overflow = "";
    const timer2 = setTimeout(() => setStage("hidden"), 200);
    const timer3 = setTimeout(() => {
      setShouldRender(false);
      setShowContent(false);
    }, 1000);
    
    timeouts.current.push(timer2, timer3);
  };

  if (!isClient || !shouldRender) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .cinematic-overlay {
          position: fixed; inset: 0; z-index: 999999;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #000; overflow: hidden;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }
        .cinematic-overlay.hidden {
          opacity: 0; visibility: hidden; pointer-events: none;
        }
        .cinematic-shadow {
          position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(20,20,20,1) 0%, #000 100%); z-index: 1; pointer-events: none;
        }
        .cinematic-content {
          position: relative; z-index: 2; text-align: center; padding: 0 1.5rem; max-width: 800px;
          opacity: 0; transform: translateY(20px); transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }
        .cinematic-content.visible {
          opacity: 1; transform: translateY(0);
        }
        .cinematic-verse {
          font-family: var(--font-heading, 'Playfair Display', serif); font-size: clamp(1.1rem, 3.5vw, 2rem); font-style: italic; color: #fff; line-height: 1.6; text-shadow: 0 2px 10px rgba(0,0,0,0.5); margin: 0;
        }
        .cinematic-ref {
          display: block; margin-top: 1.2rem; font-family: var(--font-body, 'Inter', sans-serif); font-size: 0.85rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--gold, #D4AF37);
        }
        .cinematic-buttons {
          position: relative; z-index: 10; margin-top: 3rem; width: 100%; max-width: 700px; padding: 0 1.5rem;
          opacity: 0; transform: translateY(20px); transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1s;
          display: flex; gap: 1.2rem; justify-content: center; align-items: stretch;
        }
        .cinematic-buttons.visible {
          opacity: 1; transform: translateY(0);
        }
        .lang-btn {
          background: rgba(255, 255, 255, 0.07); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.3); color: #fff; padding: 1.2rem; font-family: var(--font-body, 'Inter', sans-serif); cursor: pointer; transition: all 0.3s ease; border-radius: 12px; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.4rem;
        }
        .lang-btn:hover {
          background: #fff; color: #000; border-color: #fff; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2);
        }
        .lang-btn-title { font-weight: 700; font-size: 1.1rem; letter-spacing: 1px; text-transform: uppercase; }
        .lang-btn-sub { font-weight: 400; font-size: 0.8rem; opacity: 0.7; line-height: 1.3; }
        .lang-btn:hover .lang-btn-sub { color: #333; opacity: 1; }
        
        .light-breakthrough {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0); width: 5px; height: 5px; background: #fff; border-radius: 50%; box-shadow: 0 0 100px 100px #fff; opacity: 0; z-index: 100; transition: transform 0.8s ease-in, opacity 0.8s ease-in;
        }
        .light-breakthrough.active {
          transform: translate(-50%, -50%) scale(500); opacity: 1;
        }
        
        @keyframes tipFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes borderGlow { 0%, 100% { border-color: rgba(212, 175, 55, 0.3); } 50% { border-color: rgba(212, 175, 55, 0.7); box-shadow: 0 0 15px rgba(212, 175, 55, 0.2); } }
        .install-tip {
          position: absolute; bottom: 2rem; z-index: 100; background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 1rem; width: 90%; max-width: 380px; text-align: center; animation: tipFadeUp 0.8s ease forwards, borderGlow 3s infinite; animation-delay: 1.5s; opacity: 0;
        }
        @media (max-width: 600px) {
          .cinematic-buttons { flex-direction: column; gap: 0.8rem; }
          .lang-btn { width: 100%; padding: 1rem; }
        }
      `}} />

      <div className={`cinematic-overlay ${stage === "hidden" ? "hidden" : ""}`}>
        <div className="cinematic-shadow"></div>
        <div className={`light-breakthrough ${stage === "breakthrough" ? "active" : ""}`}></div>

        <div className={`cinematic-content ${showContent ? "visible" : ""}`}>
          <p className="cinematic-verse">
            &quot;But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.&quot;
          </p>
          <span className="cinematic-ref">– Isaiah 40:31</span>
        </div>

        <div className={`cinematic-buttons ${showContent ? "visible" : ""}`}>
          <button onClick={() => handleLanguageSelect("en")} className="lang-btn">
            <span className="lang-btn-title">English</span>
            <span className="lang-btn-sub">Explore Financial Freedom Solutions</span>
          </button>

          <button onClick={() => handleLanguageSelect("es")} className="lang-btn">
            <span className="lang-btn-title">Español</span>
            <span className="lang-btn-sub">Explorar Soluciones de Libertad Financiera</span>
          </button>
        </div>

        {!isAppInstalled && (
          <div className="install-tip">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "#ccc", fontSize: "0.85rem" }}>
              <p style={{ color: "var(--gold, #D4AF37)", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.75rem", margin: 0 }}>Quick Install</p>
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

// 2. Exporting the component wrapped in Suspense for Next.js build requirement
export default function CinematicIntro() {
  return (
    <Suspense fallback={null}>
      <IntroContent />
    </Suspense>
  );
}