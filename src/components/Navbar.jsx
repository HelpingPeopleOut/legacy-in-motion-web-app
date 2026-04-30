"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  // Grab the current URL path so we know what page they are on
  const pathname = usePathname() || "/";

  // Check if we are currently inside the Spanish (/es) version of the site
  const isSpanish = pathname.startsWith("/es");

  // Close menus when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Generate the URL for the opposite language toggle
  const getToggleUrl = () => {
    if (isSpanish) {
      // Switch to English: Remove '/es' from the beginning of the path
      return pathname.replace(/^\/es/, "") || "/";
    } else {
      // Switch to Spanish: Add '/es' to the beginning of the path
      return `/es${pathname === "/" ? "" : pathname}`;
    }
  };

  // Define translations for the navbar links automatically based on language
  const navText = {
    home: isSpanish ? "Inicio" : "Home",
    services: isSpanish ? "Servicios" : "Services",
    mission: isSpanish ? "Misión" : "Mission",
    baby: "Freedom Financial Baby", // Brand name usually stays English
    workshops: isSpanish ? "Seminarios" : "Workshops", // <-- UPDATED TO SEMINARIOS
    book: isSpanish ? "Agendar Llamada" : "Book a Call",
  };

  // Base path for links so they stay within their current language
  const base = isSpanish ? "/es" : "";

  return (
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

            {/* Dropdown Menu (Switches based on language automatically) */}
            {isServicesOpen && (
              <div 
                className="dropdown-menu"
                style={{
                  position: isOpen ? "relative" : "absolute", // Adapts for mobile vs desktop
                  top: isOpen ? "0" : "100%",
                  left: 0,
                  marginTop: isOpen ? "1rem" : "1.5rem",
                  backgroundColor: "var(--bg-page)",
                  boxShadow: isOpen ? "none" : "var(--shadow-md)",
                  border: isOpen ? "none" : "1px solid var(--border-light)",
                  borderRadius: "8px",
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
          {/* -------------------------------------- */}

          {/* --- BILINGUAL EXACT MATCH ROUTES --- */}
          <Link href={isSpanish ? "/es/mision" : "/mission"} onClick={closeMenu}>{navText.mission}</Link>
          <Link href={isSpanish ? "/es/freedom-financial-baby" : "/freedom-financial-baby"} onClick={closeMenu}>{navText.baby}</Link>
          <Link href={isSpanish ? "/es/seminarios" : "/workshops"} onClick={closeMenu}>{navText.workshops}</Link>
          
          {/* --- LANGUAGE TOGGLE BUTTON --- */}
          <Link
            href={getToggleUrl()}
            onClick={closeMenu}
            style={{
              fontWeight: 600,
              color: "var(--gold)",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              border: "1px solid var(--gold)",
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              fontSize: "0.9rem"
            }}
          >
            {isSpanish ? "EN" : "ES"}
          </Link>

          <Link
            href={`${base}/#consultation`}
            className="btn-gold"
            style={{ padding: "0.5rem 1.5rem" }}
            onClick={closeMenu}
          >
            {navText.book}
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Inline styling for dropdown links so it works perfectly without modifying your globals.css
const dropdownItemStyle = {
  padding: "1rem 1.5rem",
  color: "var(--text-main)",
  fontSize: "0.95rem",
  transition: "background 0.2s",
  display: "block",
  textDecoration: "none"
};