import { Globe, Mail, Link as LinkIcon, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline/50">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted uppercase tracking-[1px]">
          © {new Date().getFullYear()} Karthik Kulkarni
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="https://github.com/kartik1502"
            target="_blank"
            className="text-muted hover:text-ink transition-colors"
          >
            <Globe size={16} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/karthikulkarni/"
            target="_blank"
            className="text-muted hover:text-ink transition-colors"
          >
            <LinkIcon size={16} />
          </Link>
          <Link
            href="https://twitter.com/Kartik1141"
            target="_blank"
            className="text-muted hover:text-ink transition-colors"
          >
            <MessageCircle size={16} />
          </Link>
          <Link
            href="mailto:kartikkulkarni1411@gmail.com"
            className="text-muted hover:text-ink transition-colors"
          >
            <Mail size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
