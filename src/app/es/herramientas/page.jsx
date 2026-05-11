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
  
  // --- NUEVO: Estados para el Acceso Web (Soft Gate) ---
  const [isSoftUnlocked, setIsSoftUnlocked] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  
  // Estados para el aviso de instalación
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Comprobar si el usuario ya desbloqueó las herramientas con su correo previamente
    if (localStorage.getItem("toolbox_unlocked") === "true") {
      setIsSoftUnlocked(true);
    }

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

  // --- NUEVO: Manejar el envío del formulario de correo electrónico ---
  const handleSoftUnlock = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    
    // NOTA: ¡Aquí puedes agregar un fetch() para enviar el correo a tu CRM!
    console.log("Correo capturado (ES):", emailInput);
    
    // Guardar en el almacenamiento local para que no tengan que volver a ingresarlo
    localStorage.setItem("toolbox_unlocked", "true");
    
    // Desbloquear el panel de herramientas inmediatamente
    setIsSoftUnlocked(true);
  };

  if (!isLoaded) return null;

  // ======================================================
  // ESTADO 1: BÓVEDA VIP BLOQUEADA (VISTA DESDE NAVEGADOR)
  // ======================================================
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

            <h1 style={{ fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "1rem", textAlign: "center" }}>Desbloquear Herramientas</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "3rem", textAlign: "center", maxWidth: "600px", margin: "0 auto 3rem" }}>
              Elija cómo desea acceder a nuestras calculadoras financieras premium e interactivas.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              
              {/* OPCIÓN 1: INSTALAR APP */}
              <div style={{ background: "var(--bg-page)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ color: "var(--gold)", marginBottom: "1rem", textAlign: "center" }}>Opción 1: Instalar App</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem", textAlign: "center", flexGrow: 1 }}>
                  Obtenga acceso instantáneo desde su pantalla de inicio, modo pantalla completa y la mejor experiencia.
                </p>
                <button onClick={handleInstallClick} className="btn-gold btn-pulse" style={{ width: "100%", padding: "1.2rem", borderRadius: "12px", border: "none", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Instalar App
                </button>
              </div>

              {/* OPCIÓN 2: CAPTURA DE CORREO (Soft Gate) */}
              <div style={{ background: "var(--bg-page)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ color: "var(--text-main)", marginBottom: "1rem", textAlign: "center" }}>Opción 2: Acceso Web</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", textAlign: "center" }}>
                  ¿No desea instalar una aplicación? Ingrese su correo electrónico para desbloquear las herramientas en su navegador.
                </p>
                <form onSubmit={handleSoftUnlock} style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <input 
                    type="email" 
                    required 
                    placeholder="Ingrese su correo electrónico" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    style={{ width: "100%", padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--border-light)", background: "var(--bg-card)", color: "var(--text-main)", outline: "none", fontSize: "1rem" }} 
                  />
                  <button type="submit" className="btn-outline" style={{ width: "100%", padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--border-light)", background: "transparent", color: "var(--text-main)", fontWeight: "bold", cursor: "pointer" }}>
                    Desbloquear Ahora
                  </button>
                </form>
              </div>

            </div>
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
  // ESTADO 2: PANEL DESBLOQUEADO (VISTA DESDE LA APP O WEB)
  // ======================================================
  return (
    <>
      <section className="hero" style={{ padding: "160px 0 60px", background: "var(--bg-dark)" }}>
        <div className="container text-center fade-in visible">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.85rem" }}>
            {isAppInstalled ? "Función Premium de la App" : "Acceso Web Desbloqueado"}
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