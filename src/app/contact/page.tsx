"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { Mail, Globe, Link as LinkIcon, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const contacts = [
  {
    label: "Email",
    value: "kartikkulkarni1411@gmail.com",
    href: "mailto:kartikkulkarni1411@gmail.com?subject=Project%20inquiry%20from%20karthik.dev&body=Hi%20Karthik%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.",
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
    value: "karthikulkarni",
    href: "https://www.linkedin.com/in/karthikulkarni/",
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
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <AnimatedSection>
        <p className="section-label">Contact</p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink uppercase tracking-[-0.01em] mb-3">
          Get in touch
        </h1>
        <p className="text-base text-body-strong max-w-xl">
          Have a project or just want to chat? Send a message through any
          channel below.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-5 mt-12">
        {contacts.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <AnimatedSection key={contact.label} delay={i * 0.05}>
              <Link
                href={contact.href}
                target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                className="brutal-card p-5 flex items-center gap-4 group"
              >
                <div className="brutal-card__icon flex items-center justify-center w-10 h-10">
                  <Icon size={16} className="text-canvas" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-ink uppercase tracking-[1px] mb-0.5">
                    {contact.label}
                  </p>
                  <p className="text-sm text-body group-hover:text-ink transition-colors truncate">
                    {contact.value}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-muted group-hover:text-ink transition-colors shrink-0"
                />
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
