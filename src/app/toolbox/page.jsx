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
  
  // --- NEW: Soft Gate States ---
  const [isSoftUnlocked, setIsSoftUnlocked] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  
  // Install Prompt States
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if the user previously unlocked via email
    if (localStorage.getItem("toolbox_unlocked") === "true") {
      setIsSoftUnlocked(true);
    }

    const checkPWAStatus = () => {
      // Robust detection for Desktop, Android, and iOS stand-alone modes
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
                           || window.navigator.standalone 
                           || document.referrer.includes('android-app://');
      
      setIsAppInstalled(isStandalone);

      // Detect iOS for specific instruction modal
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isApple = /iphone|ipad|ipod/.test(userAgent);
      if (isApple && !isStandalone) setIsIOS(true);
    };

    checkPWAStatus();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    
    setIsLoaded(true);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    
    if (!deferredPrompt) {
      alert("Please use your browser menu and select 'Install App' or 'Add to Home Screen'.");
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsAppInstalled(true);
    }
  };

  // --- NEW: Handle the Email Form Submission ---
  const handleSoftUnlock = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    
    // NOTE: You can add a fetch() here later to send the email to your CRM/App Script
    console.log("Email captured:", emailInput);
    
    // Save to local storage so they don't have to enter it again on this device
    localStorage.setItem("toolbox_unlocked", "true");
    
    // Unlock the dashboard immediately
    setIsSoftUnlocked(true);
  };

  if (!isLoaded) return null;

  // ======================================================
  // STATE 1: LOCKED SCREEN (WEB BROWSER)
  // ======================================================
  // Updated condition: Only show lock screen if app isn't installed AND they haven't put in an email
  if (!isAppInstalled && !isSoftUnlocked) {
    return (
      <>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes bounceDown { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(15px); } 60% { transform: translateY(7px); } }
        `}} />
        
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-dark)", padding: "120px 1.5rem 80px" }}>
          
          <div className="fade-in visible" style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "24px", border: "1px solid var(--gold)", maxWidth: "800px", width: "100%", boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212, 175, 55, 0.1)" }}>
            
            <div style={{ width: "80px", height: "80px", background: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", border: "1px solid rgba(212, 175, 55, 0.3)", color: "var(--gold)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>

            <h1 style={{ fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1rem", textAlign: "center" }}>Unlock the Toolbox</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "3rem", textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
              Choose how you'd like to access our premium interactive financial calculators and workshop trackers.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              
              {/* OPTION 1: INSTALL APP */}
              <div style={{ background: "var(--bg-page)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ color: "var(--gold)", marginBottom: "1rem", textAlign: "center" }}>Option 1: Install App</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem", textAlign: "center", flexGrow: 1 }}>
                  Get instant home-screen access, full-screen mode, and the fastest performance.
                </p>
                <button onClick={handleInstallClick} className="btn-gold btn-pulse" style={{ width: "100%", padding: "1.2rem", borderRadius: "12px", border: "none", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Install App
                </button>
              </div>

              {/* OPTION 2: EMAIL CAPTURE */}
              <div style={{ background: "var(--bg-page)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ color: "var(--text-main)", marginBottom: "1rem", textAlign: "center" }}>Option 2: Web Access</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", textAlign: "center" }}>
                  Don't want to install an app? Enter your email to unlock the tools directly in your browser.
                </p>
                <form onSubmit={handleSoftUnlock} style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email address" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    style={{ width: "100%", padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--border-light)", background: "var(--bg-card)", color: "var(--text-main)", outline: "none", fontSize: "1rem" }} 
                  />
                  <button type="submit" className="btn-outline" style={{ width: "100%", padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--border-light)", background: "transparent", color: "var(--text-main)", fontWeight: "bold", cursor: "pointer" }}>
                    Unlock Now
                  </button>
                </form>
              </div>

            </div>
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
                <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>Tap the <svg style={{ display: "inline", verticalAlign: "middle", margin: "0 4px", color: "var(--gold)" }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> share icon below.</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", padding: "1rem", background: "var(--bg-card)", borderRadius: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", flexShrink: 0 }}>2</div>
                <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>Scroll down and tap <strong>Add to Home Screen</strong> <svg style={{ display: "inline", verticalAlign: "middle", marginLeft: "6px", color: "var(--text-main)" }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></p>
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

  // ======================================================
  // STATE 2: UNLOCKED DASHBOARD (INSIDE APP OR UNLOCKED VIA EMAIL)
  // ======================================================
  return (
    <>
      <section className="hero" style={{ padding: "10rem 0 4rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            {isAppInstalled ? "Exclusive App Access" : "Web Access Unlocked"}
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
          <div className="toolbox-grid fade-in visible">
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