"use client";

import {
  EXPERIENCE, PROFICIENCY, CREDENTIALS, VALUES, TOOLBOX, BEYOND,
} from "@/lib/portfolio-data";
import { Reveal } from "@/components/Reveal";
import { SectionSubnav } from "@/components/SectionSubnav";

const META = [
  { label: "Role", value: "Senior Software Engineer" },
  { label: "Stack", value: "Java / Spring / Kafka" },
  { label: "Based", value: "Bengaluru, India" },
  { label: "Mode", value: "Remote · Open" },
  { label: "Exp", value: "2.5+ years" },
];

export default function About() {
  return (
    <>
      <section id="bio" className="px-4 md:px-8 py-24 md:py-32 grid grid-cols-4 md:grid-cols-12 gap-6 border-b border-border">
        <div className="col-span-4 md:col-span-8 animate-reveal">
          <div className="font-display text-[10px] uppercase tracking-[0.25em] text-primary mb-6">
            [ 02 ] · Work
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-10">
            ENGINEER <br />
            <span className="text-primary">& BUILDER</span>
          </h1>
          <p className="max-w-[56ch] text-lg text-muted-foreground text-pretty">
            Java Developer with 2.5 years of production experience building high-volume payment processing systems at Citi. I specialize in Spring Boot, Spring Data JPA, and event-driven microservices — owning end-to-end delivery from development through production with strict SLAs.
          </p>
        </div>
        <div className="col-span-4 md:col-span-4 md:border-l border-border md:pl-6 grid grid-cols-2 md:grid-cols-1 gap-6 content-start animate-reveal [animation-delay:200ms]">
          {META.map((m) => (
            <div key={m.label}>
              <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                {m.label}
              </div>
              <div className="font-display text-sm">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      <SectionSubnav
        ariaLabel="Page sections"
        items={[
          { id: "bio", label: "01 · Bio" },
          { id: "experience", label: "02 · Exp" },
          { id: "values", label: "03 · Values" },
          { id: "toolbox", label: "04 · Toolbox" },
          { id: "proficiency", label: "05 · Skills" },
          { id: "beyond", label: "06 · Beyond" },
          { id: "credentials", label: "07 · Certs" },
        ]}
      />

      <section id="experience" className="px-4 md:px-8 py-20 border-b border-border">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
          <div className="col-span-4 md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary sticky top-24">
              Experience.log
            </h2>
          </div>
          <div className="col-span-4 md:col-span-9 space-y-16">
            {EXPERIENCE.map((job) => (
              <article key={job.company} className="border-l-2 border-primary/40 pl-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                    {job.company}
                  </h3>
                  <span className="font-display text-[10px] uppercase tracking-widest text-primary">
                    {job.period}
                  </span>
                </div>
                <div className="font-display text-sm text-muted-foreground mb-1">
                  {job.role}
                </div>
                <div className="font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
                  {job.location}
                </div>
                <ul className="space-y-4">
                  {job.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="font-display text-primary shrink-0 mt-1">
                        0{i + 1}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="values"
        className="px-4 md:px-8 py-20 border-b border-border bg-white/[0.02]"
      >
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 mb-10">
          <Reveal from="left" className="col-span-4 md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Values.md
            </h2>
          </Reveal>
          <Reveal from="right" delay={80} className="col-span-4 md:col-span-9">
            <p className="max-w-[56ch] text-sm text-muted-foreground">
              The principles behind the code — how I make tradeoffs when nobody&apos;s watching.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} from="scale" delay={i * 90}>
              <div className="bg-background p-8 h-full hover:bg-primary/5 transition-colors">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display text-xs text-primary">[{v.n}]</span>
                  <h3 className="font-display text-lg font-bold tracking-tight">
                    {v.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="toolbox"
        className="px-4 md:px-8 py-20 border-b border-border"
      >
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
          <Reveal from="left" className="col-span-4 md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary sticky top-32">
              Toolbox.yaml
            </h2>
          </Reveal>
          <div className="col-span-4 md:col-span-9 divide-y divide-border border-y border-border">
            {TOOLBOX.map((g, i) => (
              <Reveal key={g.group} from="right" delay={i * 70}>
                <div className="py-6 grid grid-cols-4 md:grid-cols-9 gap-4 items-start">
                  <div className="col-span-4 md:col-span-3 font-display text-[11px] uppercase tracking-widest text-muted-foreground">
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>{" "}
                    {g.group}
                  </div>
                  <div className="col-span-4 md:col-span-6 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="px-2.5 py-1 border border-border text-[10px] font-display uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="proficiency" className="px-4 md:px-8 py-20 border-b border-border">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
          <div className="col-span-4 md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Proficiency.chart
            </h2>
          </div>
          <div className="col-span-4 md:col-span-9 space-y-4">
            {PROFICIENCY.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between font-display text-xs uppercase tracking-widest mb-1.5">
                  <span>{p.name}</span>
                  <span className="text-primary">{p.value}%</span>
                </div>
                <div className="h-1.5 border border-border">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${p.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="beyond"
        className="px-4 md:px-8 py-20 border-b border-border bg-white/[0.02]"
      >
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 mb-10">
          <Reveal from="left" className="col-span-4 md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Beyond_Code
            </h2>
          </Reveal>
          <Reveal from="right" delay={80} className="col-span-4 md:col-span-9">
            <p className="max-w-[56ch] text-sm text-muted-foreground">
              What I read, teach, and do when the IDE is closed.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {BEYOND.map((b, i) => (
            <Reveal key={b.title} from="scale" delay={i * 90}>
              <article className="bg-background p-6 md:p-8 h-full hover:bg-primary/5 transition-colors">
                <h3 className="font-display text-base font-bold tracking-tight mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="credentials" className="px-4 md:px-8 py-20">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6">
          <div className="col-span-4 md:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Credentials
            </h2>
          </div>
          <div className="col-span-4 md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
            {CREDENTIALS.map((c) => {
              const inner = (
                <div className="p-6 border border-border h-full hover:border-primary transition-colors">
                  <div className="font-display text-[10px] uppercase tracking-widest text-primary mb-3">
                    {c.issuer} {c.year && `· ${c.year}`}
                  </div>
                  <div className="font-display text-lg font-bold">
                    {c.title}
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.title} href={c.href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={c.title}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
