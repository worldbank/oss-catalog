"use client";
import { useEffect, useState } from "react";
import Select from "react-select";

import ProjectCard from "../components/ProjectCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAssetPath } from "../utils/paths";

interface Repo {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  topics?: string[];
  html_url?: string;
  homepage?: string;
  created_at?: string;
  updated_at?: string;
}

export default function CatalogNewPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("stars");
  const [language, setLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    fetch(getAssetPath("/repos.json"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load repositories...");
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredRepos = repos
    .filter((repo: Repo) =>
      (repo.name.toLowerCase().includes(search.toLowerCase()) ||
       (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))) &&
      (language ? repo.language === language : true) &&
      (topic ? repo.topics && repo.topics.includes(topic) : true)
    )
    .sort((a: Repo, b: Repo) => {
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      if (sort === "forks") return b.forks_count - a.forks_count;
      if (sort === "created") {
        // Sort by created_at descending (newest first)
        const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bDate - aDate;
      }
      if (sort === "updated") {
        // Sort by updated_at descending (most recently updated first)
        const aDate = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const bDate = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return bDate - aDate;
      }
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / pageSize));
  const pagedRepos = filteredRepos.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, sort, language, topic]);

  const languages = Array.from(new Set(repos.map((r: Repo) => r.language))).filter((lang): lang is string => !!lang);
  const languageOptions = languages.map(lang => ({ value: lang, label: lang }));
  const topics = Array.from(new Set(repos.flatMap((r: Repo) => r.topics || []))).sort();
  const topicOptions = topics.map(topic => ({ value: topic, label: topic }));

  // Removed unused variables: repoCount, totalStars, totalForks, mostPopularLanguage

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Inter, Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e3eaf2 100%)",
      }}
    >
      <Header />
      {/* Hero Section without summary stats box */}
      <div className="catalog-hero-container">
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2.5rem 0 2rem 0', position: 'relative' }}>
          <div className="catalog-hero-content">
            <h2
              style={{
                fontFamily: 'Segoe UI',
                fontSize: '2rem',
                fontWeight: 600,
                color: '#15353F',
                margin: 0,
                marginBottom: '0.75rem',
                letterSpacing: '-0.5px',
                textAlign: 'left'
              }}
            >
              Explore World Bank Open Source Code
            </h2>
            <p
              style={{
                fontFamily: 'Segoe UI',
                fontSize: '1rem',
                color: '#444',
                maxWidth: 700,
                marginBottom: '1.25rem',
                fontWeight: 400,
                textAlign: 'left'
              }}
            >
              Browse, filter, and learn about open source code created by the World Bank. Find projects by topic, language, and popularity. Click a project card to learn more about the open source project. You can browse the code on GitHub and learn how to contribute.
            </p>
            {/* Search and filter controls moved from left nav */}
            <div className="catalog-filters-container">
              {/* Search */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: 44 }}>
                <img
                  src={getAssetPath("/img/magnifying-glass.svg")}
                  alt="Search"
                  width="20"
                  height="20"
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7, zIndex: 2 }}
                />
                  <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search catalog..."
                    style={{ width: 340, padding: '0.5rem 1rem 0.5rem 2.3rem', borderRadius: 8, border: '1.5px solid #d0d7de', fontSize: '1rem', color: '#222', background: '#f7fafd', outline: 'none', boxShadow: 'none', height: 44, display: 'flex', alignItems: 'center' }}
                  />
              </div>
              {/* Language filter */}
              <div style={{ minWidth: 220 }}>
                <Select
                  instanceId="language-select"
                  inputId="language"
                  isClearable
                  isSearchable
                  placeholder="Language..."
                  options={languageOptions}
                  value={language ? { value: language, label: language } : null}
                  onChange={option => setLanguage(option ? option.value : "")}
                  styles={{
                    control: (base) => ({ ...base, borderRadius: 8, borderColor: '#d0d7de', fontSize: '1rem', background: '#f7fafd', color: '#222', boxShadow: 'none', minHeight: 44, height: 44, paddingLeft: 8, width: 220 }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    singleValue: (base) => ({ ...base, color: '#222', paddingLeft: 4 }),
                    option: (base, state) => ({ ...base, color: '#222', backgroundColor: state.isFocused ? '#e3eaf2' : '#fff' }),
                    placeholder: (base) => ({ ...base, paddingLeft: 4 })
                  }}
                />
              </div>
              {/* Topic filter */}
              <div style={{ minWidth: 220 }}>
                <Select
                  instanceId="topic-select"
                  inputId="topic"
                  isClearable
                  isSearchable
                  placeholder="Topic..."
                  options={topicOptions}
                  value={topic ? { value: topic, label: topic } : null}
                  onChange={option => setTopic(option ? option.value : "")}
                  styles={{
                    control: (base) => ({ ...base, borderRadius: 8, borderColor: '#d0d7de', fontSize: '1rem', background: '#f7fafd', color: '#222', boxShadow: 'none', minHeight: 44, height: 44, paddingLeft: 8, width: 220 }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    singleValue: (base) => ({ ...base, color: '#222', paddingLeft: 4 }),
                    option: (base, state) => ({ ...base, color: '#222', backgroundColor: state.isFocused ? '#e3eaf2' : '#fff' }),
                    placeholder: (base) => ({ ...base, paddingLeft: 4 })
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <main
        style={{
          backgroundColor: "white",
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "2rem 0 2rem 0",
          width: "100%",
        }}
      >
        {/* Main content */}
        <section className="catalog-main-section"
        >
          {loading && (
            <p style={{ fontSize: "1.1rem", color: "#15353F", fontWeight: 500 }}>
              Loading catalog...
            </p>
          )}
          {error && (
            <p style={{ color: "#d32f2f", fontWeight: 600 }}>Error: {error}</p>
          )}
          {!loading && !error && (
            <>
              {/* Repo count and Sort By area above the grid */}
              <div className="catalog-controls-grid">
                <span
                  style={{
                    fontSize: "1.15rem",
                    color: "#15353F",
                    fontWeight: 600,
                    letterSpacing: "-0.5px",
                    minWidth: 210,
                    whiteSpace: "nowrap"
                  }}
                >
                  {filteredRepos.length === 0
                    ? "No repositories found."
                    : (() => {
                        const startIdx = (page - 1) * pageSize + 1;
                        const endIdx = Math.min(page * pageSize, filteredRepos.length);
                        return `${startIdx}-${endIdx} of ${filteredRepos.length} repos`;
                      })()
                  }
                </span>
                {/* Centered Pagination */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {totalPages > 1 && (
                    <ul className="pagination" style={{ margin: "0.5rem 0" }}>
                      <li>
                        <a
                          href="#"
                          onClick={e => { e.preventDefault(); setPage(page - 1); }}
                          style={{ pointerEvents: page === 1 ? "none" : "auto", opacity: page === 1 ? 0.5 : 1 }}
                        >Previous</a>
                      </li>
                      {/* Page number buttons with ellipsis */}
                      {(() => {
                        const pageButtons = [];
                        const siblings = 2;
                        if (totalPages <= 7) {
                          for (let p = 1; p <= totalPages; p++) {
                            pageButtons.push(p);
                          }
                        } else {
                          pageButtons.push(1);
                          if (page > siblings + 2) pageButtons.push('...');
                          for (let p = Math.max(2, page - siblings); p <= Math.min(totalPages - 1, page + siblings); p++) {
                            if (p === 2 && page > siblings + 2) pageButtons.push(2);
                            pageButtons.push(p);
                          }
                          if (page < totalPages - siblings - 1) pageButtons.push('...');
                          pageButtons.push(totalPages);
                        }
                        return pageButtons.map((p, idx) =>
                          p === '...'
                            ? <li key={"ellipsis-" + idx}><span style={{ padding: "0.5rem 0.75rem", color: "#888", fontWeight: 600 }}>...</span></li>
                            : <li key={p}>
                                <a
                                  href="#"
                                  onClick={e => { e.preventDefault(); if (typeof p === 'number') setPage(p); }}
                                  style={{
                                    fontWeight: p === page ? 700 : 400,
                                    background: p === page ? "#e3eaf2" : undefined,
                                    pointerEvents: p === page ? "none" : "auto",
                                    opacity: p === page ? 0.7 : 1
                                  }}
                                >{p}</a>
                              </li>
                        );
                      })()}
                      <li>
                        <a
                          href="#"
                          onClick={e => { e.preventDefault(); setPage(page + 1); }}
                          style={{ pointerEvents: page === totalPages ? "none" : "auto", opacity: page === totalPages ? 0.5 : 1 }}
                        >Next</a>
                      </li>
                    </ul>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "1rem", color: "#15353F", fontWeight: 500 }}>Sort by:</span>
                  <Select
                    instanceId="sort-select"
                    inputId="sort"
                    isSearchable={false}
                    options={[
                      { value: "name", label: "Name" },
                      { value: "stars", label: "Stars" },
                      { value: "forks", label: "Forks" },
                      { value: "created", label: "Created Date" },
                      { value: "updated", label: "Last Updated" }
                    ]}
                    value={(() => {
                      if (sort === "created") return { value: "created", label: "Created Date" };
                      if (sort === "updated") return { value: "updated", label: "Last Updated" };
                      if (sort === "stars") return { value: "stars", label: "Stars" };
                      if (sort === "forks") return { value: "forks", label: "Forks" };
                      return { value: "name", label: "Name" };
                    })()}
                    onChange={option => setSort(option ? option.value : "stars")}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: 6,
                        borderColor: "#d0d7de",
                        fontSize: "0.95rem",
                        background: "#f7fafd",
                        color: "#222",
                        boxShadow: "none",
                        width: 200
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#222"
                      }),
                      option: (base, state) => ({
                        ...base,
                        color: "#222",
                        backgroundColor: state.isFocused ? "#e3eaf2" : "#fff"
                      })
                    }}
                    placeholder="Sort By..."
                  />
                </div>
              </div>
              <div className="catalog-grid">
                {pagedRepos.map((repo: Repo) => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    topic={topic}
                    setTopic={setTopic}
                  />
                ))}
              </div>
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <ul className="pagination" style={{ margin: "2rem 0" }}>
                    <li>
                      <a
                        href="#"
                        onClick={e => { e.preventDefault(); setPage(page - 1); }}
                        style={{ pointerEvents: page === 1 ? "none" : "auto", opacity: page === 1 ? 0.5 : 1 }}
                      >Previous</a>
                    </li>
                    {/* Page number buttons with ellipsis */}
                    {(() => {
                      const pageButtons = [];
                      const siblings = 2;
                      if (totalPages <= 7) {
                        for (let p = 1; p <= totalPages; p++) {
                          pageButtons.push(p);
                        }
                      } else {
                        pageButtons.push(1);
                        if (page > siblings + 2) pageButtons.push('...');
                        for (let p = Math.max(2, page - siblings); p <= Math.min(totalPages - 1, page + siblings); p++) {
                          if (p === 2 && page > siblings + 2) pageButtons.push(2);
                          pageButtons.push(p);
                        }
                        if (page < totalPages - siblings - 1) pageButtons.push('...');
                        pageButtons.push(totalPages);
                      }
                      return pageButtons.map((p, idx) =>
                        p === '...'
                          ? <li key={"ellipsis-" + idx}><span style={{ padding: "0.5rem 0.75rem", color: "#888", fontWeight: 600 }}>...</span></li>
                          : <li key={p}>
                              <a
                                href="#"
                                onClick={e => { e.preventDefault(); if (typeof p === 'number') setPage(p); }}
                                style={{
                                  fontWeight: p === page ? 700 : 400,
                                  background: p === page ? "#e3eaf2" : undefined,
                                  pointerEvents: p === page ? "none" : "auto",
                                  opacity: p === page ? 0.7 : 1
                                }}
                              >{p}</a>
                            </li>
                      );
                    })()}
                    <li>
                      <a
                        href="#"
                        onClick={e => { e.preventDefault(); setPage(page + 1); }}
                        style={{ pointerEvents: page === totalPages ? "none" : "auto", opacity: page === totalPages ? 0.5 : 1 }}
                      >Next</a>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
