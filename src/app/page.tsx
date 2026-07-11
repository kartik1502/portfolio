"use client";

import Link from "next/link";
import { ArrowRight, Globe, Link as LinkIcon, Mail, ExternalLink } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const featuredProjects = [
  {
    title: "Arya Banking",
    description:
      "Event-driven banking platform with 7 microservices using Kafka-based async communication. Implemented authentication, user, admin, API gateway, and Config server services with Dockerized deployment.",
    tags: ["Spring Boot", "Kafka", "Keycloak", "Docker", "Microservices"],
    href: "https://github.com/Event-Based-Banking-Application",
    metrics: [
      { label: "Microservices", value: "7" },
      { label: "Setup Time", value: "5 min" },
    ],
    repo: "Event-Based-Banking-Application/.github",
  },
  {
    title: "Spring Boot Banking",
    description:
      "Microservices banking platform with Eureka service registry, Spring Cloud Gateway, Keycloak auth, and Feign Client communication. Database-per-service pattern with 5 dedicated MySQL instances.",
    tags: ["Spring Boot", "Microservices", "Eureka", "Keycloak", "MySQL"],
    href: "https://github.com/kartik1502/Spring-Boot-Microservices-Banking-Application",
    metrics: [
      { label: "GitHub Stars", value: "—" },
      { label: "Forks", value: "—" },
    ],
    repo: "kartik1502/Spring-Boot-Microservices-Banking-Application",
  },
];

const blogPosts = [
  { title: "Apache Kafka: Intro and Setup", href: "https://devscribbles.hashnode.dev/apache-kafka-intro-and-setup" },
  { title: "Spring Boot Tutorial: Spring Batch", href: "https://devscribbles.hashnode.dev/spring-boot-tutorial-spring-batch" },
  { title: "Mastering Microservices: Inter-Service Communication with Feign Client", href: "https://devscribbles.hashnode.dev/mastering-microservices-inter-service-communication-using-spring-cloud-feign-client-part-4" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-20">
          <div className="relative flex flex-col border border-hairline/60">
            <div className="absolute -left-px -top-px h-3 w-3 bg-m-blue-light" />
            <div className="absolute -bottom-px -left-px h-3 w-3 bg-m-blue-light" />
            <div className="absolute -right-px -top-px h-3 w-3 bg-m-blue-light" />
            <div className="absolute -bottom-px -right-px h-3 w-3 bg-m-blue-light" />

            <div className="relative z-20 grid md:grid-cols-5 gap-16 items-start p-8 md:p-12">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="md:col-span-3"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-medium text-m-blue-light uppercase tracking-[1.5px] mb-4"
                >
                  Senior software engineer · Java specialist
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1] tracking-[-0.02em] text-ink mb-6 uppercase"
                >
                  Karthik
                  <br />
                  <span className="gradient-text">Kulkarni</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-base text-body-strong leading-relaxed max-w-lg"
                >
                  2.5 years building high-volume payment systems at Citi.
                  Spring Boot, Kafka, event-driven microservices.
                  Currently architecting a 9-repository platform.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-5 mt-10"
                >
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-[1.5px] text-ink border border-ink px-6 py-3 hover:bg-ink hover:text-canvas transition-all duration-300"
                  >
                    See the work <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="mailto:kartikkulkarni1411@gmail.com?subject=Project%20inquiry%20from%20karthik.dev&body=Hi%20Karthik%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project."
                    className="inline-flex items-center gap-1.5 text-sm uppercase tracking-[1.5px] text-muted hover:text-ink transition-colors"
                  >
                    Get in touch →
                  </Link>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-5 mt-10"
                >
                  {[
                    { icon: Globe, href: "https://github.com/kartik1502" },
                    { icon: LinkIcon, href: "https://www.linkedin.com/in/karthikulkarni/" },
                    { icon: Mail, href: "mailto:kartikkulkarni1411@gmail.com" },
                  ].map(({ icon: Icon, href }) => (
                    <Link
                      key={href}
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      className="text-muted hover:text-ink transition-colors"
                    >
                      <Icon size={16} />
                    </Link>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="md:col-span-2"
              >
                <div className="brutal-card p-6">
                  <div className="brutal-card__header">
                    <div className="brutal-card__icon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                    </div>
                    <span className="brutal-card__title">Mindset</span>
                  </div>
                  <div className="brutal-card__body border-b-0 pb-0">
                    <p className="text-xl font-bold text-ink uppercase leading-tight">You design.</p>
                    <div className="w-6 h-0.5 bg-m-blue-light my-3" />
                    <p className="text-xl font-bold text-ink uppercase leading-tight">I build the backend.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tools ─── */}
      <section className="py-16 border-y border-hairline/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="m-stripe mb-8" />
          <AnimatedSection>
            <p className="section-label text-center mb-8">The stack</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Java", "Spring Boot", "Kafka", "Docker", "MongoDB", "Keycloak", "Microservices", "System Design"].map((skill) => (
                <div key={skill} className="brutal-card px-5 py-3">
                  <span className="text-sm font-bold text-ink uppercase tracking-[1px] whitespace-nowrap">{skill}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Featured Work ─── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label">Selected work</p>
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-ink uppercase tracking-[-0.01em]">
                Proof, not promises
              </h2>
              <Link
                href="/projects"
                className="hidden md:flex items-center gap-1 text-xs uppercase tracking-[1.5px] text-muted hover:text-ink transition-colors"
              >
                All work <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {featuredProjects.map((project, i) => (
              <AnimatedSection key={project.title} delay={i * 0.1}>
                <ProjectCard {...project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Writing strip ─── */}
      <section className="py-16 border-t border-hairline/50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="section-label">Latest writing</p>
            <div className="flex flex-col gap-0 mt-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  target="_blank"
                  className="group flex items-center justify-between py-4 border-b border-hairline/30 last:border-b-0"
                >
                  <span className="text-sm text-body group-hover:text-ink transition-colors leading-snug pr-4">
                    {post.title}
                  </span>
                  <ExternalLink size={13} className="text-muted group-hover:text-ink shrink-0" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 border-t border-hairline/50">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-xl">
              <p className="section-label">Let&apos;s talk</p>
              <h2 className="text-2xl md:text-3xl font-bold text-ink uppercase tracking-[-0.01em] mb-4">
                Have a project?
              </h2>
              <p className="text-base text-body-strong leading-relaxed mb-8">
                Whether it is a microservices architecture, an event-driven
                system, or a backend that needs to scale — I am ready.
              </p>
              <Link
                href="mailto:kartikkulkarni1411@gmail.com?subject=Project%20inquiry%20from%20karthik.dev&body=Hi%20Karthik%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project."
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[1.5px] text-ink border border-ink px-6 py-3 hover:bg-ink hover:text-canvas transition-all duration-300"
              >
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
