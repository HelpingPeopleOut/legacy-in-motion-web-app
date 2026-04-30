"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  // App-Like Floating Action Button State
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Listen for the native "Add to Homescreen" (PWA) event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true); // Only show the install button if the device supports it
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Handle the actual installation
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
    setIsFabOpen(false);
  };

  const getToggleUrl = () => {
    if (isSpanish) {
      return pathname.replace(/^\/es/, "") || "/";
    } else {
      return `/es${pathname === "/" ? "" : pathname}`;
    }
  };

  const navText = {
    home: isSpanish ? "Inicio" : "Home",
    services: isSpanish ? "Servicios" : "Services",
    mission: isSpanish ? "Misión" : "Mission",
    baby: isSpanish ? "Futuro Financiero Infantil" : "Freedom Financial Baby",
    workshops: isSpanish ? "Seminarios" : "Workshops",
    book: isSpanish ? "Agendar Llamada" : "Book a Call",
  };

  const base = isSpanish ? "/es" : "";

  return (
    <>
      <nav style={{ position: "relative", zIndex: 999 }}>
        <div className="container nav-inner">
          <Link href={base || "/"} className="logo" onClick={closeMenu}>
            LEGACY IN MOTION
          </Link>
          
          <button
            className={`menu-toggle ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <Link href={`${base}/`} onClick={closeMenu}>{navText.home}</Link>
            
            {/* --- ENTERPRISE SERVICES DROPDOWN --- */}
            <div 
              className="nav-dropdown-container"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <span 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                style={{ fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}
              >
                {navText.services}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>

              {isServicesOpen && (
                <div 
                  className="dropdown-menu"
                  style={{
                    position: isOpen ? "relative" : "absolute",
                    top: isOpen ? "0" : "100%",
                    left: 0,
                    marginTop: isOpen ? "1rem" : "1.5rem",
                    backgroundColor: "var(--bg-page)",
                    boxShadow: isOpen ? "none" : "var(--shadow-md)",
                    border: isOpen ? "none" : "1px solid var(--border-light)",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "280px",
                    zIndex: 100,
                    overflow: "hidden"
                  }}
                >
                  {isSpanish ? (
                    <>
                      <Link href="/es/planificacion-de-jubilacion-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Planificación de Jubilación</Link>
                      <Link href="/es/beneficios-en-vida-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Seguros con Beneficios en Vida</Link>
                      <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.2rem 0" }}></div>
                      <Link href="/service-areas" onClick={closeMenu} style={{ ...dropdownItemStyle, color: "var(--gold)", fontWeight: 600 }}>Nuestras Áreas de Servicio</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/retirement-planning-pasadena" onClick={closeMenu} style={dropdownItemStyle}>Retirement & Rollovers</Link>
                      <Link href="/estate-business-planning-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Estate & Business Planning</Link>
                      <Link href="/generational-wealth-arcadia-sgv" onClick={closeMenu} style={dropdownItemStyle}>Generational Wealth</Link>
                      <Link href="/living-benefits-life-insurance-los-angeles" onClick={closeMenu} style={dropdownItemStyle}>Living Benefits & Protection</Link>
                      <div style={{ borderTop: "1px solid var(--border-light)", margin: "0.2rem 0" }}></div>
                      <Link href="/service-areas" onClick={closeMenu} style={{ ...dropdownItemStyle, color: "var(--gold)", fontWeight: 600 }}>View All Service Areas</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* --- UPDATED SPANISH ROUTING --- */}
            <Link href={isSpanish ? "/es/mision" : "/mission"} onClick={closeMenu}>{navText.mission}</Link>
            <Link href={isSpanish ? "/es/futuro-financiero-infantil" : "/freedom-financial-baby"} onClick={closeMenu}>{navText.baby}</Link>
            <Link href={isSpanish ? "/es/seminarios" : "/workshops"} onClick={closeMenu}>{navText.workshops}</Link>
            
            <Link
              href={getToggleUrl()}
              onClick={closeMenu}
              style={{
                fontWeight: 600, color: "var(--gold)", margin: "0 0.5rem",
                border: "1px solid var(--gold)", padding: "0.2rem 0.6rem",
                borderRadius: "4px", fontSize: "0.9rem"
              }}
            >
              {isSpanish ? "EN" : "ES"}
            </Link>

            <Link href={`${base}/request-callback`} className="btn-gold" style={{ padding: "0.5rem 1.5rem" }} onClick={closeMenu}>
              {navText.book}
            </Link>
          </div>
        </div>
      </nav>

      {/* ==================================================== */}
      {/* FLOATING ACTION MENU (APP-LIKE EXPERIENCE)           */}
      {/* ==================================================== */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
        
        {/* Expanded Options */}
        <div style={{
          display: "flex", flexDirection: "column", gap: "0.5rem",
          opacity: isFabOpen ? 1 : 0, visibility: isFabOpen ? "visible" : "hidden",
          transform: isFabOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          transition: "var(--transition)", transformOrigin: "bottom right"
        }}>
          {showInstall && (
            <button onClick={handleInstallClick} style={fabActionStyle}>
              <span style={fabLabelStyle}>{isSpanish ? "Instalar App" : "Install App"}</span>
              <div style={fabIconWrapperStyle}>📱</div>
            </button>
          )}
          
          <Link href={`${base}/request-callback`} onClick={() => setIsFabOpen(false)} style={fabActionStyle}>
            <span style={fabLabelStyle}>{isSpanish ? "Solicitar Llamada" : "Request Callback"}</span>
            <div style={fabIconWrapperStyle}>📞</div>
          </Link>
        </div>

        {/* Main Floating Toggle Button */}
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
    </>
  );
}

// Inline Styles
const dropdownItemStyle = {
  padding: "1rem 1.5rem", color: "var(--text-main)", fontSize: "0.95rem",
  transition: "background 0.2s", display: "block", textDecoration: "none"
};

const fabActionStyle = {
  display: "flex", alignItems: "center", gap: "1rem", background: "transparent",
  border: "none", cursor: "pointer", textDecoration: "none", flexDirection: "row"
};

const fabLabelStyle = {
  backgroundColor: "var(--bg-page)", color: "var(--text-main)", padding: "0.5rem 1rem",
  borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600,
  boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-light)"
};

const fabIconWrapperStyle = {
  width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-light)", display: "flex", alignItems: "center",
  justifyContent: "center", fontSize: "1.2rem", boxShadow: "var(--shadow-sm)"
};