"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 140): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const idsKey = ids.join("|");

  useEffect(() => {
    if (typeof window === "undefined" || ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        if (visible.size > 0) {
          let best: string | null = null;
          let bestTop = Infinity;
          for (const id of visible.keys()) {
            const el = document.getElementById(id);
            if (!el) continue;
            const top = el.getBoundingClientRect().top - offset;
            if (top <= 0 && top > -window.innerHeight && Math.abs(top) < bestTop) {
              bestTop = Math.abs(top);
              best = id;
            }
          }
          if (!best) {
            for (const id of ids) if (visible.has(id)) { best = id; break; }
          }
          if (best) setActive(best);
        } else {
          let candidate: string | null = null;
          for (const el of elements) {
            if (el.getBoundingClientRect().top - offset <= 0) candidate = el.id;
          }
          if (candidate) setActive(candidate);
        }
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, offset]);

  return active;
}
