"use client";

import { useState, useEffect } from "react";
import WealthCalculator from "@/components/WealthCalculator";
import ProgressTracker from "@/components/ProgressTracker";
import RuleOf72 from "@/components/RuleOf72";
import DIMECalculator from "@/components/DIMECalculator";
import DebtFreedomVisualizer from "@/components/DebtFreedomVisualizer";
import TaxFreeComparison from "@/components/TaxFreeComparison";
import CostOfWaiting from "@/components/CostOfWaiting";

export default function ToolboxPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  // Install Prompt States
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. Check if they are already inside the installed PWA
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    setIsAppInstalled(isStandalone);

    // 2. Detect iOS for the custom modal
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    if (isAppleDevice && !isStandalone) setIsIOS(true);

    // 3. Catch the native Android/Desktop install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    
    setIsLoaded(true);

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsAppInstalled(true); // Instantly unlock the page!
    }
  };

  // Prevent hydration flash
  if (!isLoaded) return null;

  // ==========================================
  // STATE 1: LOCKED SCREEN (WEB BROWSER)
  // ==========================================
  if (!isAppInstalled) {
    return (
      <>
        <title>Unlock Toolbox | Legacy in Motion</title>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes bounceDown { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(15px); } 60% { transform: translateY(7px); } }
        `}} />
        
        <section style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-dark)", padding: "12rem 2rem 6rem" }}>
          <div style={{ background: "var(--bg-card)", padding: "4rem 2.5rem", borderRadius: "24px", border: "1px solid var(--gold)", textAlign: "center", maxWidth: "600px", boxShadow: "0 20px 50px rgba(212, 175, 55, 0.15)" }}>
            
            <div style={{ width: "80px", height: "80px", background: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", border: "1px solid rgba(212, 175, 55, 0.3)", color: "var(--gold)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>

            <h1 style={{ fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1rem" }}>VIP Access Required</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2.5rem", lineHeight: "1.6" }}>
              The interactive calculators and workshop trackers are an exclusive feature of the Legacy in Motion App. Install the app to your device to unlock them instantly.
            </p>

            <button onClick={handleInstallClick} className="btn-gold btn-pulse" style={{ width: "100%", padding: "1.2rem", fontSize: "1.1rem", borderRadius: "12px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Install to Unlock
            </button>
          </div>
        </section>

        {/* iOS INSTALLATION MODAL */}
        {showIOSModal && (
          <div onClick={() => setShowIOSModal(false)} style={{ position: "fixed", inset: 0, zIndex: 999999, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "1rem" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg-page)", padding: "2.5rem 1.5rem 4rem", borderRadius: "24px", width: "100%", maxWidth: "500px", margin: "0 auto", position: "relative", border: "1px solid var(--border-light)", animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.8rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>Install Your Toolbox</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>Add the app to your home screen for instant access to premium financial calculators.</p>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", padding: "1rem", background: "var(--bg-card)", borderRadius: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", flexShrink: 0 }}>1</div>
                <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>Tap the <svg style={{ display: "inline", verticalAlign: "middle", margin: "0 4px", color: "var(--gold)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> share icon below.</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", padding: "1rem", background: "var(--bg-card)", borderRadius: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", flexShrink: 0 }}>2</div>
                <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>Scroll down and tap <strong>Add to Home Screen</strong> <svg style={{ display: "inline", verticalAlign: "middle", marginLeft: "6px", color: "var(--text-main)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></p>
              </div>

              <button onClick={() => setShowIOSModal(false)} style={{ width: "100%", padding: "1rem", background: "transparent", color: "var(--text-muted)", fontWeight: "600", border: "none", fontSize: "1rem", cursor: "pointer", textDecoration: "underline" }}>Close</button>
              
              <div style={{ position: "absolute", bottom: "-35px", left: "50%", marginLeft: "-20px", animation: "bounceDown 2s infinite" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ==========================================
  // STATE 2: UNLOCKED SCREEN (INSIDE APP)
  // ==========================================
  return (
    <>
      <title>Workshop Companion Toolbox | Legacy in Motion</title>
      
      <section className="hero" style={{ padding: "10rem 0 4rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            Exclusive App Access
          </span>
          <h1 style={{ fontSize: "3.2rem", maxWidth: "800px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Workshop <span className="text-gold">Companion Toolbox.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", color: "#ccc" }}>
            Follow along with Nelly during the live workshop. Use these interactive tools to calculate your wealth trajectory and discover your exact financial needs.
          </p>
        </div>
      </section>

      <section style={{ padding: "5rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem", alignItems: "stretch" }}>
            <WealthCalculator />
            <RuleOf72 />
            <CostOfWaiting />
            <DebtFreedomVisualizer />
            <TaxFreeComparison />
            <DIMECalculator />
            <ProgressTracker />
          </div>
        </div>
      </section>
    </>
  );
}