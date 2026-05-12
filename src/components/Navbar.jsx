"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // App-Like Floating Action Button & Install States
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  // iOS Detection
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // 1. Detect if the app is ALREADY installed (standalone mode)
    const isStandalone = (typeof window !== 'undefined') && 
      (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);
    setIsAppInstalled(isStandalone);

    // 2. Detect Apple Device
    const isAppleDevice = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    if (isAppleDevice && !isStandalone) {
      setIsIOS(true);
      setShowInstall(true); 
    }

    // 3. Listen for Android/Desktop native install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone) setShowInstall(true); 
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      setIsFabOpen(false);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstall(false);
      setIsAppInstalled(true);
    }
    setIsFabOpen(false);
  };

  const handleLanguageToggle = () => {
    closeMenu();
    if (typeof window !== "undefined") sessionStorage.setItem("introPlayed", "true");
  };

  const getToggleUrl = () => {
    let target = isSpanish ? (pathname.replace(/^\/es/, "") || "/") : `/es${pathname === "/" ? "" : pathname}`;
    // Clean up potential double slashes
    target = target.replace(/\/+/g, '/');
    return `${target}${target.includes('?') ? '&' : '?'}skipIntro=true`;
  };

  // --- BILINGUAL TEXT ---
  const navText = {
    home: isSpanish ? "Inicio" : "Home",
    services: isSpanish ? "Servicios" : "Services",
    mission: isSpanish ? "Misión" : "Mission",
    baby: isSpanish ? "Futuro Infantil" : "Freedom Baby", 
    workshops: isSpanish ? "Seminarios" : "Workshops",
    book: isSpanish ? "Agendar Consulta" : "Request Consultation",
    installApp: isSpanish ? "Instalar Herramientas" : "Install Toolbox",
    openToolbox: isSpanish ? "Abrir Herramientas" : "Workshop Toolbox"
  };

  const iosModalText = {
    title: isSpanish ? "Instale su Caja de Herramientas" : "Install Your Toolbox",
    subtitle: isSpanish 
      ? "Agregue la aplicación a su pantalla para acceso instantáneo a calculadoras y estrategias premium." 
      : "Add the app to your home screen for instant access to premium financial calculators and trackers.",
    step1: isSpanish ? "Toque el ícono de " : "Tap the ",
    step1b: isSpanish ? " compartir abajo." : " share icon below.",
    step2: isSpanish ? "Desplácese y toque " : "Scroll down and tap ",
    step2b: isSpanish ? "Agregar a inicio" : "Add to Home Screen",
    close: isSpanish ? "Cerrar" : "Close"
  };

  const base = isSpanish ? "/es" : "";
  const contactRoute = isSpanish ? "/es/solicitar-llamada" : "/request-callback";
  const toolboxRoute = isSpanish ? "/es/herramientas" : "/toolbox";

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounceDown { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(15px); } 60% { transform: translateY(7px); } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); } 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); } }
        
        .dropdown-item-link:hover {
          background-color: var(--bg-card) !important;
          color: var(--gold) !important;
          padding-left: 1.8rem !important;
        }
      `}} />

      <nav style={{ 
        position: "sticky", top: 0, zIndex: 9999, width: "100%",
        background: scrolled ? "rgba(255, 255, 255, 0.98)" : "var(--bg-page)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <div className="container nav-inner" style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href={base || "/"} className="logo" onClick={closeMenu} style={{ whiteSpace: "nowrap", fontWeight: 800, letterSpacing: "2px", fontSize: "1.4rem" }}>
            LEGACY IN MOTION
          </Link>
          
          <button className={`menu-toggle ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
            <span></span><span></span><span></span>
          </button>

          <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <Link href={`${base}/`} onClick={closeMenu}>{navText.home}</Link>
            
            {/* SERVICES DROPDOWN - Perfected for Desktop Hover & Mobile Click */}
            <div 
              className="nav-dropdown-container" 
              onMouseEnter={() => !isOpen && setIsServicesOpen(true)} 
              onMouseLeave={() => !isOpen && setIsServicesOpen(false)} 
              style={{ position: "relative" }}
            >
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)} 
                style={{ 
                  background: "none", border: "none", cursor: "pointer", fontWeight: 500, color: "inherit",
                  display: "flex", alignItems: "center", gap: "6px", fontSize: "inherit", padding: "10px 0"
                }}
              >
                {navText.services}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: isServicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>

              {/* Dropdown Menu Wrapper with Hover Bridge */}
              <div style={{ 
                position: isOpen ? "relative" : "absolute", top: isOpen ? "0" : "100%", left: isOpen ? "0" : "-20px", 
                paddingTop: isOpen ? "0" : "15px", width: isOpen ? "100%" : "300px", zIndex: 100, 
                opacity: isServicesOpen ? 1 : 0, visibility: isServicesOpen ? "visible" : "hidden",
                transform: isServicesOpen ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease",
                pointerEvents: isServicesOpen ? "auto" : "none"
              }}>
                <div className="dropdown-menu" style={{
                  backgroundColor: "var(--bg-page)", boxShadow: isOpen ? "none" : "0 15px 35px rgba(0,0,0,0.1)", 
                  border: isOpen ? "none" : "1px solid var(--border-light)", borderRadius: "12px", 
                  display: "flex", flexDirection: "column", overflow: "hidden", padding: isOpen ? "0.5rem 0 0.5rem 1rem" : "0.5rem 0"
                }}>
                  {isSpanish ? (
                    <>
                      <Link href="/es/planificacion-de-jubilacion-los-angeles" onClick={closeMenu} className="dropdown-item-link" style={dropdownItemStyle}>Planificación de Jubilación</Link>
                      <Link href="/es/beneficios-en-vida-los-angeles" onClick={closeMenu} className="dropdown-item-link" style={dropdownItemStyle}>Seguros con Beneficios en Vida</Link>
                      <Link href="/es/estrategia-libre-de-deudas" onClick={closeMenu} className="dropdown-item-link" style={dropdownItemStyle}>Estrategia Libre de Deudas</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/retirement-planning-pasadena" onClick={closeMenu} className="dropdown-item-link" style={dropdownItemStyle}>Retirement & Rollovers</Link>
                      <Link href="/living-benefits-life-insurance-los-angeles" onClick={closeMenu} className="dropdown-item-link" style={dropdownItemStyle}>Living Benefits & Protection</Link>
                      <Link href="/debt-free-wealth-strategy" onClick={closeMenu} className="dropdown-item-link" style={dropdownItemStyle}>Debt Elimination Strategy</Link>
                    </>
                  )}
                  <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.5rem 0" }}></div>
                  <Link href="/service-areas" onClick={closeMenu} className="dropdown-item-link" style={{ ...dropdownItemStyle, color: "var(--gold)", fontWeight: 700 }}>{isSpanish ? "Áreas de Servicio" : "Service Areas"}</Link>
                </div>
              </div>
            </div>

            <Link href={isSpanish ? "/es/mision" : "/mission"} onClick={closeMenu}>{navText.mission}</Link>
            <Link href={isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby"} onClick={closeMenu}>{navText.baby}</Link>
            <Link href={isSpanish ? "/es/seminarios" : "/workshops"} onClick={closeMenu}>{navText.workshops}</Link>
            
            <Link href={getToggleUrl()} onClick={handleLanguageToggle} style={{ 
              fontWeight: 700, color: "var(--gold)", border: "2px solid var(--gold)", padding: "4px 10px", 
              borderRadius: "6px", fontSize: "0.85rem", transition: "0.3s"
            }}>
              {isSpanish ? "EN" : "ES"}
            </Link>

            <Link href={contactRoute} className="btn-gold" style={{ padding: "0.7rem 1.5rem" }} onClick={closeMenu}>
              {navText.book}
            </Link>
          </div>
        </div>
      </nav>

      {/* FLOATING ACTION MENU */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
        <div style={{
          display: "flex", flexDirection: "column", gap: "0.5rem",
          opacity: isFabOpen ? 1 : 0, visibility: isFabOpen ? "visible" : "hidden",
          transform: isFabOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", transformOrigin: "bottom right"
        }}>
          {showInstall && !isAppInstalled && (
            <button onClick={handleInstallClick} style={fabActionStyle}>
              <span style={fabLabelStyle}>{navText.installApp}</span>
              <div style={{...fabIconWrapperStyle, animation: "pulseGlow 2s infinite"}}>📱</div>
            </button>
          )}
          {isAppInstalled && (
            <Link href={toolboxRoute} onClick={() => setIsFabOpen(false)} style={fabActionStyle}>
              <span style={fabLabelStyle}>{navText.openToolbox}</span>
              <div style={{...fabIconWrapperStyle, animation: "pulseGlow 2s infinite", background: "var(--gold)", color: "#000", borderColor: "var(--gold)"}}>🧰</div>
            </Link>
          )}
          <Link href={contactRoute} onClick={() => setIsFabOpen(false)} style={fabActionStyle}>
            <span style={fabLabelStyle}>{navText.book}</span>
            <div style={fabIconWrapperStyle}>📞</div>
          </Link>
        </div>

        <button onClick={() => setIsFabOpen(!isFabOpen)} className="btn-pulse" style={{
            width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "var(--gold)", color: "white",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)", transition: "0.5s",
            transform: isFabOpen ? "rotate(45deg)" : "rotate(0deg)"
          }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>

      {/* iOS MODAL */}
      {showIOSModal && (
        <div onClick={() => setShowIOSModal(false)} style={{ position: "fixed", inset: 0, zIndex: 100000, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", padding: "1rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{
              background: "var(--bg-page)", padding: "2.5rem 1.5rem 4rem", borderRadius: "30px", width: "100%", maxWidth: "500px", margin: "0 auto", position: "relative",
              border: "1px solid var(--border-light)", boxShadow: "0 -20px 50px rgba(0,0,0,0.3)", animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: "60px", height: "6px", background: "var(--border-light)", borderRadius: "10px", margin: "0 auto 1.5rem" }}></div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800 }}>{iosModalText.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>{iosModalText.subtitle}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.2rem", padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px" }}>
              <div style={{ width: "45px", height: "45px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "1.3rem", flexShrink: 0 }}>1</div>
              <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>{iosModalText.step1} <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "inline", verticalAlign: "middle", margin: "0 6px", color: "var(--gold)" }}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> {iosModalText.step1b}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2.5rem", padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px" }}>
              <div style={{ width: "45px", height: "45px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "1.3rem", flexShrink: 0 }}>2</div>
              <p style={{ fontSize: "1.1rem", fontWeight: 500 }}>{iosModalText.step2} <strong>{iosModalText.step2b}</strong> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: "inline", verticalAlign: "middle", marginLeft: "8px" }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></p>
            </div>
            <button onClick={() => setShowIOSModal(false)} style={{ width: "100%", padding: "1rem", background: "transparent", color: "var(--gold)", fontWeight: "800", border: "none", fontSize: "1.1rem", cursor: "pointer", textDecoration: "underline" }}>{iosModalText.close}</button>
            <div style={{ position: "absolute", bottom: "-40px", left: "50%", marginLeft: "-25px", animation: "bounceDown 2s infinite" }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const dropdownItemStyle = { 
  padding: "0.8rem 1.5rem", color: "var(--text-main)", fontSize: "0.95rem", 
  transition: "all 0.3s ease", display: "block", textDecoration: "none", fontWeight: 500 
};
const fabActionStyle = { display: "flex", alignItems: "center", gap: "1rem", background: "transparent", border: "none", cursor: "pointer", textDecoration: "none" };
const fabLabelStyle = { backgroundColor: "var(--bg-page)", color: "var(--text-main)", padding: "0.6rem 1.2rem", borderRadius: "12px", fontSize: "0.95rem", fontWeight: 700, boxShadow: "0 4px 15px rgba(0,0,0,0.1)", border: "1px solid var(--border-light)" };
const fabIconWrapperStyle = { width: "55px", height: "55px", borderRadius: "50%", backgroundColor: "var(--bg-page)", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };