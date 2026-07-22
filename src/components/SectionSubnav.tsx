"use client";

import { useEffect } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export type SubnavItem = { id: string; label: string };

export function SectionSubnav({
  items,
  ariaLabel,
}: {
  items: SubnavItem[];
  ariaLabel: string;
}) {
  const active = useScrollSpy(items.map((i) => i.id));

  useEffect(() => {
    if (typeof window === "undefined" || !active) return;
    const current = window.location.hash.replace(/^#/, "");
    if (current === active) return;
    const url = `${window.location.pathname}${window.location.search}#${active}`;
    window.history.replaceState(window.history.state, "", url);
  }, [active]);

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-[64px] md:top-[73px] z-40 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar px-4 md:px-8 py-2.5 md:py-3 font-display text-[10px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        <span className="text-primary shrink-0">Jump →</span>
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              aria-current={isActive ? "location" : undefined}
              data-active={isActive || undefined}
              className={`shrink-0 relative pb-0.5 transition-colors hover:text-primary ${
                isActive ? "text-primary" : ""
              }`}
            >
              {it.label}
              <span
                aria-hidden
                className={`pointer-events-none absolute left-0 -bottom-[7px] md:-bottom-[9px] h-[2px] bg-primary transition-all duration-300 ease-out ${
                  isActive ? "w-full opacity-100 shadow-[0_0_8px_hsl(var(--primary)/0.6)]" : "w-0 opacity-0"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
