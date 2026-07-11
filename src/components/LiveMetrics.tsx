"use client";

import { useEffect, useState } from "react";

export default function LiveMetrics({ repo }: { repo: string }) {
  const [stars, setStars] = useState<string>("—");
  const [forks, setForks] = useState<string>("—");

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count.toLocaleString());
          setForks(data.forks_count.toLocaleString());
        }
      })
      .catch(() => {});
  }, [repo]);

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="border-2 border-m-blue-light/30 px-3 py-2">
        <p className="text-base font-bold text-ink">{stars}</p>
        <p className="text-xs text-muted uppercase tracking-[1px]">GitHub Stars</p>
      </div>
      <div className="border-2 border-m-blue-light/30 px-3 py-2">
        <p className="text-base font-bold text-ink">{forks}</p>
        <p className="text-xs text-muted uppercase tracking-[1px]">Forks</p>
      </div>
    </div>
  );
}
