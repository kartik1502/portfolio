import { Mail, Globe, Link as LinkIcon, MessageCircle, MapPin } from "lucide-react";
import Link from "next/link";

const contacts = [
  {
    label: "Email",
    value: "kartikkulkarni1411@gmail.com",
    href: "mailto:kartikkulkarni1411@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "kartik1502",
    href: "https://github.com/kartik1502",
    icon: Globe,
  },
  {
    label: "LinkedIn",
    value: "karthik-kulkarni-ka1411",
    href: "https://linkedin.com/in/karthik-kulkarni-ka1411/",
    icon: LinkIcon,
  },
  {
    label: "Twitter / X",
    value: "@Kartik1141",
    href: "https://twitter.com/Kartik1141",
    icon: MessageCircle,
  },
];

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        <span className="text-neon">#</span> Contact
      </h1>
      <p className="text-gray-400 mb-12">
        Want to collaborate or just say hi? Reach out through any channel below.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <Link
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              className="card p-6 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center group-hover:bg-neon/10 transition-colors">
                <Icon size={22} className="text-neon" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{contact.label}</p>
                <p className="text-sm text-gray-200 group-hover:text-neon transition-colors">
                  {contact.value}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
