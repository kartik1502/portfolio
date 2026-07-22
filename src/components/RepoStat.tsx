"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const to = value;
    const dur = Math.min(1200, 400 + Math.log10(Math.max(1, to)) * 300);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (to - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value]);

  return <>{n.toLocaleString()}</>;
}

async function fetchRepoStats(repo: string) {
  if (repo.startsWith("org:")) {
    const org = repo.slice(4);
    let stars = 0;
    let forks = 0;
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}&type=public`,
      );
      if (!res.ok) break;
      const list = await res.json() as Array<{ stargazers_count: number; forks_count: number }>;
      for (const r of list) {
        stars += r.stargazers_count ?? 0;
        forks += r.forks_count ?? 0;
      }
      if (list.length < 100) break;
    }
    return { stars, forks };
  }
  const res = await fetch(`https://api.github.com/repos/${repo}`);
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const data = await res.json() as { stargazers_count: number; forks_count: number };
  return { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 };
}

export function RepoStat({ repo, kind }: { repo: string; kind: "stars" | "forks" }) {
  const [data, setData] = useState<{ stars: number; forks: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchRepoStats(repo)
      .then((d) => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });
    return () => { cancelled = true; };
  }, [repo]);

  if (loading)
    return <span className="inline-block h-[1em] w-14 align-middle animate-shimmer opacity-40" />;
  if (error || !data) return <span className="opacity-40">·</span>;
  return <CountUp value={kind === "stars" ? data.stars : data.forks} />;
}
