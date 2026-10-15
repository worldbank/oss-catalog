import { useEffect, useState } from "react";

export interface Repo {
  id: number;
  name: string;
  description?: string | null;
  html_url?: string;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  created_at?: string;
  updated_at?: string;
  catalogAddedDate?: string;
}

const time = (date?: string) => (date ? new Date(date).getTime() : 0);

export function getLanguages(repos: Repo[]) {
  return [...new Set(repos.map(r => r.language).filter((lang): lang is string => !!lang))];
}

export function getTopics(repos: Repo[]) {
  return [...new Set(repos.flatMap(r => r.topics || []))].sort();
}

// Newest catalog additions first; repo creation date breaks ties.
export function byNewestInCatalog(a: Repo, b: Repo) {
  return time(b.catalogAddedDate) - time(a.catalogAddedDate) || time(b.created_at) - time(a.created_at);
}

export function useRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/repos.json?v=${Date.now()}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load repositories...");
        return res.json();
      })
      .then((data: Repo[]) => {
        if (!cancelled) setRepos(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, loading, error };
}
