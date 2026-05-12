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
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  // iOS Detection State
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  // Lock body scroll and hide FAB when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsFabOpen(false);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Detect Scrolling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PWA & Install Detection
  useEffect(() => {
    const isStandalone = window.navigator.standalone || (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches);
    setIsAppInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    
    if (isAppleDevice && !isStandalone) {
      setIsIOS(true);
      setShowInstall(true); 
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone) setShowInstall(true); 
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
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
    if (typeof window !== "undefined") {
      sessionStorage.setItem("introPlayed", "true");
    }
  };

  const getToggleUrl = () => {
    let targetPath = "/";
    if (isSpanish) {
      targetPath = pathname.replace(/^\/es/, "") || "/";
    } else {
      targetPath = `/es${pathname === "/" ? "" : pathname}`;
    }
    targetPath = targetPath.replace(/\/+/g, '/');
    return `${targetPath}${targetPath.includes('?') ? '&' : '?'}skipIntro=true`;
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
        /* ==============================================
           PREMIUM ISOLATED NAVBAR CSS
           (Prevents conflicts with old globals.css)
           ============================================== */
        
        .elite-nav-container {
          position: sticky; top: 0; z-index: 9990; width: 100%;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .elite-nav-container.scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid var(--border-light);
          box-shadow: 0 4px 30px rgba(0,0,0,0.03);
        }

        .elite-nav-inner {
          display: flex; justify-content: space-between; align-items: center; 
          height: 85px; max-width: 1200px; margin: 0 auto; padding: 0 2rem;
        }

        .elite-brand {
          display: flex; align-items: center; gap: 0.8rem; text-decoration: none;
          font-weight: 800; letter-spacing: 2px; font-size: 1.25rem; color: var(--text-main);
          z-index: 10000;
        }

        /* --- DESKTOP NAVIGATION --- */
        .elite-desktop-menu { display: flex; align-items: center; gap: 2.5rem; }
        .elite-nav-link { color: var(--text-main); font-weight: 600; text-decoration: none; font-size: 0.95rem; transition: color 0.3s; }
        .elite-nav-link:hover { color: var(--gold); }
        
        .elite-dropdown-wrapper { position: relative; cursor: pointer; height: 85px; display: flex; align-items: center; }
        .elite-dropdown-trigger { background: none; border: none; font-size: 0.95rem; font-weight: 600; color: var(--text-main); display: flex; align-items: center; gap: 6px; cursor: pointer; font-family: inherit; }
        .elite-dropdown-trigger:hover { color: var(--gold); }
        
        .elite-dropdown-panel {
          position: absolute; top: 80px; left: -20px; width: 300px;
          background: var(--bg-page); border: 1px solid var(--border-light); border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08); padding: 0.5rem 0;
          opacity: 0; visibility: hidden; transform: translateY(10px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .elite-dropdown-wrapper:hover .elite-dropdown-panel { opacity: 1; visibility: visible; transform: translateY(0); }
        
        .elite-dropdown-item {
          display: block; padding: 0.8rem 1.5rem; color: var(--text-main); text-decoration: none;
          font-size: 0.95rem; font-weight: 500; transition: all 0.2s;
        }
        .elite-dropdown-item:hover { background: var(--bg-card); color: var(--gold); padding-left: 2rem; }

        .elite-lang-btn {
          border: 2px solid var(--gold); color: var(--gold); padding: 6px 14px;
          border-radius: 6px; font-weight: 700; font-size: 0.85rem; text-decoration: none; transition: 0.3s;
        }
        .elite-lang-btn:hover { background: var(--gold); color: #fff; }

        .elite-cta-btn {
          background: var(--gold); color: #fff; padding: 0.8rem 1.8rem; border-radius: 8px;
          font-weight: 600; text-decoration: none; transition: 0.3s; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;
        }
        .elite-cta-btn:hover { background: var(--text-main); transform: translateY(-2px); }

        .elite-hamburger { display: none; background: none; border: none; cursor: pointer; z-index: 10000; padding: 0.5rem; }

        /* --- MOBILE OVERLAY NAVIGATION --- */
        .elite-mobile-overlay {
          position: fixed; inset: 0; background: var(--bg-page); z-index: 9995;
          display: flex; flex-direction: column;
          transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }
        .elite-mobile-overlay.open { transform: translateX(0); }
        
        .elite-mobile-header {
          display: flex; justify-content: space-between; align-items: center;
          height: 85px; padding: 0 2rem; border-bottom: 1px solid var(--border-light);
        }
        
        .elite-mobile-content { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .elite-mobile-link { font-size: 1.6rem; font-weight: 700; color: var(--text-main); text-decoration: none; }
        
        .elite-mobile-accordion-btn {
          font-size: 1.6rem; font-weight: 700; color: var(--text-main); background: none; border: none;
          display: flex; justify-content: space-between; width: 100%; align-items: center; cursor: pointer; padding: 0; font-family: inherit;
        }
        
        .elite-mobile-accordion-content {
          display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s ease;
        }
        .elite-mobile-accordion-content.expanded { grid-template-rows: 1fr; }
        .elite-mobile-accordion-inner {
          overflow: hidden; display: flex; flex-direction: column; gap: 1.2rem;
          padding-left: 1.2rem; border-left: 3px solid var(--gold); margin-top: 1rem;
        }
        
        .elite-mobile-sublink { font-size: 1.15rem; color: var(--text-muted); text-decoration: none; font-weight: 500; }
        .elite-mobile-sublink:hover { color: var(--gold); }

        .elite-mobile-footer { margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem; }

        @media (max-width: 900px) {
          .elite-desktop-menu { display: none; }
          .elite-hamburger { display: block; }
          .elite-nav-inner { padding: 0 1.5rem; }
          .elite-mobile-header { padding: 0 1.5rem; }
          .elite-mobile-content { padding: 2rem 1.5rem; }
        }

        /* Miscellaneous Keyframes */
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounceDown { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(15px); } 60% { transform: translateY(7px); } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); } 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); } }
      `}} />

      {/* ==================================================== */}
      {/* 1. STICKY TOP NAVBAR (Visible on Desktop & Mobile)   */}
      {/* ==================================================== */}
      <nav className={`elite-nav-container ${scrolled ? "scrolled" : ""}`}>
        <div className="elite-nav-inner">
          
          {/* BRAND LOGO */}
          <Link href={base || "/"} className="elite-brand" onClick={closeMenu}>
            <img src="/android-chrome-192x192.png" alt="Legacy in Motion Logo" style={{ width: "45px", height: "45px", objectFit: "contain", filter: "drop-shadow(0 4px 6px rgba(212, 175, 55, 0.2))" }} />
            <span style={{ display: "none" }} className="mobile-show">LEGACY IN MOTION</span>
            <span className="desktop-show" style={{ display: "inline-block" }}>LEGACY IN MOTION</span>
          </Link>

          {/* DESKTOP MENU (Hidden on Mobile) */}
          <div className="elite-desktop-menu">
            <Link href={`${base}/`} className="elite-nav-link">{navText.home}</Link>
            
            <div className="elite-dropdown-wrapper">
              <button className="elite-dropdown-trigger">
                {navText.services} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div className="elite-dropdown-panel">
                {isSpanish ? (
                  <>
                    <Link href="/es/planificacion-de-jubilacion-los-angeles" className="elite-dropdown-item">Planificación de Jubilación</Link>
                    <Link href="/es/beneficios-en-vida-los-angeles" className="elite-dropdown-item">Seguros con Beneficios en Vida</Link>
                    <Link href="/es/estrategia-libre-de-deudas" className="elite-dropdown-item">Estrategia Libre de Deudas</Link>
                    <Link href="/es/proteccion-de-hipoteca-los-angeles" className="elite-dropdown-item">Protección de Hipoteca</Link>
                    <Link href="/es/estrategias-financieras-para-negocios" className="elite-dropdown-item">Estrategias para Negocios</Link>
                  </>
                ) : (
                  <>
                    <Link href="/retirement-planning-pasadena" className="elite-dropdown-item">Retirement & Rollovers</Link>
                    <Link href="/estate-business-planning-los-angeles" className="elite-dropdown-item">Estate & Business Planning</Link>
                    <Link href="/generational-wealth-arcadia-sgv" className="elite-dropdown-item">Generational Wealth</Link>
                    <Link href="/living-benefits-life-insurance-los-angeles" className="elite-dropdown-item">Living Benefits</Link>
                    <Link href="/debt-free-wealth-strategy" className="elite-dropdown-item">Debt Elimination</Link>
                  </>
                )}
                <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.5rem 0" }}></div>
                <Link href="/service-areas" className="elite-dropdown-item" style={{ color: "var(--gold)", fontWeight: 700 }}>
                  {isSpanish ? "Ver Áreas de Servicio" : "View Service Areas"}
                </Link>
              </div>
            </div>

            <Link href={isSpanish ? "/es/mision" : "/mission"} className="elite-nav-link">{navText.mission}</Link>
            <Link href={isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby"} className="elite-nav-link">{navText.baby}</Link>
            <Link href={isSpanish ? "/es/seminarios" : "/workshops"} className="elite-nav-link">{navText.workshops}</Link>
            
            <Link href={getToggleUrl()} onClick={handleLanguageToggle} className="elite-lang-btn">
              {isSpanish ? "EN" : "ES"}
            </Link>

            <Link href={contactRoute} className="elite-cta-btn">
              {navText.book}
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button className="elite-hamburger" onClick={() => setIsOpen(true)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>

        </div>
      </nav>

      {/* ==================================================== */}
      {/* 2. PREMIUM MOBILE OVERLAY MENU                       */}
      {/* ==================================================== */}
      <div className={`elite-mobile-overlay ${isOpen ? "open" : ""}`}>
        
        <div className="elite-mobile-header">
          <Link href={base || "/"} className="elite-brand" onClick={closeMenu}>
            <img src="/android-chrome-192x192.png" alt="Legacy in Motion Logo" style={{ width: "45px", height: "45px", objectFit: "contain" }} />
          </Link>
          <button className="elite-hamburger" onClick={closeMenu}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="elite-mobile-content">
          <Link href={`${base}/`} className="elite-mobile-link" onClick={closeMenu}>{navText.home}</Link>
          
          {/* MOBILE ACCORDION */}
          <div>
            <button className="elite-mobile-accordion-btn" onClick={() => setIsServicesOpen(!isServicesOpen)}>
              {navText.services}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" style={{ transform: isServicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div className={`elite-mobile-accordion-content ${isServicesOpen ? "expanded" : ""}`}>
              <div className="elite-mobile-accordion-inner">
                {isSpanish ? (
                  <>
                    <Link href="/es/planificacion-de-jubilacion-los-angeles" className="elite-mobile-sublink" onClick={closeMenu}>Planificación de Jubilación</Link>
                    <Link href="/es/beneficios-en-vida-los-angeles" className="elite-mobile-sublink" onClick={closeMenu}>Seguros con Beneficios</Link>
                    <Link href="/es/estrategia-libre-de-deudas" className="elite-mobile-sublink" onClick={closeMenu}>Libre de Deudas</Link>
                    <Link href="/es/proteccion-de-hipoteca-los-angeles" className="elite-mobile-sublink" onClick={closeMenu}>Protección de Hipoteca</Link>
                    <Link href="/es/estrategias-financieras-para-negocios" className="elite-mobile-sublink" onClick={closeMenu}>Estrategias para Negocios</Link>
                  </>
                ) : (
                  <>
                    <Link href="/retirement-planning-pasadena" className="elite-mobile-sublink" onClick={closeMenu}>Retirement & Rollovers</Link>
                    <Link href="/estate-business-planning-los-angeles" className="elite-mobile-sublink" onClick={closeMenu}>Estate & Business</Link>
                    <Link href="/generational-wealth-arcadia-sgv" className="elite-mobile-sublink" onClick={closeMenu}>Generational Wealth</Link>
                    <Link href="/living-benefits-life-insurance-los-angeles" className="elite-mobile-sublink" onClick={closeMenu}>Living Benefits</Link>
                    <Link href="/debt-free-wealth-strategy" className="elite-mobile-sublink" onClick={closeMenu}>Debt Elimination</Link>
                  </>
                )}
                <Link href="/service-areas" className="elite-mobile-sublink" style={{ color: "var(--gold)", fontWeight: 700 }} onClick={closeMenu}>
                  {isSpanish ? "Ver Áreas de Servicio →" : "View Service Areas →"}
                </Link>
              </div>
            </div>
          </div>

          <Link href={isSpanish ? "/es/mision" : "/mission"} className="elite-mobile-link" onClick={closeMenu}>{navText.mission}</Link>
          <Link href={isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby"} className="elite-mobile-link" onClick={closeMenu}>{navText.baby}</Link>
          <Link href={isSpanish ? "/es/seminarios" : "/workshops"} className="elite-mobile-link" onClick={closeMenu}>{navText.workshops}</Link>
          
          <div className="elite-mobile-footer">
            <Link href={getToggleUrl()} onClick={handleLanguageToggle} className="elite-cta-btn" style={{ background: "transparent", border: "2px solid var(--gold)", color: "var(--gold)", textAlign: "center" }}>
              {isSpanish ? "SWITCH TO ENGLISH" : "CAMBIAR A ESPAÑOL"}
            </Link>
            <Link href={contactRoute} className="elite-cta-btn" style={{ textAlign: "center" }} onClick={closeMenu}>
              {navText.book}
            </Link>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. FLOATING ACTION MENU & iOS MODAL (Unchanged)      */}
      {/* ==================================================== */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9980, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? "none" : "auto", transition: "opacity 0.3s ease" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", opacity: isFabOpen ? 1 : 0, visibility: isFabOpen ? "visible" : "hidden", transform: isFabOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)", transformOrigin: "bottom right" }}>
          {showInstall && !isAppInstalled && (
            <button onClick={handleInstallClick} style={fabActionStyle}>
              <span style={fabLabelStyle}>{navText.installApp}</span>
              <div style={{...fabIconWrapperStyle, animation: "pulseGlow 2.5s infinite"}}>📱</div>
            </button>
          )}
          {isAppInstalled && (
            <Link href={toolboxRoute} onClick={() => setIsFabOpen(false)} style={fabActionStyle}>
              <span style={fabLabelStyle}>{navText.openToolbox}</span>
              <div style={{...fabIconWrapperStyle, animation: "pulseGlow 2.5s infinite", background: "var(--gold)", color: "#000", borderColor: "var(--gold)"}}>🧰</div>
            </Link>
          )}
          <Link href={contactRoute} onClick={() => setIsFabOpen(false)} style={fabActionStyle}>
            <span style={fabLabelStyle}>{navText.book}</span>
            <div style={fabIconWrapperStyle}>📞</div>
          </Link>
        </div>

        <button onClick={() => setIsFabOpen(!isFabOpen)} className="btn-pulse" style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "var(--gold)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)", transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)", transform: isFabOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>

      {showIOSModal && (
        <div onClick={() => setShowIOSModal(false)} style={{ position: "fixed", inset: 0, zIndex: 100000, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", padding: "1rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg-page)", padding: "2.5rem 1.5rem 4rem 1.5rem", borderRadius: "30px", width: "100%", maxWidth: "500px", margin: "0 auto", position: "relative", border: "1px solid var(--border-light)", boxShadow: "0 -20px 50px rgba(0,0,0,0.3)", animation: "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: "60px", height: "6px", background: "var(--border-light)", borderRadius: "10px", margin: "0 auto 1.5rem auto" }}></div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.5rem" }}>{iosModalText.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.5" }}>{iosModalText.subtitle}</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.2rem", padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px" }}>
              <div style={{ width: "45px", height: "45px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "1.3rem", flexShrink: 0 }}>1</div>
              <p style={{ fontSize: "1.1rem", color: "var(--text-main)", fontWeight: 500 }}>{iosModalText.step1} <svg style={{ display: "inline", verticalAlign: "middle", margin: "0 6px", color: "var(--gold)" }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg> {iosModalText.step1b}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "2.5rem", padding: "1.2rem", background: "var(--bg-card)", borderRadius: "16px" }}>
              <div style={{ width: "45px", height: "45px", background: "var(--gold)", color: "#000", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "1.3rem", flexShrink: 0 }}>2</div>
              <p style={{ fontSize: "1.1rem", color: "var(--text-main)", fontWeight: 500 }}>{iosModalText.step2} <strong>{iosModalText.step2b}</strong> <svg style={{ display: "inline", verticalAlign: "middle", marginLeft: "8px", color: "var(--text-main)" }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></p>
            </div>

            <button onClick={() => setShowIOSModal(false)} style={{ width: "100%", padding: "1rem", background: "transparent", color: "var(--gold)", fontWeight: "800", border: "none", borderRadius: "12px", fontSize: "1.1rem", cursor: "pointer", textDecoration: "underline" }}>{iosModalText.close}</button>

            <div style={{ position: "absolute", bottom: "-40px", left: "50%", marginLeft: "-25px", animation: "bounceDown 2s infinite" }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const fabActionStyle = { display: "flex", alignItems: "center", gap: "1rem", background: "transparent", border: "none", cursor: "pointer", textDecoration: "none", flexDirection: "row" };
const fabLabelStyle = { backgroundColor: "var(--bg-page)", color: "var(--text-main)", padding: "0.6rem 1.2rem", borderRadius: "12px", fontSize: "0.95rem", fontWeight: 700, boxShadow: "0 4px 15px rgba(0,0,0,0.1)", border: "1px solid var(--border-light)" };
const fabIconWrapperStyle = { width: "55px", height: "55px", borderRadius: "50%", backgroundColor: "var(--bg-page)", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };