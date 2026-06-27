"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navbar.css";

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsFabOpen(false);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const getToggleUrl = () => {
    let targetPath = "/";
    if (isSpanish) {
      targetPath = pathname.replace(/^\/es/, "") || "/";
    } else {
      targetPath = `/es${pathname === "/" ? "" : pathname}`;
    }
    return targetPath.replace(/\/+/g, "/");
  };

  // --- BILINGUAL TEXT ---
  const navText = {
    home: isSpanish ? "Inicio" : "Home",
    services: isSpanish ? "Servicios" : "Services",
    mission: isSpanish ? "Misión" : "Mission",
    baby: isSpanish ? "Futuro Infantil" : "Freedom Baby", 
    workshops: isSpanish ? "Seminarios" : "Workshops",
    book: isSpanish ? "Agendar Consulta" : "Request Consultation",
    quickLinks: isSpanish ? "Enlaces" : "Quick Links",
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
  const quickLinksRoute = isSpanish ? "/es/links" : "/links";
  const toolboxRoute = isSpanish ? "/es/herramientas" : "/toolbox";
  const homeRoute = base || "/";

  const isActive = (href) => {
    if (href === "/" || href === "/es" || href === homeRoute) {
      return pathname === href || pathname === homeRoute;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href, extra = "") =>
    `elite-nav-link${isActive(href) ? " active" : ""}${extra ? ` ${extra}` : ""}`;

  const mobileLinkClass = (href, extra = "") =>
    `elite-mobile-link${isActive(href) ? " active" : ""}${extra ? ` ${extra}` : ""}`;

  const serviceLinks = isSpanish
    ? [
        { href: "/es/planificacion-de-jubilacion-los-angeles", label: "Planificación de Jubilación" },
        { href: "/es/beneficios-en-vida-los-angeles", label: "Seguros con Beneficios en Vida" },
        { href: "/es/estrategia-libre-de-deudas", label: "Estrategia Libre de Deudas" },
        { href: "/es/proteccion-de-hipoteca-los-angeles", label: "Protección de Hipoteca" },
        { href: "/es/estrategias-financieras-para-negocios", label: "Estrategias para Negocios" },
      ]
    : [
        { href: "/retirement-planning-pasadena", label: "Retirement & Rollovers" },
        { href: "/estate-business-planning-los-angeles", label: "Estate & Business Planning" },
        { href: "/generational-wealth-arcadia-sgv", label: "Generational Wealth" },
        { href: "/living-benefits-life-insurance-los-angeles", label: "Living Benefits" },
        { href: "/debt-free-wealth-strategy", label: "Debt Elimination" },
      ];

  const locationLinks = isSpanish
    ? [
        { href: "/es/locations/california/pasadena", label: "Pasadena, CA" },
        { href: "/es/locations/california/los-angeles", label: "Los Ángeles, CA" },
        { href: "/es/locations", label: "Todas las Ubicaciones" },
      ]
    : [
        { href: "/locations/california/pasadena", label: "Pasadena, CA" },
        { href: "/locations/california/los-angeles", label: "Los Angeles, CA" },
        { href: "/locations", label: "All US Locations" },
      ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); } 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); } }
      `}} />

      <nav className={`elite-nav-container ${scrolled ? "scrolled" : ""}`}>
        <div className="elite-nav-inner">
          <Link href={homeRoute} className="elite-brand" onClick={closeMenu}>
            <img src="/android-chrome-192x192.png" alt="Legacy in Motion Logo" />
            <span className="elite-brand-text">LEGACY IN MOTION</span>
          </Link>

          <div className="elite-desktop-menu">
            <div className="elite-nav-links">
              <Link href={homeRoute} className={linkClass(homeRoute)}>{navText.home}</Link>

              <div className="elite-dropdown-wrapper">
                <button type="button" className="elite-dropdown-trigger" aria-haspopup="true">
                  {navText.services}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                <div className="elite-dropdown-panel">
                  {serviceLinks.map((item) => (
                    <Link key={item.href} href={item.href} className="elite-dropdown-item">{item.label}</Link>
                  ))}
                  {locationLinks.length > 0 && (
                    <>
                      <div className="elite-dropdown-divider" />
                      {locationLinks.map((item) => (
                        <Link key={item.href} href={item.href} className="elite-dropdown-item">{item.label}</Link>
                      ))}
                    </>
                  )}
                  <div className="elite-dropdown-divider" />
                  <Link href="/service-areas" className="elite-dropdown-item highlight">
                    {isSpanish ? "Ver Áreas de Servicio" : "View Service Areas"}
                  </Link>
                </div>
              </div>

              <Link href={isSpanish ? "/es/mision" : "/mission"} className={linkClass(isSpanish ? "/es/mision" : "/mission")}>{navText.mission}</Link>
              <Link href={isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby"} className={linkClass(isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby")}>{navText.baby}</Link>
              <Link href={isSpanish ? "/es/seminarios" : "/workshops"} className={linkClass(isSpanish ? "/es/seminarios" : "/workshops")}>{navText.workshops}</Link>
              <Link href={quickLinksRoute} className={linkClass(quickLinksRoute, "highlight-link")}>{navText.quickLinks}</Link>
              <Link href="/dashboard" className={linkClass("/dashboard", "portal")}>
                {isSpanish ? "Portal Cliente" : "Client Portal"}
              </Link>
            </div>

            <div className="elite-nav-actions">
              <Link href={getToggleUrl()} onClick={closeMenu} className="elite-lang-btn">
                {isSpanish ? "EN" : "ES"}
              </Link>
              <Link href={contactRoute} className="elite-cta-btn">{navText.book}</Link>
            </div>
          </div>

          <button type="button" className="elite-hamburger" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" aria-hidden><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </nav>

      <div className={`elite-mobile-overlay ${isOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="elite-mobile-header">
          <Link href={homeRoute} className="elite-brand" onClick={closeMenu}>
            <img src="/android-chrome-192x192.png" alt="Legacy in Motion Logo" />
            <span className="elite-brand-text">LEGACY IN MOTION</span>
          </Link>
          <button type="button" className="elite-hamburger" onClick={closeMenu} aria-label="Close menu">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" aria-hidden><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="elite-mobile-scroll">
          <div className="elite-mobile-section">
            <p className="elite-mobile-section-label">{isSpanish ? "Navegar" : "Navigate"}</p>
            <div className="elite-mobile-links">
              <Link href={homeRoute} className={mobileLinkClass(homeRoute)} onClick={closeMenu}>{navText.home}</Link>
              <Link href={isSpanish ? "/es/mision" : "/mission"} className={mobileLinkClass(isSpanish ? "/es/mision" : "/mission")} onClick={closeMenu}>{navText.mission}</Link>
              <Link href={isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby"} className={mobileLinkClass(isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby")} onClick={closeMenu}>{navText.baby}</Link>
              <Link href={isSpanish ? "/es/seminarios" : "/workshops"} className={mobileLinkClass(isSpanish ? "/es/seminarios" : "/workshops")} onClick={closeMenu}>{navText.workshops}</Link>
              <Link href={quickLinksRoute} className={mobileLinkClass(quickLinksRoute, "highlight")} onClick={closeMenu}>{navText.quickLinks}</Link>
              <Link href="/dashboard" className={mobileLinkClass("/dashboard", "portal")} onClick={closeMenu}>
                {isSpanish ? "Portal Cliente" : "Client Portal"}
              </Link>
            </div>
          </div>

          <div className="elite-mobile-section">
            <p className="elite-mobile-section-label">{navText.services}</p>
            <button
              type="button"
              className={`elite-mobile-accordion-btn${isServicesOpen ? " open" : ""}`}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              aria-expanded={isServicesOpen}
            >
              {isSpanish ? "Ver todos los servicios" : "Browse all services"}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3" style={{ transform: isServicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.25s" }} aria-hidden><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            <div className="elite-mobile-accordion-wrapper" style={{ maxHeight: isServicesOpen ? "520px" : "0" }}>
              <div className="elite-mobile-accordion-inner">
                {serviceLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="elite-mobile-sublink" onClick={closeMenu}>{item.label}</Link>
                ))}
                {locationLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="elite-mobile-sublink highlight" onClick={closeMenu}>{item.label}</Link>
                ))}
                <Link href="/service-areas" className="elite-mobile-sublink highlight" onClick={closeMenu}>
                  {isSpanish ? "Ver Áreas de Servicio →" : "View Service Areas →"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="elite-mobile-footer">
          <Link href={getToggleUrl()} onClick={closeMenu} className="elite-lang-btn">
            {isSpanish ? "Switch to English" : "Cambiar a Español"}
          </Link>
          <Link href={contactRoute} className="elite-cta-btn" onClick={closeMenu}>{navText.book}</Link>
        </div>
      </div>

      {/* Sticky mobile consultation CTA */}
      <div className={`mobile-sticky-cta${isOpen ? " hidden" : ""}`} aria-hidden={isOpen}>
        <a href="tel:6262037652" className="mobile-sticky-cta__call">
          {isSpanish ? "Llamar" : "Call"}
        </a>
        <Link href={quickLinksRoute} className="mobile-sticky-cta__links">
          {isSpanish ? "Enlaces" : "Links"}
        </Link>
        <Link href={contactRoute} className="mobile-sticky-cta__book">
          {navText.book}
        </Link>
      </div>

      {/* Floating action menu */}
      <div
        className={`nav-fab-container${isOpen ? " nav-fab-container--hidden" : ""}`}
        style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9980, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", transition: "opacity 0.3s ease" }}
      >
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
          <Link href={quickLinksRoute} onClick={() => setIsFabOpen(false)} style={fabActionStyle}>
            <span style={fabLabelStyle}>{navText.quickLinks}</span>
            <div style={fabIconWrapperStyle}>🔗</div>
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
          </div>
        </div>
      )}
    </>
  );
}

const fabActionStyle = { display: "flex", alignItems: "center", gap: "1rem", background: "transparent", border: "none", cursor: "pointer", textDecoration: "none", flexDirection: "row" };
const fabLabelStyle = { backgroundColor: "var(--bg-page)", color: "var(--text-main)", padding: "0.6rem 1.2rem", borderRadius: "12px", fontSize: "0.95rem", fontWeight: 700, boxShadow: "0 4px 15px rgba(0,0,0,0.1)", border: "1px solid var(--border-light)" };
const fabIconWrapperStyle = { width: "55px", height: "55px", borderRadius: "50%", backgroundColor: "var(--bg-page)", border: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };