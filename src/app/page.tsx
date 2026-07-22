"use client";

import Link from "next/link";
import { PROJECTS, STACK, METRICS, NOW, TESTIMONIALS } from "@/lib/portfolio-data";
import { RepoStat } from "@/components/RepoStat";
import { Reveal } from "@/components/Reveal";
import { Spotlight } from "@/components/Spotlight";
import { Typewriter } from "@/components/Typewriter";

export default function Home() {
  return (
    <>
      <section id="top" className="px-4 md:px-8 py-24 md:py-40 grid grid-cols-4 md:grid-cols-12 gap-6">
        <div className="col-span-4 md:col-span-8 animate-reveal">
          <div className="flex items-center gap-3 mb-8 font-display text-[10px] uppercase tracking-[0.25em] text-primary">
            <span className="relative inline-flex size-1.5 rounded-full bg-primary text-primary shadow-[0_0_10px_currentColor] ping-dot" />
            Senior Software Engineer · Java Specialist
          </div>
          <h2 className="font-display text-xl md:text-3xl font-semibold uppercase tracking-[0.15em] text-foreground mb-6 animate-reveal [animation-delay:150ms]">
          <Typewriter text="Hi, Karthik Kulkarni" speed={40} delay={500} loop loopPause={2500} />
          </h2>
          <h1 className="font-display text-5xl md:text-8xl font-extrabold tracking-tighter text-balance leading-[0.9] animate-glitch-hover">
            <span className="text-gradient-flow">ENGINEERING</span> <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px var(--color-foreground)" }}
            >
              SYSTEMS
            </span>{" "}
            OF <br />
            HIGH DENSITY<span className="text-primary animate-caret ml-1">_</span>
          </h1>
          <p className="mt-12 max-w-[52ch] text-lg text-muted-foreground text-pretty">
            2.5 years building high-volume payment systems at HCLTech[Citi]. Spring Boot, Kafka, event-driven microservices. Currently architecting a 9-repository platform.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="h-px w-12 bg-primary" />
            <span className="font-display text-xs uppercase tracking-[0.2em] text-primary">
              You design. I build the backend.
            </span>
          </div>
          <div className="mt-12 flex flex-wrap gap-4 font-display text-[10px] uppercase tracking-widest">
            <a
              href="#work"
              className="px-4 py-3 border border-border hover:border-primary transition-colors"
            >
              ↓ Jump to work
            </a>
            <Link
              href="/projects"
              className="px-4 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              See the work →
            </Link>
            <Link
              href="/contact"
              className="px-4 py-3 border border-border hover:border-primary transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <div className="col-span-4 md:col-span-4 flex flex-col justify-end items-start md:items-end animate-reveal [animation-delay:200ms]">
          <div className="font-display text-[10px] leading-relaxed text-muted-foreground uppercase tracking-tighter md:text-right">
            Role: Senior Software Engineer @ Citi<br />
            Focus: Distributed Payment Systems<br />
            Location: Bengaluru, IN<br />
            Status: Open_To_Opportunities
          </div>
        </div>
      </section>

      <section
        id="stack"
        aria-label="Tech stack"
        className="border-t border-b border-border bg-white/[0.02] overflow-hidden"
      >
        <div className="flex whitespace-nowrap animate-marquee font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <ul className="flex shrink-0 gap-8 px-4 md:px-8 py-4">
            {STACK.map((s) => (
              <li key={s} className="flex items-center gap-3 hover:text-primary transition-colors">
                <span className="size-1 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
          <ul aria-hidden className="flex shrink-0 gap-8 px-4 md:px-8 py-4">
            {STACK.map((s) => (
              <li key={`${s}-2`} className="flex items-center gap-3">
                <span className="size-1 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="metrics"
        className="px-4 md:px-8 py-20 md:py-28 border-b border-border"
      >
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 mb-10 items-end">
          <div className="col-span-4 md:col-span-6">
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              {'// Signal.log'}
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter leading-[0.95]">
              What 2.5 years at HCLTech [Citi] <br /> actually moved.
            </h2>
          </div>
          <p className="col-span-4 md:col-span-6 md:text-right text-sm text-muted-foreground max-w-[46ch] md:ml-auto">
            Numbers reflect owned scope on the APAC Payment Acceptance System — real SLAs, real reconciliation, real deploys.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-border border border-border">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 60}>
              <div className="bg-background p-6 h-full flex flex-col justify-between gap-6 hover:bg-primary/5 transition-colors">
                <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {m.note}
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                    {m.value}
                  </div>
                  <div className="mt-1 font-display text-[11px] uppercase tracking-widest">
                    {m.label}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="work" className="border-t border-border bg-white/[0.02] scroll-mt-24">
        <div className="px-4 md:px-8 py-4 border-b border-border flex justify-between items-center">
          <h2 className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            Selected_Modules.log
          </h2>
          <Link
            href="/projects"
            className="text-[10px] font-display uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            All work →
          </Link>
        </div>

        {PROJECTS.map((p, i) => (
          <Reveal key={p.n} as="article" delay={i * 80}>
          <Spotlight as="a"
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
                <div className="w-full aspect-video border border-border bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] flex flex-col justify-between p-6 group-hover:border-primary/50 group-hover:animate-grid-pan transition-colors tilt">
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
          </Spotlight>
          </Reveal>
        ))}
      </section>

      <section
        id="now"
        className="px-4 md:px-8 py-20 md:py-24 border-t border-border grid grid-cols-4 md:grid-cols-12 gap-6"
      >
        <div className="col-span-4 md:col-span-3">
          <div className="font-display text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
            /Now
          </div>
          <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">
            Updated Q3 2026
          </div>
        </div>
        <ul className="col-span-4 md:col-span-9 space-y-4">
          {NOW.map((n, i) => (
            <Reveal as="li" key={i} delay={i * 60}>
              <div className="flex gap-4 border-b border-border pb-4">
                <span className="font-display text-xs text-primary shrink-0 mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  {n}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        id="voices"
        className="px-4 md:px-8 py-20 md:py-28 border-t border-border bg-white/[0.02]"
      >
        <div className="font-display text-[10px] uppercase tracking-[0.3em] text-primary mb-10">
          {'// Field_Notes.txt'}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <blockquote className="bg-background p-8 md:p-10 h-full flex flex-col gap-6 hover:bg-primary/5 transition-colors">
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-primary/60"
                >
                  &ldquo;
                </span>
                <p className="text-lg md:text-xl leading-snug text-foreground/95 text-pretty">
                  {t.quote}
                </p>
                <footer className="mt-auto font-display text-[10px] uppercase tracking-widest text-muted-foreground">
                  — {t.who} · {t.where}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
