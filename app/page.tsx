"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";
import { byNewestInCatalog, useRepos } from "./utils/repos";

export default function HomePage() {
  const { repos } = useRepos();
  const recentProjects = repos
    .filter(repo => repo.catalogAddedDate && repo.html_url)
    .sort(byNewestInCatalog)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "World Bank",
    "url": "https://opensource.worldbank.org",
    "description": "World Bank open source projects, data, and research supporting sustainable development",
    "sameAs": [
      "https://github.com/worldbank",
      "https://www.worldbank.org",
      "https://data.worldbank.org",
      "https://openknowledge.worldbank.org"
    ]
  };

return (
  <div className="new-page-root" style={{ background: '#e3ecf5ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
    <Header />
    {/* Hero Section with image to the right, full-bleed background */}
    <div style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: '#fff', boxShadow: '0 2px 16px 0 rgba(21,53,63,0.06)' }}>
      <section className="homepage-hero-section" aria-label="Hero section">
        {/* Hero text left */}
        <div className="homepage-hero-text">
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, color: '#15353F', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
            World Bank and Open Source
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: '#616566ff', fontWeight: 400, lineHeight: 1.5, maxWidth: '1200px', marginBottom: 0 }}>
            At the World Bank, we strive to cultivate open source development by building communities for support, maintenance and enhancement in addition to sharing knowledge and expertise in alignment with the Sustainable Development Goals.
            <br /><br />
            As a global knowledge bank, we champion transparency and collaboration by making high-quality information and open source tools accessible to all. Utilize our open data, software and research to drive evidence-based solutions and advance sustainable development worldwide.
          </p>
        </div>
        {/* Hero image right */}
        <div className="homepage-hero-image">
            <img
              src="/img/code4.png"
              alt="World Bank open source software development and collaboration"
              width="600"
              height="600"
              fetchPriority="high"
              style={{
                maxHeight: '600px',
                width: '90%',
                objectFit: 'contain',
                objectPosition: 'right',
                display: 'block',
                borderRadius: 18
              }}
            />
        </div>
      </section>
    </div>
    {/* Main content area with margin */}
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Two boxed areas side-by-side */}
      <section className="homepage-boxes-section" aria-label="Quick access to catalog and GitHub">
        {/* Software Catalog Box */}
        <article className="homepage-box">
          {/* Catalog image flush left */}
          <div className="homepage-box-image">
            <img src="/img/catalog.jpg" alt="Browse World Bank open source code catalog" width="200" height="260" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          {/* Catalog info */}
          <div className="homepage-box-content">
            <h3 className="homepage-box-title">Open Source Code Catalog</h3>
            <p className="homepage-box-text">
              Browse our open source code, filter by topic, language, and popularity, and find tools for you to use or contribute.
            </p>
            <Link href="/catalog" className="homepage-btn">
              Browse the Catalog &rarr;
            </Link>
          </div>
        </article>
        {/* GitHub Organization Box */}
        <article className="homepage-box">
          {/* GitHub image flush left */}
          <div className="homepage-box-image" style={{ background: '#24292f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/img/github.svg" alt="GitHub logo - World Bank organization" width="180" height="180" loading="lazy" style={{ display: 'block' }} />
          </div>
          {/* GitHub info */}
          <div className="homepage-box-content">
            <h3 className="homepage-box-title">GitHub Organization</h3>
            <p className="homepage-box-text">
              See all World Bank open source repositories, contribute, and join our developer community on GitHub.
            </p>
            <a href="https://github.com/worldbank" target="_blank" rel="noopener noreferrer" className="homepage-btn">
              Go to GitHub &rarr;
            </a>
          </div>
        </article>
      </section>
    </main>
    {/* Two-column section: Other Resources & Newest Additions (full-bleed) */}
    <div style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: '#fff', boxShadow: '0 2px 16px 0 rgba(21,53,63,0.06)' }}>
      <section className="homepage-resources-section" aria-label="New additions and related resources">
  <div style={{ flex: 1.25, padding: '2.2rem 2rem 2.2rem 2rem', minHeight: 220, display: 'flex', flexDirection: 'column', background: '#f5f6f8', borderRadius: 10, boxShadow: '0 1px 8px rgba(25,118,210,0.07)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#15353F', marginBottom: '0.3rem', letterSpacing: '-0.5px' }}>Newest Additions to the Catalog</h3>
          <div style={{ width: '100%', height: 3, background: 'linear-gradient(90deg, #1976d2 20%, #f5f6f8 100%)', borderRadius: 2, marginBottom: '1.7rem' }} />
          <ul style={{ paddingLeft: '0.5rem', color: '#616566', fontSize: '1rem' }}>
            {recentProjects.length === 0 ? (
              <li>Loading...</li>
            ) : (
              recentProjects.map((repo) => (
                <li key={repo.name} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src="/img/code-solid-full.svg" alt="Repository icon" width="20" height="20" loading="lazy" style={{ display: 'inline-block', verticalAlign: 'middle', opacity: 0.8 }} />
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 400, fontSize: '1.1rem' }}><b>{repo.name}</b></a>
                  </div>
                  <div style={{ color: '#616566', fontSize: '0.98rem', margin: '0.25rem 0 0.25rem 0' }}>
                    {repo.description ? repo.description : 'No description provided.'}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.95rem' }}>
                    Published: {repo.catalogAddedDate ? new Date(repo.catalogAddedDate).toLocaleDateString() : 'Unknown'}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
  <div style={{ flex: 0.75, padding: '2rem 1rem', minHeight: 220, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#15353F', marginBottom: '1rem' }}>Related Resources</h3>
          <ul style={{ paddingLeft: '0.5rem', color: '#616566', fontSize: '1rem' }}>
            <li>
              <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: '#1976d2', textDecoration: 'underline' }}>World Bank Open Data</a>
              <div style={{ color: '#616566', fontSize: '0.97rem', margin: '0.2rem 0 0.7rem 0' }}>
                The World Bank’s open data portal provides free and open access to global development data, much of which is available under open licenses for reuse and analysis.
              </div>
            </li>
            <li>
              <a href="https://openknowledge.worldbank.org/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: '#1976d2', textDecoration: 'underline' }}>Open Knowledge Repository</a>
              <div style={{ color: '#616566', fontSize: '0.97rem', margin: '0.2rem 0 0.7rem 0' }}>
                The World Bank’s open access repository for research, publications, and datasets. Most content is released under Creative Commons licenses, supporting open knowledge and reuse.
              </div>
            </li>
            <li>
              <a href="https://reproducibility.worldbank.org/home" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: '#1976d2', textDecoration: 'underline' }}>Reproducible Research Repository</a>
              <div style={{ color: '#616566', fontSize: '0.97rem', margin: '0.2rem 0 0.7rem 0' }}>
                The Reproducible Research Repository is a one-stop shop for reproducibility packages associated with World Bank research. The catalogued packages provide the analytical scripts, documentation, and, where possible, the data needed to reproduce the results in the associated paper.
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <Footer />
  </div>
);
}