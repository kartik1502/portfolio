"use client";

import { CONTACT } from "@/lib/portfolio-data";

export default function Contact() {
  return (
    <section className="px-4 md:px-8 py-24 md:py-40">
      <div className="font-display text-[10px] uppercase tracking-[0.25em] text-primary mb-6">
        [ 05 ] · Connect
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
        <div>
          <h1 className="font-display text-5xl md:text-8xl font-extrabold tracking-tighter mb-10 leading-[0.9]">
            READY FOR <br /> <span className="text-primary">INTEGRATION?</span>
          </h1>
          <p className="max-w-[52ch] text-lg text-muted-foreground mb-10">
            Whether it&apos;s a microservices architecture, an event-driven system, or a backend that needs to scale — I&apos;m ready.
          </p>
          <a
            href={`mailto:${CONTACT.email}?subject=Project%20inquiry`}
            className="font-display text-xl md:text-2xl underline underline-offset-8 decoration-border hover:decoration-primary hover:text-primary transition-all break-all"
          >
            {CONTACT.email}
          </a>
        </div>
        <div className="w-full md:w-1/3 p-6 border border-border bg-white/5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <span className="font-display text-[9px] uppercase text-muted-foreground">
              Session_Status
            </span>
            <div className="size-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          </div>
          <p className="text-xs font-display text-muted-foreground leading-relaxed">
            Currently open to backend / microservices roles and consulting work. Response time: within 24 hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "GitHub", href: CONTACT.github, handle: "@kartik1502" },
          { label: "LinkedIn", href: CONTACT.linkedin, handle: "/in/kartik1502" },
          { label: "Email", href: `mailto:${CONTACT.email}`, handle: CONTACT.email },
        ].map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group p-6 border border-border hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-display text-[10px] uppercase tracking-widest text-primary">
                {c.label}
              </span>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
              </span>
            </div>
            <div className="font-display text-sm truncate">{c.handle}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
