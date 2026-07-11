import { Globe, Mail, Link as LinkIcon, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Karthik Kulkarni
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/kartik1502"
            target="_blank"
            className="text-gray-500 hover:text-neon transition-colors"
          >
            <Globe size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/karthik-kulkarni-ka1411/"
            target="_blank"
            className="text-gray-500 hover:text-neon transition-colors"
          >
            <LinkIcon size={20} />
          </Link>
          <Link
            href="https://twitter.com/Kartik1141"
            target="_blank"
            className="text-gray-500 hover:text-neon transition-colors"
          >
            <MessageCircle size={20} />
          </Link>
          <Link
            href="mailto:kartikkulkarni1411@gmail.com"
            className="text-gray-500 hover:text-neon transition-colors"
          >
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
