import Link from "next/link";
import { ExternalLink, FolderGit2 } from "lucide-react";

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
    <Link href={href} target="_blank" className="card p-7 block group h-full">
      <div className="flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
          <FolderGit2 size={20} className="text-neon" />
        </div>
        <ExternalLink
          size={18}
          className="text-gray-500 group-hover:text-neon transition-colors shrink-0 mt-1"
        />
      </div>
      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-neon transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs rounded-lg bg-white/5 text-gray-500 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
