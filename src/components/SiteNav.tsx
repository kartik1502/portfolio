"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Index", n: "01" },
  { href: "/about", label: "About", n: "02" },
  { href: "/projects", label: "Projects", n: "03" },
  { href: "/writing", label: "Writing", n: "04" },
  { href: "/contact", label: "Connect", n: "05" },
];

export function SiteNav() {
  const pathname = usePathname();

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
    </nav>
  );
}
