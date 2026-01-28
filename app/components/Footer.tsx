import React from "react";
import "../globals.css";
import { getAssetPath } from "../utils/paths";


export default function Footer() {
  const [showBar, setShowBar] = React.useState(false);
  return (
    <>
      <div
  className={`site-footer-bar${showBar ? " site-footer-bar-visible" : ""}`}
        onMouseEnter={() => setShowBar(true)}
        onMouseLeave={() => setShowBar(false)}
      >
            <a href="https://www.worldbank.org/en/about/legal" target="_blank" rel="noopener noreferrer" className="site-footer-link" style={{ marginLeft: "200px" }}>Legal</a>
  <span className="site-footer-divider">|</span>
  <a href="https://www.worldbank.org/en/who-we-are/site-accessibility" target="_blank" rel="noopener noreferrer" className="site-footer-link">Site Accessibility</a>
  <span className="site-footer-divider">|</span>
  <a href="https://www.worldbank.org/en/access-to-information" target="_blank" rel="noopener noreferrer" className="site-footer-link">Access to Information</a>
  <span className="site-footer-divider">|</span>
  <a href="https://www.worldbank.org/en/about/careers" target="_blank" rel="noopener noreferrer" className="site-footer-link">Career</a>
  <span className="site-footer-divider">|</span>
  <a href="https://www.worldbank.org/en/about/contacts" target="_blank" rel="noopener noreferrer" className="site-footer-link">Contacts</a>
        <div style={{ flex: 1 }} />
  <a href="https://wbgcmsprod.microsoftcrmportals.com/en-US/anonymous-users/int-fraud-management/create-new-complaint/" target="_blank" rel="noopener noreferrer" className="site-footer-link site-footer-report">REPORT FRAUD OR CORRUPTION</a>
      </div>
      <footer
  className="site-footer"
        onMouseEnter={() => setShowBar(true)}
        onMouseLeave={() => setShowBar(false)}
      >
  <div className="site-footer-logo">
          <img src={getAssetPath("/img/wbg-logo.svg")} alt="World Bank Group Logo" width="120" height="40" className="site-footer-img" />
          <span className="site-footer-agencies">
            <a href="https://www.worldbank.org/en/who-we-are/ibrd" target="_blank" rel="noopener noreferrer" className="site-footer-link footer-agencies">IBRD</a>&nbsp;&nbsp;&nbsp;
            <a href="https://ida.worldbank.org/" target="_blank" rel="noopener noreferrer" className="site-footer-link footer-agencies">IDA</a>&nbsp;&nbsp;&nbsp;
            <a href="https://www.ifc.org/" target="_blank" rel="noopener noreferrer" className="site-footer-link footer-agencies">IFC</a>&nbsp;&nbsp;&nbsp;
            <a href="https://www.miga.org/" target="_blank" rel="noopener noreferrer" className="site-footer-link footer-agencies">MIGA</a>&nbsp;&nbsp;&nbsp;
            <a href="https://icsid.worldbank.org/" target="_blank" rel="noopener noreferrer" className="site-footer-link footer-agencies">ICSID</a>
          </span>
        </div>
  <span className="site-footer-copyright">&copy; {new Date().getFullYear()} World Bank Group, All Rights Reserved</span>
      </footer>
    </>
  );
}
