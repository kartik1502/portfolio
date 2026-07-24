"use client";

import { useState, useMemo } from "react";
import { CHANGELOG } from "@/lib/portfolio-data";
import { Reveal } from "@/components/Reveal";

type View = "daily" | "weekly" | "monthly";

const VIEWS: { value: View; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

function getPeriod(dateStr: string, view: View): string {
  const d = new Date(dateStr + "T00:00:00");
  switch (view) {
    case "daily":
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "weekly": {
      const start = new Date(d);
      start.setDate(d.getDate() - d.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    }
    case "monthly":
      return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
}

export default function Changelog() {
  const [view, setView] = useState<View>("daily");
  const [open, setOpen] = useState(true);

  const groups = useMemo(() => {
    const map = new Map<string, typeof CHANGELOG>();
    for (const entry of CHANGELOG) {
      const key = getPeriod(entry.date, view);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(entry);
    }
    return Array.from(map.entries());
  }, [view]);

  return (
    <>
      <section className="px-4 md:px-8 py-24 md:py-32 grid grid-cols-4 md:grid-cols-12 gap-6 border-b border-border">
        <div className="col-span-4 md:col-span-8 animate-reveal">
          <div className="font-display text-[10px] uppercase tracking-[0.25em] text-primary mb-6">
            [ 05 ] · Log
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-8">
            ACTIVITY <br />
            <span className="text-primary">LOG.</span>
          </h1>
          <p className="max-w-[52ch] text-lg text-muted-foreground">
            A running record of work done — feature additions, fixes, refactors, and infrastructure
            changes tracked daily or weekly.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
          <Reveal from="left" className="col-span-4 md:col-span-3">
            <div className="sticky top-24">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="group flex items-center gap-2 w-full mb-1"
              >
                <span className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  Filter
                </span>
                <span className="font-display text-[10px] text-muted-foreground transition-transform group-hover:translate-x-0.5">
                  {open ? "[ − ]" : `[ + ] · ${view}`}
                </span>
              </button>
              {open && (
                <div className="flex flex-row md:flex-col gap-2 pt-1">
                  {VIEWS.map((v) => (
                    <button
                      key={v.value}
                      onClick={() => setView(v.value)}
                      className={`font-display text-[11px] uppercase tracking-widest text-left transition-colors px-3 py-1.5 border ${
                        view === v.value
                          ? "text-foreground border-primary"
                          : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
          <div className="col-span-4 md:col-span-9 space-y-12">
            {groups.map(([period, entries]) => (
              <Reveal key={period} from="up" as="section">
                <h3 className="font-display text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  {period}
                </h3>
                <div className="space-y-6">
                  {entries.map((entry, i) => (
                    <Reveal key={i} from="right" delay={i * 80} as="article">
                      <div className="border-l-2 border-primary/40 pl-6 py-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                          <h4 className="font-display text-base font-bold tracking-tight">
                            {entry.title}
                          </h4>
                          <span className="font-display text-[10px] uppercase tracking-widest text-primary">
                            {entry.date}{entry.time && <> · {entry.time}</>}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {entry.description}
                        </p>
                        {entry.tags && (
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 border border-border text-[10px] font-display uppercase tracking-widest text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            ))}
            {CHANGELOG.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                No entries yet. Work logs will appear here.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
