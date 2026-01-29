import React, { useState } from "react";
import "../globals.css";
import Link from "next/link";
import { getAssetPath } from "../utils/paths";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
  <header className="site-header">
  <Link href="/" className="site-header-logo">
  <img src={getAssetPath("/img/wbg-logo.svg")} alt="World Bank White Logo" width="160" height="32" style={{ width: "160px", height: "auto", minHeight: "32px", display: "inline-block" }} />
  <span className="site-header-divider"></span>
  <h1 className="site-header-title">Open Source</h1>
      </Link>
  <div className="site-header-nav site-header-nav-desktop">
  <Link href="/catalog" className="site-header-link">CODE CATALOG</Link>
  <a href="https://github.com/worldbank" target="_blank" rel="noopener noreferrer" className="site-header-link">WB GITHUB</a>
  <a href="mailto:github@worldbank.org" className="site-header-link">CONTACT US</a>
      </div>
      <button
  className="site-header-hamburger"
        aria-label="Open menu"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer"
        }}
      >
        &#9776;
      </button>
      {menuOpen && (
  <div className="site-header-menu">
          <Link href="/catalog" className="site-header-link">CODE CATALOG</Link>
          <a href="https://github.com/worldbank" className="site-header-link">WB GITHUB</a>
          <a href="mailto:github@worldbank.org" className="site-header-link">CONTACT US</a>
        </div>
      )}
    </header>
  );
}
