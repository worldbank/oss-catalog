"use client";
import { useState } from "react";
import type { Repo } from "../utils/repos";

interface ProjectCardProps {
  repo: Repo;
  topic: string;
  setTopic: (topic: string) => void;
}

const MAX_VISIBLE_TOPICS = 6;

export default function ProjectCard({ repo, topic, setTopic }: ProjectCardProps) {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const topics = repo.topics ?? [];
  const visibleTopics = showAllTopics ? topics : topics.slice(0, MAX_VISIBLE_TOPICS);
  const description = repo.description ?? "";

  return (
    <div className="site-card" tabIndex={0} role="button" aria-label={`Open ${repo.name} on GitHub`}>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="site-card-title">
        {repo.name}
      </a>
      <p className="site-card-desc">
        {description.length > 150 ? description.slice(0, 147) + "..." : description}
      </p>
      <div style={{ flex: 1 }} />
      <div className="site-card-topics">
        {visibleTopics.map(t => (
          <span
            key={t}
            className={`site-card-topic${t === topic ? " site-card-topic-active" : ""}`}
            onClick={e => { e.stopPropagation(); setTopic(t === topic ? "" : t); }}
            title={t === topic ? `Remove topic filter: ${t}` : `Filter by topic: ${t}`}
          >
            {t.length > 18 ? t.slice(0, 15) + "…" : t}
          </span>
        ))}
        {topics.length > MAX_VISIBLE_TOPICS && (
          <span
            className="site-card-topic site-card-topic-toggle"
            title={showAllTopics ? undefined : topics.slice(MAX_VISIBLE_TOPICS).join(", ")}
            onClick={e => { e.stopPropagation(); setShowAllTopics(!showAllTopics); }}
          >
            {showAllTopics ? "Show less" : `+${topics.length - MAX_VISIBLE_TOPICS} more`}
          </span>
        )}
      </div>
      <div className="site-card-stats">
        <span className="site-card-stat">
          <img src="/img/star-solid-full.svg" alt="stars" width="20" height="20" />
          {repo.stargazers_count}
        </span>
        <span className="site-card-stat">
          <img src="/img/code-fork-solid-full.svg" alt="forks" width="20" height="20" />
          {repo.forks_count}
        </span>
        <span className="site-card-stat">
          <img src="/img/code-solid-full.svg" alt="language" width="20" height="20" />
          {repo.language || "N/A"}
        </span>
      </div>
      <div className="site-card-buttons">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="site-card-btn site-card-btn-github">
          GitHub
          <img src="/img/github.svg" alt="GitHub" width="24" height="24" />
        </a>
        <a
          href={repo.homepage || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`site-card-btn site-card-btn-website${repo.homepage ? "" : " site-card-btn-disabled"}`}
          aria-disabled={!repo.homepage}
        >
          Website
          <img src={repo.homepage ? "/img/arrow.svg" : "/img/arrow-gray.svg"} alt="Open website" width="20" height="20" />
        </a>
      </div>
    </div>
  );
}
