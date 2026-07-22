"use client";

import { WRITING } from "@/lib/portfolio-data";

export default function Writing() {
  return (
    <>
      <section className="px-4 md:px-8 py-24 md:py-32 grid grid-cols-4 md:grid-cols-12 gap-6 border-b border-border">
        <div className="col-span-4 md:col-span-8 animate-reveal">
          <div className="font-display text-[10px] uppercase tracking-[0.25em] text-primary mb-6">
            [ 04 ] · Writing
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-8">
            NOTES FROM <br />
            <span className="text-primary">PRODUCTION.</span>
          </h1>
          <p className="max-w-[52ch] text-lg text-muted-foreground">
            Deep-dives on the tools I use every day — Kafka, Spring Boot, microservices patterns.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16 border-b border-border">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
          <div className="col-span-4 md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Articles.log
            </h2>
          </div>
          <div className="col-span-4 md:col-span-9 divide-y divide-border border-y border-border">
            {WRITING.map((w, i) => (
              <a
                key={w.href}
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-6 py-6 hover:text-primary transition-colors"
              >
                <div className="flex items-baseline gap-6 min-w-0">
                  <span className="font-display text-xs text-muted-foreground shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-base md:text-lg font-medium">
                    {w.title}
                  </span>
                </div>
                <span className="font-display text-xs opacity-60 group-hover:opacity-100 shrink-0">
                  READ ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
