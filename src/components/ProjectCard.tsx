import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LiveMetrics from "@/components/LiveMetrics";

interface Metric {
  label: string;
  value: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  metrics?: Metric[];
  repo?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  metrics,
  repo,
}: ProjectCardProps) {
  return (
    <Link href={href} target="_blank" className="brutal-card p-5 block group h-full">
      <div className="brutal-card__header">
        <div className="brutal-card__icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>
        <span className="brutal-card__title">{title}</span>
        <ArrowUpRight
          size={16}
          className="text-muted group-hover:text-ink transition-colors shrink-0 ml-auto"
        />
      </div>
      <div className="brutal-card__body mb-4">
        {description}
      </div>
      {repo ? (
        <LiveMetrics repo={repo} />
      ) : metrics ? (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {metrics.map((m) => (
            <div key={m.label} className="border-2 border-m-blue-light/30 px-3 py-2">
              <p className="text-base font-bold text-ink">{m.value}</p>
              <p className="text-xs text-muted uppercase tracking-[1px]">{m.label}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs uppercase tracking-[1px] text-body border border-m-blue-light/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
