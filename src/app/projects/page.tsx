"use client";

import { useMemo, useState } from "react";
import { PROJECTS } from "@/lib/portfolio-data";
import { RepoStat } from "@/components/RepoStat";
import { Reveal } from "@/components/Reveal";
import { SectionSubnav } from "@/components/SectionSubnav";

export default function Projects() {
  return (
    <>
      <section id="overview" className="px-4 md:px-8 py-24 md:py-32 grid grid-cols-4 md:grid-cols-12 gap-6 border-b border-border">
        <div className="col-span-4 md:col-span-8 animate-reveal">
          <div className="font-display text-[10px] uppercase tracking-[0.25em] text-primary mb-6">
            [ 03 ] · Projects
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-8">
            PROOF, NOT <br />
            <span className="text-primary">PROMISES.</span>
          </h1>
          <p className="max-w-[52ch] text-lg text-muted-foreground">
            Distributed systems and microservices platforms — architecture, tradeoffs, and code you can inspect.
          </p>
        </div>
        <div className="col-span-4 md:col-span-4 flex md:justify-end items-end animate-reveal [animation-delay:200ms]">
          <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground md:text-right">
            Count: {PROJECTS.length.toString().padStart(2, "0")}<br />
            Domain: Fintech / Backend<br />
            License: MIT
          </div>
        </div>
      </section>

      <SectionSubnav
        ariaLabel="Projects sections"
        items={[
          { id: "overview", label: "01 · Overview" },
          { id: "modules", label: "02 · Modules" },
          { id: "case-studies", label: "03 · Case studies" },
        ]}
      />

      <ModulesSection />
      <CaseStudiesSection />
    </>
  );
}

function ModulesSection() {
  const allTags = useMemo(
    () => Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort(),
    [],
  );
  const [active, setActive] = useState<string | null>(null);
  const filtered = active
    ? PROJECTS.filter((p) => p.tags.includes(active))
    : PROJECTS;

  return (
    <section id="modules" className="bg-white/[0.02]">
      <div className="px-4 md:px-8 py-4 border-b border-border flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xs font-bold uppercase tracking-widest text-primary">
          Verified_Modules.log
        </h2>
        <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
          {filtered.length} / {PROJECTS.length} shown
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 border-b border-border flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={`shrink-0 px-3 py-1.5 border font-display text-[10px] uppercase tracking-widest transition-colors ${
            active === null
              ? "border-primary text-primary bg-primary/10"
              : "border-border text-muted-foreground hover:text-primary hover:border-primary"
          }`}
        >
          All
        </button>
        {allTags.map((t) => {
          const on = active === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(on ? null : t)}
              className={`shrink-0 px-3 py-1.5 border font-display text-[10px] uppercase tracking-widest transition-colors ${
                on
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:text-primary hover:border-primary"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {filtered.map((p, i) => (
        <Reveal key={p.n} as="article" delay={i * 80}>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="block group border-b border-border hover:bg-primary/5 transition-colors hover-lift"
          >
            <div className="px-4 md:px-8 py-12 md:py-20 grid grid-cols-4 md:grid-cols-12 gap-6">
              <div className="col-span-1 font-display text-xs text-muted-foreground">
                [ {p.n} ]
              </div>
              <div className="col-span-3 md:col-span-5">
                <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                  {p.domain} · {p.year}
                </div>
                <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[46ch] leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 border border-border text-[9px] font-display uppercase tracking-widest"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-4 md:col-span-6 relative">
                <div className="w-full aspect-video border border-border bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] flex flex-col justify-between p-6 group-hover:border-primary/50 transition-colors">
                  <div className="flex justify-between font-display text-[10px] text-muted-foreground uppercase tracking-widest">
                    <span>{p.label}</span>
                    <span className="text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 font-display">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                        Stars
                      </div>
                      <div className="text-3xl font-bold"><RepoStat repo={p.repo} kind="stars" /></div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                        Forks
                      </div>
                      <div className="text-3xl font-bold"><RepoStat repo={p.repo} kind="forks" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Reveal>
      ))}

      {filtered.length === 0 && (
        <div className="px-4 md:px-8 py-16 text-center font-display text-[10px] uppercase tracking-widest text-muted-foreground">
          No modules match this tag.
        </div>
      )}
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="px-4 md:px-8 py-20 md:py-24 border-t border-border"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-6 mb-12">
        <div className="col-span-4 md:col-span-3">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Case_Studies
          </h2>
        </div>
        <p className="col-span-4 md:col-span-9 max-w-[62ch] text-sm text-muted-foreground">
          Problem, approach, and the architecture that came out the other side — for the modules that earned a deeper look.
        </p>
      </div>

      <div className="space-y-16 md:space-y-24">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.n} delay={i * 60}>
            <article className="grid grid-cols-4 md:grid-cols-12 gap-6 border-t border-border pt-10">
              <div className="col-span-4 md:col-span-4">
                <div className="font-display text-[10px] uppercase tracking-widest text-primary mb-3">
                  [ {p.n} ] · {p.label}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-6">
                  {p.title}
                </h3>
                <dl className="space-y-6">
                  <div>
                    <dt className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      {'// Problem'}
                    </dt>
                    <dd className="text-sm text-foreground/90 leading-relaxed">
                      {p.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      {'// Approach'}
                    </dt>
                    <dd className="text-sm text-foreground/90 leading-relaxed">
                      {p.approach}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      {'// Impact'}
                    </dt>
                    <dd>
                      <ul className="space-y-2">
                        {p.impact.map((line, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-sm text-foreground/90"
                          >
                            <span className="text-primary font-display shrink-0">
                              ✓
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="col-span-4 md:col-span-8">
                <div className="border border-border bg-white/[0.02] h-full">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2 font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>architecture.txt</span>
                    <span className="text-primary">ASCII</span>
                  </div>
                  <pre className="p-4 md:p-6 overflow-x-auto no-scrollbar font-display text-[11px] md:text-xs leading-6 text-foreground/90">
{p.architecture.join("\n")}
                  </pre>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
