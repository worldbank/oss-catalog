"use client";
import React, { useState } from "react";
import "../globals.css";
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
}

interface ProjectCardProps {
  repo: Repo;
  topic: string;
  setTopic: (topic: string) => void;
}

const MAX_VISIBLE_TOPICS = 6;

const ProjectCard: React.FC<ProjectCardProps> = ({ repo, topic, setTopic }) => {
  const [showAllTopics, setShowAllTopics] = useState(false);


  return (
  <div className="site-card" tabIndex={0} role="button" aria-label={`Open ${repo.name} on GitHub`} style={{ width: '100%', minHeight: 320, maxHeight: 480 }}>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
  className="site-card-title"
        style={{
          color: "#1976d2",
          fontWeight: 700,
          fontSize: "1.25rem",
          letterSpacing: "-0.5px",
          textDecoration: "none",
          transition: "color 0.2s",
          display: "inline-block",
          marginBottom: "0.5rem"
        }}
        onMouseOver={e => (e.currentTarget.style.color = "#0d47a1")}
        onMouseOut={e => (e.currentTarget.style.color = "#1976d2")}
      >
        {repo.name}
      </a>
  <p className="site-card-desc">
        {repo.description
          ? repo.description.length > 150
            ? repo.description.slice(0, 147) + "..."
            : repo.description
          : ""}
      </p>
      <div style={{ flex: 1 }} />
      {/* Topics section: limit to 2 rows, add scrollbar if overflow. */}
      <div
  className="site-card-topics"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          maxHeight: '4.8em', // ~2 rows at 1.6em line height
          overflowY: 'auto',
          lineHeight: '1.6em',
        }}
      >
        {(repo.topics?.length ?? 0) > 0 && (
          <>
            {(showAllTopics ? (repo.topics ?? []) : (repo.topics ?? []).slice(0, MAX_VISIBLE_TOPICS)).map((t: string) => (
              <span
                key={t}
                className={`site-card-topic${t === topic ? " site-card-topic-active" : ""}`}
                onClick={e => { e.stopPropagation(); setTopic(t === topic ? '' : t); }}
                title={t === topic ? `Remove topic filter: ${t}` : `Filter by topic: ${t}`}
              >
                {t.length > 18 ? t.slice(0, 15) + '…' : t}
              </span>
            ))}
            {(repo.topics?.length ?? 0) > MAX_VISIBLE_TOPICS && !showAllTopics && (
              <span
                className="site-card-topic site-card-topic-more"
                title={(repo.topics ?? []).slice(MAX_VISIBLE_TOPICS).join(', ')}
                style={{ cursor: 'pointer', fontWeight: 600 }}
                onClick={e => { e.stopPropagation(); setShowAllTopics(true); }}
              >
                +{(repo.topics?.length ?? 0) - MAX_VISIBLE_TOPICS} more
              </span>
            )}
            {(repo.topics?.length ?? 0) > MAX_VISIBLE_TOPICS && showAllTopics && (
              <span
                className="site-card-topic site-card-topic-less"
                style={{ cursor: 'pointer', fontWeight: 600 }}
                onClick={e => { e.stopPropagation(); setShowAllTopics(false); }}
              >
                Show less
              </span>
            )}
          </>
        )}
      </div>
  <div className="site-card-stats">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <img src={getAssetPath("/img/star-solid-full.svg")} alt="stars" width="20" height="20" style={{ verticalAlign: 'middle' }} />
          {repo.stargazers_count}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <img src={getAssetPath("/img/code-fork-solid-full.svg")} alt="forks" width="20" height="20" style={{ verticalAlign: 'middle' }} />
          {repo.forks_count}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <img src={getAssetPath("/img/code-solid-full.svg")} alt="language" width="20" height="20" style={{ verticalAlign: 'middle' }} />
          {repo.language || "N/A"}
        </span>
      </div>
  <div className="site-card-buttons">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="site-card-btn site-card-btn-github"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%' }}
        >
          GitHub
          <img src={getAssetPath("/img/github.svg")} alt="GitHub" width="24" height="24" style={{ verticalAlign: 'middle' }} />
        </a>
        <a
          href={repo.homepage || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`site-card-btn site-card-btn-website${repo.homepage ? "" : " site-card-btn-disabled"}`}
          aria-disabled={!repo.homepage}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%' }}
        >
          Website
          <img src={repo.homepage ? getAssetPath("/img/arrow.svg") : getAssetPath("/img/arrow-gray.svg")} alt="Open website" width="20" height="20" style={{ verticalAlign: 'middle' }} />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
