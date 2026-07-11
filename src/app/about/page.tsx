"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Calendar, Download, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const experience = [
  {
    role: "Backend Developer",
    company: "Arya Banking",
    period: "2025 - Present",
    description:
      "Architecting and building a 9-repository event-driven microservices platform with Spring Boot, Kafka, Keycloak, and HashiCorp Vault.",
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

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <AnimatedSection>
        <p className="section-label">About</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-neon">#</span> About Me
        </h1>
        <p className="section-subtitle">A bit about who I am and what I do.</p>
      </AnimatedSection>

      <div className="flex flex-col md:flex-row gap-16">
        <AnimatedSection className="flex-1">
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            I am a backend developer passionate about building scalable,
            event-driven systems. I specialize in Java, Spring Boot, and
            microservices architecture.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Currently, I am building the Arya Banking platform — a complete
            microservices ecosystem with 9 interconnected repositories covering
            service discovery, centralized configuration, API gateway, domain
            services, and infrastructure automation.
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2.5 text-gray-400 text-sm">
              <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center">
                <MapPin size={14} className="text-neon" />
              </div>
              India
            </div>
            <div className="flex items-center gap-2.5 text-gray-400 text-sm">
              <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center">
                <Calendar size={14} className="text-neon" />
              </div>
              3+ years of experience
            </div>
          </div>

          <Link
            href="mailto:kartikkulkarni1411@gmail.com"
            className="inline-flex items-center gap-2 bg-neon text-dark-950 px-6 py-3 rounded-xl font-semibold hover:bg-neon-dark transition-all duration-300 glow text-sm"
          >
            <Download size={16} /> Get in Touch
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Terminal size={16} className="text-neon" /> Experience
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {experience.map((exp) => (
              <motion.div key={exp.role} variants={itemVariants}>
                <div className="card p-6 border-l-2 border-l-neon/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{exp.role}</h4>
                      <p className="text-neon text-sm">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap px-2 py-1 rounded bg-white/5">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}
