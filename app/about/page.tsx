"use client";

import { type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CONTACT_EMAIL } from "../utils/constants";
import { getLanguages, getTopics, useRepos } from "../utils/repos";

interface StatIcon {
  viewBox: string;
  d: string;
}

// Font Awesome Free 7.3.1 solid icons (CC BY 4.0) - https://fontawesome.com/license/free
const STAT_ICONS: Record<"folder" | "code" | "tags" | "star" | "fork", StatIcon> = {
  folder: {
    viewBox: "0 0 576 512",
    d: "M56 225.6L32.4 296.2 32.4 96c0-35.3 28.7-64 64-64l138.7 0c13.8 0 27.3 4.5 38.4 12.8l38.4 28.8c5.5 4.2 12.3 6.4 19.2 6.4l117.3 0c35.3 0 64 28.7 64 64l0 16-365.4 0c-41.3 0-78 26.4-91.1 65.6zM477.8 448L99 448c-32.8 0-55.9-32.1-45.5-63.2l48-144C108 221.2 126.4 208 147 208l378.8 0c32.8 0 55.9 32.1 45.5 63.2l-48 144c-6.5 19.6-24.9 32.8-45.5 32.8z",
  },
  code: {
    viewBox: "0 0 576 512",
    d: "M360.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm64.6 136.1c-12.5 12.5-12.5 32.8 0 45.3l73.4 73.4-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0zm-274.7 0c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 150.6 182.6c12.5-12.5 12.5-32.8 0-45.3z",
  },
  tags: {
    viewBox: "0 0 576 512",
    d: "M401.2 39.1L549.4 189.4c27.7 28.1 27.7 73.1 0 101.2L393 448.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L515.3 256.8c9.2-9.3 9.2-24.4 0-33.7L367 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM32.1 229.5L32.1 96c0-35.3 28.7-64 64-64l133.5 0c17 0 33.3 6.7 45.3 18.7l144 144c25 25 25 65.5 0 90.5L285.4 418.7c-25 25-65.5 25-90.5 0l-144-144c-12-12-18.7-28.3-18.7-45.3zm144-85.5a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z",
  },
  star: {
    viewBox: "0 0 576 512",
    d: "M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z",
  },
  fork: {
    viewBox: "0 0 448 512",
    d: "M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3l0 22.7c0 26.5 21.5 48 48 48l128 0c26.5 0 48-21.5 48-48l0-22.7c-28.3-12.3-48-40.5-48-73.3 0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 22.7c0 61.9-50.1 112-112 112l-32 0 0 70.7c28.3 12.3 48 40.5 48 73.3 0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3l0-70.7-32 0C98.1 288 48 237.9 48 176l0-22.7C19.7 141 0 112.8 0 80 0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM248 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z",
  },
};

// Copy pending OSPO, Legal, and Communications review; keep verbatim.
const functions: { title: string; text: ReactNode }[] = [
  {
    title: "Governance and licensing",
    text: "We maintain the framework that guides how World Bank teams create and share open source software, including an approach to license compliance.",
  },
  {
    title: "Advice and support",
    text: "We advise teams on open source practices and work with colleagues to prepare projects for public release.",
  },
  {
    title: "Open source platform",
    text: "We oversee the World Bank's GitHub organization and its repository standards.",
  },
  {
    title: "Training and community",
    text: "We offer training and guidance to World Bank open source developers and help build an open source culture across the institution.",
  },
  {
    title: "External collaboration",
    text: (
      <>
        We are members of{" "}
        <a href="https://opensource.un.org/en" target="_blank" rel="noopener noreferrer">Open Source United</a>{" "}
        with the United Nations, and collaborate with international financial institutions and other open source communities.
      </>
    ),
  },
  {
    title: "Open Source Code Catalog",
    text: (
      <>
        We maintain a <Link href="/catalog">curated, searchable directory</Link> of World Bank open source projects.
      </>
    ),
  },
];

export default function AboutPage() {
  const { repos, loading, error: statsError } = useRepos();
  const value = (n: number) => (loading ? undefined : n);

  const statItems: { label: string; value: number | undefined; icon: StatIcon; color: string }[] = [
    { label: "Projects", value: value(repos.length), icon: STAT_ICONS.folder, color: "#1976d2" },
    { label: "Languages", value: value(getLanguages(repos).length), icon: STAT_ICONS.code, color: "#00838f" },
    { label: "Topics", value: value(getTopics(repos).length), icon: STAT_ICONS.tags, color: "#6a1b9a" },
    { label: "Stars", value: value(repos.reduce((sum, r) => sum + r.stargazers_count, 0)), icon: STAT_ICONS.star, color: "#b7791f" },
    { label: "Forks", value: value(repos.reduce((sum, r) => sum + r.forks_count, 0)), icon: STAT_ICONS.fork, color: "#2e7d32" },
  ];

  return (
    <div className="about-root">
      <Header />
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <h1 id="about-title" className="about-hero-title">About the World Bank Open Source Program Office</h1>
            <p className="about-hero-lead">
              The World Bank Open Source Program Office (OSPO) strives to cultivate open source development by building communities for support, maintenance, and enhancement, and by sharing knowledge and expertise in alignment with the Sustainable Development Goals.
            </p>
          </div>
          <div className="about-hero-logo">
            <img
              src="/img/logo.png"
              alt="World Bank Open Source Program Office (OSPO) logo"
              width="1600"
              height="400"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <main className="about-main">
        <section className="about-content" aria-labelledby="about-what-title">
          <div className="about-intro-row">
            <div>
              <h2 id="about-what-title" className="about-section-title">What we do</h2>
              <p className="about-section-intro">
                Open source software can help the World Bank and its partners deliver tools more efficiently, work with common standards, and build ecosystems that support and improve shared software over time. The OSPO helps World Bank teams develop, contribute to, and publish open source software responsibly.
              </p>
            </div>
            <aside className="about-contact" aria-labelledby="about-contact-title">
              <h2 id="about-contact-title" className="about-section-title">Contact</h2>
              <p className="about-section-intro">
                For general questions about the OSPO or the World Bank&apos;s GitHub organization, contact{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </aside>
          </div>
          <ul className="about-functions">
            {functions.map(fn => (
              <li key={fn.title} className="about-function">
                <h3 className="about-function-title">{fn.title}</h3>
                <p>{fn.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {!statsError && (
          <section className="about-stats" aria-label="Open Source Code Catalog at a glance">
            {statItems.map(item => (
              <Link
                key={item.label}
                href="/catalog"
                className="about-stat"
                style={{ "--stat-color": item.color } as CSSProperties}
              >
                <span className="about-stat-icon">
                  <svg viewBox={item.icon.viewBox} aria-hidden="true" focusable="false" overflow="visible">
                    <path fill="currentColor" d={item.icon.d} />
                  </svg>
                </span>
                <span className="about-stat-value">{item.value?.toLocaleString() ?? "—"}</span>
                <span className="about-stat-label">{item.label}</span>
              </Link>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
