"use client";

import { useEffect, useState } from "react";

export function CodingHours() {
  const [hours, setHours] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

    fetch(`${base}/wakatime.json`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        if (json?.human_readable_total) {
          setHours(json.human_readable_total);
        } else {
          setFailed(true);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mb-6 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-2 font-display text-[10px] uppercase tracking-widest text-primary">
      <span className="size-1 rounded-full bg-primary" />
      Coding hrs / wk:{" "}
      {hours ? (
        <strong className="font-bold">{hours}</strong>
      ) : failed ? (
        <strong className="font-bold">—</strong>
      ) : (
        <span
          aria-label="Loading coding hours"
          className="inline-block h-3 w-20 animate-pulse rounded-sm bg-primary/25"
        />
      )}
    </div>
  );
}
