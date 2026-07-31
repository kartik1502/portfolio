"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { colorFor, humanize, type ReposData } from "@/lib/repo-analytics";

function SummaryCards({ data }: { data: ReposData }) {
  const totalSeconds = data.repos.reduce((s, r) => s + r.seconds, 0);
  const activeDays = data.daily.filter((d) => d.total > 0).length;
  const top = data.repos[0];
  const cards = [
    { label: "Total time", value: humanize(totalSeconds) },
    { label: "Repos tracked", value: String(data.repos.length).padStart(2, "0") },
    { label: "Active days", value: String(activeDays).padStart(2, "0") },
    { label: "Top repo", value: top ? top.name.replace("arya-banking-", "ab-") : "—" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="border border-border p-4">
          <div className="text-[10px] font-display text-muted-foreground uppercase tracking-widest mb-2">
            {c.label}
          </div>
          <div className="font-display text-xl md:text-2xl font-bold truncate" title={c.value}>
            {c.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function CountUp({
  value,
  delay = 0,
  formatter,
}: {
  value: number;
  delay?: number;
  formatter: (n: number) => string;
}) {
  const [n, setN] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const startAt = performance.now() + delay;
    const to = value;
    const dur = Math.min(1200, 400 + Math.log10(Math.max(1, to)) * 300);
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - startAt) / dur));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value, delay]);

  return <>{formatter(n)}</>;
}

function DonutChart({ data }: { data: ReposData }) {
  const { repos } = data;
  const grand = repos.reduce((s, r) => s + r.seconds, 0);
  const R = 90;
  const C = 2 * Math.PI * R;
  const GAP = 1.5;
  let accN = 0;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <svg
        viewBox="0 0 260 260"
        className="w-full max-w-[260px] h-auto shrink-0"
        role="img"
        aria-label="Donut chart of time share per repository"
      >
        <g transform="rotate(-90 130 130)">
          <circle
            cx="130"
            cy="130"
            r={R}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="26"
            pathLength={1}
          />
          {repos.map((r, i) => {
            const frac = Math.max(r.seconds / grand - GAP / C, 0);
            const rot = (accN * 360) % 360;
            accN += r.seconds / grand;
            return (
              <circle
                key={r.name}
                cx="130"
                cy="130"
                r={R}
                fill="none"
                stroke={colorFor(r, i)}
                strokeWidth="26"
                pathLength={1}
                strokeDasharray={`${frac} 1`}
                transform={`rotate(${rot} 130 130)`}
                style={
                  {
                    "--frac": frac,
                    animation: `dash-grow 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.07}s both`,
                    cursor: "pointer",
                  } as CSSProperties
                }
                className="donut-seg"
              />
            );
          })}
        </g>
        <text
          x="130"
          y="126"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="var(--color-foreground)"
        >
          <CountUp
            value={grand}
            delay={450}
            formatter={(s) => (s === 0 ? "0h 0m" : humanize(s))}
          />
        </text>
        <text
          x="130"
          y="146"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="2"
          fill="var(--color-muted-foreground)"
        >
          TOTAL / 7D
        </text>
      </svg>
      <ul className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {repos.map((r, i) => (
          <li
            key={r.name}
            className="flex items-center gap-2 min-w-0 animate-reveal"
            style={{ animationDelay: `${0.35 + i * 0.05}s` }}
          >
            <span className="size-2 shrink-0" style={{ background: colorFor(r, i) }} />
            <span className="font-display text-[10px] uppercase tracking-widest truncate">
              {r.name.replace("arya-banking-", "")}
            </span>
            <span className="ml-auto font-display text-[10px] text-muted-foreground shrink-0">
              {r.percent.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Breakdown({ data }: { data: ReposData }) {
  return (
    <div className="border border-border bg-white/[0.02] p-4 md:p-6">
      <div className="border-b border-border pb-3 mb-4 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>per_repo.breakdown</span>
      </div>
      <ul>
        {data.repos.map((r, i) => (
          <li
            key={r.name}
            className="border-b border-border py-3 last:border-0 animate-reveal"
            style={{ animationDelay: `${0.45 + i * 0.04}s` }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="size-2 shrink-0" style={{ background: colorFor(r, i) }} />
              <span className="font-display text-xs uppercase tracking-widest truncate">
                {r.name.replace("arya-banking-", "")}
              </span>
              <span className="ml-auto font-display text-xs text-primary shrink-0">
                {humanize(r.seconds)}
              </span>
              <span className="w-14 text-right font-display text-[10px] text-muted-foreground shrink-0">
                {r.percent.toFixed(1)}%
              </span>
            </div>
            <div className="mt-2 h-1 bg-border">
              <div
                className="h-full"
                style={{ width: `${Math.max(r.percent, 0.5)}%`, background: colorFor(r, i) }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RepoAnalyticsChart() {
  const [data, setData] = useState<ReposData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    fetch(`${base}/wakatime-repos.json`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-border p-4 h-[76px] animate-pulse bg-muted-foreground/5" />
        ))}
      </div>
    );
  }

  if (!data || !data.repos || data.repos.length === 0) {
    return (
      <div className="border border-border p-10 text-center font-display text-[10px] uppercase tracking-widest text-muted-foreground">
        No repo analytics recorded yet — connect the WakaTime API key and rebuild.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SummaryCards data={data} />
      <div className="border border-border bg-white/[0.02] p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 mb-6 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>commits_to_time.render</span>
          <span className="text-primary">{data.start} → {data.end}</span>
        </div>
        <DonutChart data={data} />
      </div>
      <Breakdown data={data} />
      <div className="text-[10px] font-display text-muted-foreground/60 uppercase tracking-widest">
        via WakaTime · {data.repos.length} repos · last 7 days
        {data.updatedAt ? ` · updated ${new Date(data.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}` : ""}
      </div>
    </div>
  );
}
