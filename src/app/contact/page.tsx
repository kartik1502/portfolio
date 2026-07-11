"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { Mail, Globe, Link as LinkIcon, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <AnimatedSection>
        <p className="section-label">Contact</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-neon">#</span> Get in Touch
        </h1>
        <p className="section-subtitle">
          Want to collaborate or just say hi? Reach out through any channel
          below.
        </p>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-5"
      >
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <motion.div key={contact.label} variants={itemVariants}>
              <Link
                href={contact.href}
                target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                className="card p-6 flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors shrink-0">
                  <Icon size={20} className="text-neon" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">
                    {contact.label}
                  </p>
                  <p className="text-sm text-gray-200 group-hover:text-neon transition-colors truncate">
                    {contact.value}
                  </p>
                </div>
                <Send
                  size={14}
                  className="text-gray-500 group-hover:text-neon transition-colors shrink-0"
                />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
