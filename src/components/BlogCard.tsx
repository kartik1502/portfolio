import Link from "next/link";
import { ExternalLink, Calendar } from "lucide-react";

interface BlogCardProps {
  title: string;
  href: string;
}

export default function BlogCard({ title, href }: BlogCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className="card p-5 block group"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm text-gray-200 group-hover:text-neon transition-colors leading-relaxed">
          {title}
        </h3>
        <ExternalLink
          size={16}
          className="text-gray-500 group-hover:text-neon transition-colors shrink-0 mt-0.5"
        />
      </div>
    </Link>
  );
}
