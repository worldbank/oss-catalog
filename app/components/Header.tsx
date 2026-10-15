"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL } from "../utils/constants";

const MOBILE_MENU_ID = "site-mobile-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link href="/" className="site-header-logo">
        <img src="/img/wbg-logo.svg" alt="World Bank White Logo" width="160" height="32" style={{ width: "160px", height: "auto", minHeight: "32px", display: "inline-block" }} />
        <span className="site-header-divider"></span>
        <span className="site-header-title">Open Source</span>
      </Link>
      <nav className="site-header-nav site-header-nav-desktop" aria-label="Main">
        <Link href="/about" className="site-header-link">ABOUT</Link>
        <Link href="/catalog" className="site-header-link">CODE CATALOG</Link>
        <a href="https://github.com/worldbank" target="_blank" rel="noopener noreferrer" className="site-header-link">WB GITHUB</a>
        <a href={`mailto:${CONTACT_EMAIL}`} className="site-header-link">CONTACT US</a>
      </nav>
      <button
        type="button"
        className="site-header-hamburger"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls={MOBILE_MENU_ID}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
      {menuOpen && (
        <nav id={MOBILE_MENU_ID} className="site-header-menu" aria-label="Main">
          <Link href="/about" className="site-header-link" onClick={closeMenu}>ABOUT</Link>
          <Link href="/catalog" className="site-header-link" onClick={closeMenu}>CODE CATALOG</Link>
          <a href="https://github.com/worldbank" target="_blank" rel="noopener noreferrer" className="site-header-link" onClick={closeMenu}>WB GITHUB</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="site-header-link" onClick={closeMenu}>CONTACT US</a>
        </nav>
      )}
    </header>
  );
}
