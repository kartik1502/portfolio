"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WakaStats } from "@/lib/wakatime-types";

const BAR_SHADES = [
  "bg-blue-500/70",
  "bg-green-500/70",
  "bg-purple-500/70",
  "bg-pink-500/70",
  "bg-yellow-500/70",
];

async function fetchWakatimeStats(): Promise<WakaStats> {
  const res = await fetch("/wakatime.json");

  if (!res.ok) {
    throw new Error(`WakaTime data not available: ${res.status}`);
  }

  const json = await res.json() as {
    human_readable_total?: string;
    human_readable_daily_average?: string;
    languages?: Array<{ name: string; percent: number }>;
    range?: string;
  };

  const languages = (json.languages ?? []).map((l) => ({
    name: l.name,
    percent: l.percent,
  }));
  const top = languages[0];

  return {
    weekTotal: json.human_readable_total ?? "—",
    dailyAvg: json.human_readable_daily_average ?? "—",
    topLang: top?.name ?? "—",
    topPercent: top?.percent ?? 0,
    languages,
    updatedAt: new Date().toISOString(),
  };
}

export function CodingActivity() {
  const [text, setText] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["wakatime"],
    queryFn: fetchWakatimeStats,
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (data?.updatedAt) {
      const d = new Date(data.updatedAt);
      const fmt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setText(fmt.format(d));
    }
  }, [data?.updatedAt]);

  if (!data) {
    return <CodingActivityFallback />;
  }

  const top = data.languages.slice(0, 4);
  const otherPct = Math.max(
    0,
    100 - top.reduce((s, l) => s + l.percent, 0),
  );
  const bars = [
    ...top.map((l, i) => ({ ...l, shade: BAR_SHADES[i] })),
    { name: "Other", percent: otherPct, shade: BAR_SHADES[4] },
  ].filter((b) => b.percent > 0.5);

  const cards = [
    { label: "This week", value: data.weekTotal },
    { label: "Daily avg", value: data.dailyAvg },
    { label: "Top lang", value: data.topLang },
    { label: "Share", value: `${data.topPercent.toFixed(0)}%` },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((s) => (
          <div key={s.label} className="border border-border p-4">
            <div className="text-[10px] font-display text-muted-foreground uppercase tracking-widest mb-2">
              {s.label}
            </div>
            <div className="font-display text-2xl font-bold truncate">
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex h-2 overflow-hidden border border-border">
        {bars.map((b) => (
          <div
            key={b.name}
            className={b.shade}
            style={{ width: `${b.percent}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[10px] font-display uppercase tracking-widest text-muted-foreground">
        {bars.map((b) => (
          <span key={b.name}>
            <span className={`${b.shade} inline-block size-2 mr-1 align-middle`} />
            {b.name} {b.percent.toFixed(0)}%
          </span>
        ))}
      </div>
      <div className="mt-4 text-[10px] font-display text-muted-foreground/60 uppercase tracking-widest">
        Last updated: {text || "—"}
      </div>
    </>
  );
}

function CodingActivityFallback() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border border-border p-4 h-[76px] animate-pulse bg-muted-foreground/5"
        />
      ))}
    </div>
  );
}
