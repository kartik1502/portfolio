"use client";

import { RepoAnalyticsChart } from "@/components/RepoAnalyticsChart";

export function ReposContent() {
  return (
    <>
      <section className="px-4 md:px-8 py-24 md:py-32 grid grid-cols-4 md:grid-cols-12 gap-6 border-b border-border">
        <div className="col-span-4 md:col-span-8">
          <div className="font-display text-[10px] uppercase tracking-[0.25em] text-primary mb-6">
            [ 07 ] · Repo Analytics
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-8">
            CODE, PER <br />
            <span className="text-primary">REPOSITORY.</span>
          </h1>
          <p className="max-w-[52ch] text-lg text-muted-foreground">
            Time spent across the arya-banking microservices platform — every repo, every day, straight from WakaTime heartbeats.
          </p>
        </div>
        <div className="col-span-4 md:col-span-4 flex md:justify-end items-end">
          <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground md:text-right">
            Source: WakaTime<br />
            Range: Last 7 days<br />
            Scope: 11 repos
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16 border-b border-border">
        <RepoAnalyticsChart />
      </section>

      <section className="px-4 md:px-8 py-20 grid grid-cols-4 md:grid-cols-12 gap-6">
        <div className="col-span-4 md:col-span-3">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
            How_it_works
          </h2>
        </div>
        <div className="col-span-4 md:col-span-9 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            The WakaTime editor plugin sends anonymous heartbeats per keystroke, which are aggregated per project folder. This page consumes a daily summary — filtered to the arya-banking repositories — fetched at build time and served as a static JSON payload.
          </p>
          <p>
            Same data, one lens: a share donut tuned to the site — every segment sized by
            time, brighter meaning a larger share, drawn in from the top. Hover a segment to
            isolate it; the per-repo breakdown below keeps the exact totals.
          </p>
        </div>
      </section>
    </>
  );
}
