"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav>
      <div className="container nav-inner">
        <Link href="/" className="logo" onClick={closeMenu}>
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
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/#framework" onClick={closeMenu}>The 7-Steps</Link>
          <Link href="/mission" onClick={closeMenu}>Mission</Link>
          <Link href="/freedom-financial-baby" onClick={closeMenu}>Freedom Financial Baby</Link>
          <Link href="/workshops" onClick={closeMenu}>Workshops</Link>
          <Link
            href="/#contact"
            className="btn-gold"
            style={{ padding: "0.5rem 1.5rem" }}
            onClick={closeMenu}
          >
            Book a Call
          </Link>
        </div>
      </div>
    </nav>
  );
}