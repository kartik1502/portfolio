"use client";

import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Link as LinkIcon,
  Mail,
  Terminal,
  Database,
  Cloud,
  Code2,
  ChevronDown,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const skills = [
  {
    category: "Languages",
    icon: Code2,
    items: ["Java", "Python", "C", "C++", "PHP"],
  },
  {
    category: "Frameworks",
    icon: Terminal,
    items: ["Spring Boot", "Spring Cloud", "Spring Security", "Hibernate"],
  },
  {
    category: "Databases & Messaging",
    icon: Database,
    items: ["MongoDB", "MySQL", "Apache Kafka"],
  },
  {
    category: "Tools",
    icon: Cloud,
    items: ["Docker", "Git", "Postman", "Swagger"],
  },
];

const featuredProjects = [
  {
    title: "Arya Banking",
    description:
      "Event-driven microservices platform with Spring Boot, Kafka, Keycloak, Vault, and Eureka across 9 interconnected repositories.",
    tags: ["Spring Boot", "Kafka", "Keycloak", "Vault", "Docker"],
    href: "https://github.com/Event-Based-Banking-Application",
  },
  {
    title: "Banking Application",
    description:
      "Microservices-based banking system with Eureka service discovery, Spring Cloud Gateway, and centralized configuration.",
    tags: ["Spring Boot", "Microservices", "Eureka", "Docker"],
    href: "https://github.com/kartik1502/Spring-Boot-Microservices-Banking-Application",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full pt-12 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-neon text-sm font-mono mb-4 flex items-center gap-2"
              >
                <span className="w-8 h-[1px] bg-neon/50" />
                Hi, my name is
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-3 tracking-tight"
              >
                Karthik
                <br />
                <span className="gradient-text">Kulkarni</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="text-gray-400 text-lg">
                  Backend Developer & Java Enthusiast
                </span>
                <Sparkles size={18} className="text-neon" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-gray-500 leading-relaxed max-w-lg mb-8"
              >
                I build scalable event-driven microservices. Currently
                architecting the{" "}
                <span className="text-neon">Arya Banking</span> platform — a
                9-repository ecosystem powering digital banking backend systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-neon text-dark-950 px-6 py-3 rounded-xl font-semibold hover:bg-neon-dark transition-all duration-300 glow text-sm"
                >
                  View Projects <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/10 text-gray-300 px-6 py-3 rounded-xl hover:border-neon/40 hover:text-neon transition-all duration-300 text-sm"
                >
                  Contact Me
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-5 mt-8"
              >
                {[
                  { icon: Globe, href: "https://github.com/kartik1502" },
                  {
                    icon: LinkIcon,
                    href: "https://linkedin.com/in/karthik-kulkarni-ka1411/",
                  },
                  {
                    icon: Mail,
                    href: "mailto:kartikkulkarni1411@gmail.com",
                  },
                ].map(({ icon: Icon, href }) => (
                  <Link
                    key={href}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-neon hover:border-neon/30 hover:bg-neon/5 transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="hidden md:flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-neon/10 via-dark-800 to-neon-purple/10 glow-border flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 shimmer" />
                  <Terminal size={80} className="text-neon opacity-30" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-xl bg-neon/5 border border-neon/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-neon text-3xl font-bold">{">"}</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-xl bg-neon-purple/5 border border-neon-purple/20 flex items-center justify-center backdrop-blur-sm">
                  <Code2 size={28} className="text-neon-purple" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown
            size={20}
            className="text-gray-500 animate-bounce"
          />
        </motion.div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label">Technologies</p>
            <h2 className="section-title">
              <span className="text-neon">#</span> Tech Stack
            </h2>
            <p className="section-subtitle">
              Tools and technologies I work with daily.
            </p>
          </AnimatedSection>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-5"
          >
            {skills.map((group) => (
              <motion.div key={group.category} variants={itemVariants}>
                <div className="card p-6 h-full">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-neon/10 flex items-center justify-center">
                      <group.icon size={16} className="text-neon" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-300">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs rounded-lg bg-white/5 text-gray-400 border border-white/5 hover:border-neon/30 hover:text-neon transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label">Work</p>
                <h2 className="section-title mb-0">
                  <span className="text-neon">#</span> Featured Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden md:flex items-center gap-1.5 text-sm text-gray-400 hover:text-neon transition-colors group"
              >
                View all{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </AnimatedSection>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {featuredProjects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection delay={0.2}>
            <Link
              href="/projects"
              className="md:hidden flex items-center justify-center gap-1.5 text-sm text-neon mt-8"
            >
              View all projects <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="card p-12 md:p-16 text-center glow-border border-neon/10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let&apos;s{" "}
                <span className="gradient-text">Build Something</span> Together
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">
                Have a project in mind or just want to chat about microservices?
                I&apos;m always open to interesting conversations.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-neon text-dark-950 px-6 py-3 rounded-xl font-semibold hover:bg-neon-dark transition-all duration-300 glow text-sm"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
