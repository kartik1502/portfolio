import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
}: ProjectCardProps) {
  return (
    <Link href={href} target="_blank" className="card p-6 block group">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-neon transition-colors">
          {title}
        </h3>
        <ExternalLink
          size={18}
          className="text-gray-500 group-hover:text-neon transition-colors shrink-0"
        />
      </div>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs rounded-md bg-dark-700 text-gray-400 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
