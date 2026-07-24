"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Index", n: "01" },
  { href: "/about", label: "About", n: "02" },
  { href: "/projects", label: "Projects", n: "03" },
  { href: "/writing", label: "Writing", n: "04" },
  { href: "/changelog", label: "Changelog", n: "05" },
  { href: "/contact", label: "Connect", n: "06" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-4 md:px-8 py-6 flex justify-between items-baseline border-b border-border bg-background/80 backdrop-blur-md">
      <Link href="/" className="font-display font-extrabold text-xl tracking-tighter">
        KARTIK <span className="text-primary">.SYS</span>
      </Link>

      <div className="hidden sm:flex gap-6 md:gap-8 text-[10px] font-display uppercase tracking-widest">
        {LINKS.map((l) => {
          const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-primary transition-colors ${isActive ? "text-primary" : ""}`}
            >
              [ {l.n} ] {l.label}
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="sm:hidden font-display text-xs uppercase tracking-widest hover:text-primary transition-colors"
        aria-label="Toggle menu"
      >
        {menuOpen ? "[ CLOSE ]" : "[ MENU ]"}
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 top-[57px] bg-black/40 sm:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed right-0 top-[57px] w-64 border-l border-border bg-background p-6 sm:hidden flex flex-col gap-4 shadow-xl">
            {LINKS.map((l) => {
              const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-display text-sm uppercase tracking-widest hover:text-primary transition-colors ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  [ {l.n} ] {l.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
}
