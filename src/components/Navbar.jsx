"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // App-Like Floating Action Button State
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  
  // iOS Detection State
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

  // Detect Scrolling to trigger the "Sticky Glass" effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // 1. Detect if the user is on an iPhone/iPad
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    
    // Also check if it's already running in standalone (PWA) mode
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isAppleDevice && !isStandalone) {
      setIsIOS(true);
      setShowInstall(true); // Always show the install button on iOS if not installed
    }

    // 2. Listen for Android/Desktop native install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true); 
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    // If it's an iPhone, show our advanced animated instruction modal
    if (isIOS) {
      setShowIOSModal(true);
      setIsFabOpen(false);
      return;
    }

    // If it's Android, trigger the native automatic prompt (1-click install)
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
    setIsFabOpen(false);
  };

  const handleLanguageToggle = () => {
    closeMenu();
    if (typeof window !== "undefined") sessionStorage.setItem("introPlayed", "true");
  };

  const getToggleUrl = () => {
    let targetPath = "/";
    if (isSpanish) targetPath = pathname.replace(/^\/es/, "") || "/";
    else targetPath = `/es${pathname === "/" ? "" : pathname}`;
    return `${targetPath}?skipIntro=true`;
  };

  // --- BILINGUAL TEXT WITH TOOLBOX MARKETING ---
  const navText = {
    home: isSpanish ? "Inicio" : "Home",
    services: isSpanish ? "Servicios" : "Services",
    mission: isSpanish ? "Misión" : "Mission",
    baby: isSpanish ? "Futuro Infantil" : "Freedom Baby", 
    workshops: isSpanish ? "Seminarios" : "Workshops",
    book: isSpanish ? "Agendar Consulta" : "Request Consultation",
    installApp: isSpanish ? "Instalar Herramientas" : "Install Toolbox"
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

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(15px); }
          60% { transform: translateY(7px); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
      `}} />

      {/* UPGRADED STICKY NAV */}
      <nav style={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 990, 
        width: "100%",
        background: scrolled ? "rgba(255, 255, 255, 0.95)" : "var(--bg-page)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
        transition: "all 0.3s ease"
      }}>
        <div className="container nav-inner">
          <Link href={base || "/"} className="logo" onClick={closeMenu} style={{ whiteSpace: "nowrap" }}>
            LEGACY IN MOTION
          </Link>
          
          <button className={`menu-toggle ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
            <span></span><span></span><span></span>
          </button>

          <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <Link href={`${base}/`} onClick={closeMenu} style={{ whiteSpace: "nowrap" }}>{navText.home}</Link>
            
            {/* UPGRADED SMOOTH DROPDOWN CONTAINER */}
            <div className="nav-dropdown-container" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)} style={{ position: "relative", cursor: "pointer", whiteSpace: "nowrap" }}>
              <span onClick={() => setIsServicesOpen(!isServicesOpen)} style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
                {navText.services}
                <svg 
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isServicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>

              {/* The Dropdown Menu (Always mounted to prevent layout jumps, handled via CSS) */}
              <div className="dropdown-menu" style={{ 
                position: isOpen ? "relative" : "absolute", 
                top: isOpen ? "0" : "100%", 
                left: 0, 
                marginTop: isOpen ? "0.5rem" : "1.5rem", 
                backgroundColor: "var(--bg-page)", 
                boxShadow: isOpen ? "none" : "var(--shadow-md)", 
                border: isOpen ? "none" : "1px solid var(--border-light)", 
                borderRadius: "12px", 
                display: isOpen && !isServicesOpen ? "none" : "flex", 
                flexDirection: "column", 
                minWidth: "280px", 
                zIndex: 100, 
                overflow: "hidden",
                opacity: isOpen ? 1 : (isServicesOpen ? 1 : 0),
                visibility: isOpen ? "visible" : (isServicesOpen ? "visible" : "hidden"),
                transform: isOpen ? "none" : (isServicesOpen ? "translateY(0)" : "translateY(15px)"),
                transition: "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s",
                pointerEvents: isOpen ? "auto" : (isServicesOpen ? "auto" : "none")
              }}>
                  {isSpanish ? (
                    <>
                      <Link href="/es/planificacion-de-jubilacion-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Planificación de Jubilación</Link>
                      <Link href="/es/beneficios-en-vida-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Seguros con Beneficios en Vida</Link>
                      <Link href="/es/estrategia-libre-de-deudas" onClick={closeMenu} style={dropdownItemStyle}>Estrategia Libre de Deudas</Link>
                      <Link href="/es/proteccion-de-hipoteca-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Protección de Hipoteca</Link>
                      <Link href="/es/estrategias-financieras-para-negocios" onClick={closeMenu} style={dropdownItemStyle}>Estrategias para Negocios</Link>
                      <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.2rem 0" }}></div>
                      <Link href="/service-areas" onClick={closeMenu} style={{ ...dropdownItemStyle, color: "var(--gold)", fontWeight: 600 }}>Nuestras Áreas de Servicio</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/retirement-planning-pasadena" onClick={closeMenu} style={dropdownItemStyle}>Retirement & Rollovers</Link>
                      <Link href="/estate-business-planning-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Estate & Business Planning</Link>
                      <Link href="/generational-wealth-arcadia-sgv" onClick={closeMenu} style={dropdownItemStyle}>Generational Wealth</Link>
                      <Link href="/living-benefits-life-insurance-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Living Benefits & Protection</Link>
                      <Link href="/debt-free-wealth-strategy" onClick={closeMenu} style={dropdownItemStyle}>Debt Elimination Strategy</Link>
                      <Link href="/mortgage-protection-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Mortgage Protection</Link>
                      <Link href="/business-owner-financial-strategies" onClick={closeMenu} style={dropdownItemStyle}>Business Owner Strategies</Link>
                      <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.2rem 0" }}></div>
                      <Link href="/service-areas" onClick={closeMenu} style={{ ...dropdownItemStyle, color: "var(--gold)", fontWeight: 600 }}>View All Service Areas</Link>
                    </>
                  )}
              </div>
            </div>

            <Link href={isSpanish ? "/es/mision" : "/mission"} onClick={closeMenu} style={{ whiteSpace: "nowrap" }}>{navText.mission}</Link>
            <Link href={isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby"} onClick={closeMenu} style={{ whiteSpace: "nowrap" }}>{navText.baby}</Link>
            <Link href={isSpanish ? "/es/seminarios" : "/workshops"} onClick={closeMenu} style={{ whiteSpace: "nowrap" }}>{navText.workshops}</Link>
            
            <Link href={getToggleUrl()} onClick={handleLanguageToggle} style={{ fontWeight: 600, color: "var(--gold)", margin: "0 0.5rem", border: "1px solid var(--gold)", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
              {isSpanish ? "EN" : "ES"}
            </Link>

            <Link href={contactRoute} className="btn-gold" style={{ padding: "0.5rem 1.5rem", whiteSpace: "nowrap" }} onClick={closeMenu}>
              {navText.book}
            </Link>
          </div>
        </div>
      </nav>

      {/* ==================================================== */}
      {/* FLOATING ACTION MENU (APP-LIKE EXPERIENCE)           */}
      {/* ==================================================== */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
        
        <div style={{
          display: "flex", flexDirection: "column", gap: "0.5rem",
          opacity: isFabOpen ? 1 : 0, visibility: isFabOpen ? "visible" : "hidden",
          transform: isFabOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          transition: "var(--transition)", transformOrigin: "bottom right"
        }}>
          {/* Conditional App Install Button */}
          {showInstall && (
            <button onClick={handleInstallClick} style={fabActionStyle}>
              <span style={fabLabelStyle}>{navText.installApp}</span>
              <div style={{...fabIconWrapperStyle, animation: "pulseGlow 2s infinite"}}>📱</div>
            </button>
          )}
          
          {/* Request Callback Button */}
          <Link href={contactRoute} onClick={() => setIsFabOpen(false)} style={fabActionStyle}>
            <span style={fabLabelStyle}>{navText.book}</span>
            <div style={fabIconWrapperStyle}>📞</div>
          </Link>
        </div>

        <button 
          onClick={() => setIsFabOpen(!isFabOpen)}
          className="btn-pulse"
          style={{
            width: "60px", height: "60px", borderRadius: "50%",
            backgroundColor: "var(--gold)", color: "white",
            border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-md)", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isFabOpen ? "rotate(45deg)" : "rotate(0deg)"
          }}
          aria-label="Quick Actions"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* ==================================================== */}
      {/* ADVANCED iOS INSTALLATION BOTTOM SHEET               */}
      {/* ==================================================== */}
      {showIOSModal && (
        <div 
          onClick={() => setShowIOSModal(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 99999, display: "flex", flexDirection: "column", justifyContent: "flex-end",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "1rem"
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              background: "var(--bg-page)", padding: "2.5rem 1.5rem 4rem 1.5rem", borderRadius: "24px 24px 24px 24px", 
              width: "100%", maxWidth: "500px", margin: "0 auto", position: "relative",
              border: "1px solid var(--border-light)", boxShadow: "0 -10px 40px rgba(0,0,0,0.2)",
              animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: "50px", height: "5px", background: "var(--border-light)", borderRadius: "10px", margin: "0 auto 1.5rem auto" }}></div>
              <h3 style={{ fontSize: "1.8rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>{iosModalText.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>{iosModalText.subtitle}</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", padding: "1rem", background: "var(--bg-card)", borderRadius: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", flexShrink: 0 }}>1</div>
              <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>
                {iosModalText.step1} 
                <svg style={{ display: "inline", verticalAlign: "middle", margin: "0 4px", color: "var(--gold)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> 
                {iosModalText.step1b}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", padding: "1rem", background: "var(--bg-card)", borderRadius: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem", flexShrink: 0 }}>2</div>
              <p style={{ fontSize: "1.05rem", color: "var(--text-main)" }}>
                {iosModalText.step2} <strong>{iosModalText.step2b}</strong> 
                <svg style={{ display: "inline", verticalAlign: "middle", marginLeft: "6px", color: "var(--text-main)" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </p>
            </div>

            <button 
              onClick={() => setShowIOSModal(false)}
              style={{
                width: "100%", padding: "1rem", background: "transparent", color: "var(--text-muted)", fontWeight: "600",
                border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", textDecoration: "underline"
              }}
            >
              {iosModalText.close}
            </button>

            <div style={{
              position: "absolute", bottom: "-35px", left: "50%", marginLeft: "-20px",
              animation: "bounceDown 2s infinite"
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Inline Styles
const dropdownItemStyle = { padding: "1rem 1.5rem", color: "var(--text-main)", fontSize: "0.95rem", transition: "background 0.2s", display: "block", textDecoration: "none" };
const fabActionStyle = { display: "flex", alignItems: "center", gap: "1rem", background: "transparent", border: "none", cursor: "pointer", textDecoration: "none", flexDirection: "row" };
const fabLabelStyle = { backgroundColor: "var(--bg-page)", color: "var(--text-main)", padding: "0.5rem 1rem", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600, boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-light)" };
const fabIconWrapperStyle = { width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", boxShadow: "var(--shadow-sm)" };