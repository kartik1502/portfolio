"use client";

import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";

interface Language {
  name: string;
  percent: number;
  total_seconds: number;
}

interface WakaData {
  total_seconds: number;
  human_readable_total: string;
  daily_average: number;
  human_readable_daily_average: string;
  all_time_total: string;
  languages: Language[];
  range: string;
}

export default function WakaTimeStats() {
  const [data, setData] = useState<WakaData | null>(null);

  useEffect(() => {
    fetch("/portfolio/wakatime.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || !data.languages?.length) return null;

  return (
    <AnimatedSection>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="brutal-card p-4 text-center">
            <p className="text-lg font-black text-ink">{data.human_readable_total}</p>
            <p className="text-xs text-muted uppercase tracking-[1px]">This week</p>
          </div>
          <div className="brutal-card p-4 text-center">
            <p className="text-lg font-black text-ink">{data.human_readable_daily_average}</p>
            <p className="text-xs text-muted uppercase tracking-[1px]">Daily avg</p>
          </div>
          <div className="brutal-card p-4 text-center">
            <p className="text-lg font-black text-ink">{data.all_time_total}</p>
            <p className="text-xs text-muted uppercase tracking-[1px]">All time</p>
          </div>
        </div>

        <div className="brutal-card p-5">
          <p className="text-xs font-bold text-ink uppercase tracking-[1.5px] mb-4">Languages</p>
          <div className="space-y-3">
            {data.languages.map((lang) => (
              <div key={lang.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-body uppercase tracking-[1px]">{lang.name}</span>
                  <span className="text-ink font-bold">{lang.percent}%</span>
                </div>
                <div className="h-[4px] bg-surface-card overflow-hidden border border-m-blue-light/20">
                  <div
                    className="h-full bg-m-blue-light"
                    style={{ width: `${lang.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
