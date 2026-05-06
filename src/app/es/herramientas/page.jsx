"use client";

import { useState, useEffect } from "react";
import WealthCalculator from "@/components/WealthCalculator";
import ProgressTracker from "@/components/ProgressTracker";
import RuleOf72 from "@/components/RuleOf72";
import DIMECalculator from "@/components/DIMECalculator";
import DebtFreedomVisualizer from "@/components/DebtFreedomVisualizer";
import TaxFreeComparison from "@/components/TaxFreeComparison";
import CostOfWaiting from "@/components/CostOfWaiting";

export default function HerramientasPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  // Estados para el aviso de instalación
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkPWAStatus = () => {
      // Detección robusta para Desktop, Android e iOS en modo independiente
      const isStandalone = 
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
      
      setIsAppInstalled(isStandalone);

      // Detectar iOS para mostrar el modal de instrucciones específico
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
      alert("Por favor, use el menú de su navegador (3 puntos) y seleccione 'Instalar aplicación' o 'Agregar a la pantalla de inicio'.");
      return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsAppInstalled(true);
    }
  };

  if (!isLoaded) return null;

  // ======================================================
  // ESTADO 1: BÓVEDA VIP BLOQUEADA (VISTA DESDE NAVEGADOR)
  // ======================================================
  if (!isAppInstalled) {
    return (
      <>
        <title>Acceso VIP | Caja de Herramientas Legacy in Motion</title>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes bounceDown { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(15px); } 60% { transform: translateY(7px); } }
        `}} />
        
        <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-dark)", padding: "140px 1.5rem 80px" }}>
          <div className="fade-in visible" style={{ background: "var(--bg-card)", padding: "clamp(2rem, 5vw, 4rem) 2rem", borderRadius: "32px", border: "1px solid var(--gold)", textAlign: "center", maxWidth: "650px", boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212, 175, 55, 0.1)" }}>
            
            <div style={{ width: "90px", height: "90px", background: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2.5rem", border: "1px solid rgba(212, 175, 55, 0.4)", color: "var(--gold)" }}>
              <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--text-main)", marginBottom: "1.2rem", letterSpacing: "-0.5px" }}>Acceso Exclusivo de la App</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.15rem", marginBottom: "3rem", lineHeight: "1.7", maxWidth: "500px", margin: "0 auto 3rem" }}>
              Para garantizar la seguridad de sus datos y una experiencia interactiva premium, la Caja de Herramientas solo es accesible a través de la <strong>App de Legacy in Motion</strong>.
            </p>

            <button onClick={handleInstallClick} className="btn-gold btn-pulse" style={{ width: "100%", padding: "1.4rem", fontSize: "1.1rem", borderRadius: "16px", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", fontWeight: "800" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              INSTALAR APP PARA DESBLOQUEAR
            </button>
          </div>
        </section>

        {/* MODAL DE INSTALACIÓN iOS EMPRESARIAL */}
        {showIOSModal && (
          <div onClick={() => setShowIOSModal(false)} style={{ position: "fixed", inset: 0, zIndex: 999999, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", padding: "1rem" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg-page)", padding: "2.5rem 1.5rem 4.5rem", borderRadius: "32px 32px 24px 24px", width: "100%", maxWidth: "500px", margin: "0 auto", position: "relative", border: "1px solid var(--border-light)", animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div style={{ width: "50px", height: "5px", background: "var(--border-light)", borderRadius: "10px", margin: "0 auto 1.5rem" }}></div>
                <h3 style={{ fontSize: "1.8rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>Instale su Caja de Herramientas</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>Agréguela a la pantalla de inicio para acceso VIP instantáneo.</p>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.5rem", padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-light)" }}>
                <div style={{ width: "40px", height: "40px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "1.2rem", flexShrink: 0 }}>1</div>
                <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>Toque el ícono de <svg style={{ display: "inline", verticalAlign: "middle", margin: "0 4px", color: "var(--gold)" }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> compartir abajo.</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2rem", padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-light)" }}>
                <div style={{ width: "40px", height: "40px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "1.2rem", flexShrink: 0 }}>2</div>
                <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>Seleccione <strong>Agregar a inicio</strong> <svg style={{ display: "inline", verticalAlign: "middle", marginLeft: "6px", color: "var(--text-main)" }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></p>
              </div>

              <button onClick={() => setShowIOSModal(false)} style={{ width: "100%", padding: "1rem", background: "transparent", color: "var(--text-muted)", fontWeight: "700", border: "none", fontSize: "1rem", cursor: "pointer", textDecoration: "underline" }}>Cerrar</button>
              
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
  // ESTADO 2: PANEL DESBLOQUEADO (VISTA DESDE LA APP)
  // ======================================================
  return (
    <>
      <title>Herramientas del Taller | Legacy in Motion</title>
      
      <section className="hero" style={{ padding: "160px 0 60px", background: "var(--bg-dark)" }}>
        <div className="container text-center fade-in visible">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.85rem" }}>
            Función Premium de la App
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 3.8rem)", maxWidth: "900px", margin: "1.2rem auto", color: "#fff", lineHeight: "1.1" }}>
            Caja de <span className="text-gold">Herramientas.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "#aaa", fontWeight: "300" }}>
            Suite interactiva profesional para cálculos de trayectoria de riqueza y seguimiento de su fortaleza financiera en tiempo real.
          </p>
        </div>
      </section>

      <section style={{ padding: "60px 0 100px", background: "var(--bg-page)" }}>
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