"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Grab the current URL path so we know what page they are on
  const pathname = usePathname() || "/";

  // Check if we are currently inside the Spanish (/es) version of the site
  const isSpanish = pathname.startsWith("/es");

  // Close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

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
    steps: isSpanish ? "Los 7 Pasos" : "The 7-Steps",
    mission: isSpanish ? "Misión" : "Mission",
    baby: "Freedom Financial Baby", // Proper brand name, usually stays English
    workshops: isSpanish ? "Talleres" : "Workshops",
    book: isSpanish ? "Agendar Llamada" : "Book a Call",
  };

  // Base path for links so they stay within their current language
  const base = isSpanish ? "/es" : "";

  return (
    <nav>
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
          <Link href={`${base}/#framework`} onClick={closeMenu}>{navText.steps}</Link>
          <Link href={`${base}/mission`} onClick={closeMenu}>{navText.mission}</Link>
          <Link href={`${base}/freedom-financial-baby`} onClick={closeMenu}>{navText.baby}</Link>
          <Link href={`${base}/workshops`} onClick={closeMenu}>{navText.workshops}</Link>
          
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
            href={`${base}/#contact`}
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