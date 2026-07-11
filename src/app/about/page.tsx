"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { Terminal, Award, ArrowRight, MapPin, Code2 } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experience = [
  {
    role: "SENIOR SOFTWARE ENGINEER",
    company: "HCLTECH (CLIENT: CITI)",
    period: "FEB 2024 — PRESENT",
    location: "Bengaluru, Karnataka",
    highlights: [
      "Architected transaction processing for APAC region with Kafka event-driven architecture, processing thousands of transactions daily with zero compliance incidents.",
      "Engineered multi-country Payment service consuming and validating cross-border transactions across diverse regional formats, reducing manual reconciliation effort by 80%.",
      "Owned Payment Acceptance System (PAS) transaction pipeline end-to-end, optimizing Kafka consumers and MongoDB queries to consistently meet 2-second per-transaction SLA.",
      "Onboarded pre-sanctions screening service to the regional team, reducing dependency on core banking systems by offloading compliance checks to an independent microservice.",
      "Designed Payer ID resolution service, reducing new country onboarding time from 2 days to 3-4 hours (85% faster), eliminating 95% of country-specific code changes.",
      "Collaborated with product and compliance teams to translate regional regulatory requirements into technical specifications, delivering 4 quarterly releases on schedule with zero production defects.",
    ],
  },
];

const skillGroups = [
  { label: "Java", pct: 95 },
  { label: "Spring Boot", pct: 92 },
  { label: "Microservices", pct: 88 },
  { label: "Kafka", pct: 78 },
  { label: "Docker", pct: 80 },
  { label: "MongoDB", pct: 75 },
  { label: "Spring Security", pct: 82 },
  { label: "System Design", pct: 72 },
];

function SkillBar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-body uppercase tracking-[1px]">{label}</span>
        <span className="text-ink font-bold">{pct}%</span>
      </div>
      <div className="h-[3px] bg-surface-card overflow-hidden border border-m-blue-light/20">
        <motion.div
          className="h-full bg-m-blue-light"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
      {/* ─── Header ─── */}
      <AnimatedSection>
        <p className="section-label">Work</p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink uppercase tracking-[-0.01em] mb-4">
          Engineer & builder
        </h1>
        <p className="text-base text-body-strong max-w-2xl leading-relaxed">
          Java Developer with 2.5 years of production experience building
          high-volume payment processing systems at Citi. I specialize in Spring Boot,
          Spring Data JPA, and event-driven microservices — owning end-to-end delivery
          from development through production with strict SLAs.
        </p>
      </AnimatedSection>

      {/* ─── Spec grid ─── */}
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-5 mt-10 mb-16 brutal-card p-0 overflow-hidden">
          {[
            { label: "Role", value: "Senior Software Engineer" },
            { label: "Stack", value: "Java / Spring / Kafka" },
            { label: "Based", value: "Bengaluru, India" },
            { label: "Mode", value: "Remote · Open" },
            { label: "Exp", value: "2.5+ years" },
          ].map((item, i) => (
            <div key={item.label} className="p-5 border-r last:border-r-0 border-m-blue-light/20">
              <p className="text-xs text-muted uppercase tracking-[1.5px] mb-1">{item.label}</p>
              <p className="text-sm font-bold text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ─── Two columns ─── */}
      <div className="flex flex-col lg:flex-row gap-16">
        {/* ─── Left: Experience ─── */}
        <AnimatedSection className="flex-[2]">
          <h3 className="text-sm font-bold text-ink uppercase tracking-[1.5px] mb-5 flex items-center gap-2">
            <Terminal size={14} className="text-m-blue-light" /> Experience
          </h3>
          <div className="brutal-card p-5">
            <div className="brutal-card__header">
              <div className="brutal-card__icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm-6-4h8v2h-8v-2z" />
                </svg>
              </div>
              <span className="brutal-card__title">{experience[0].company}</span>
              <span className="text-xs text-muted uppercase tracking-[1px] ml-auto shrink-0">{experience[0].period}</span>
            </div>
            <p className="text-sm font-medium text-m-blue-light uppercase tracking-[1px] mb-3">{experience[0].role}</p>
            <p className="text-xs text-muted flex items-center gap-1 mb-4">
              <MapPin size={12} /> {experience[0].location}
            </p>
            <ul className="space-y-3">
              {experience[0].highlights.map((h, i) => (
                <li key={i} className="text-sm text-body leading-relaxed flex gap-3">
                  <span className="text-m-blue-light mt-1 shrink-0">●</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* ─── Right: Proficiency + Cert + CTA ─── */}
        <AnimatedSection delay={0.15} className="flex-1 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-ink uppercase tracking-[1.5px] mb-5 flex items-center gap-2">
              <Code2 size={14} className="text-m-blue-light" /> Proficiency
            </h3>
            <div className="brutal-card p-5 space-y-4">
              {skillGroups.map((skill) => (
                <SkillBar key={skill.label} label={skill.label} pct={skill.pct} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-ink uppercase tracking-[1.5px] mb-4 flex items-center gap-2">
              <Award size={14} className="text-m-blue-light" /> Credentials
            </h3>
            <div className="brutal-card p-5">
              <div className="brutal-card__header">
                <div className="brutal-card__icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                  </svg>
                </div>
                <a href="https://learn.microsoft.com/api/credentials/share/en-us/KarthikBanuKulkarni-3822/F3E8EB6DA5B638F1?sharingId=6B658AF77CCC44" target="_blank" className="brutal-card__title text-sm hover:text-m-blue-light transition-colors">GitHub Copilot Certification</a>
              </div>
              <p className="text-xs text-muted uppercase tracking-[1px]">Microsoft / GitHub 2025</p>
              <div className="mt-3 pt-3 border-t-2 border-m-red/40 flex flex-wrap items-center gap-3 text-xs text-muted uppercase tracking-[1px]">
                <span className="flex items-center gap-1"><Award size={12} className="text-m-blue-light" /> B.E Computer Science</span>
                <span className="flex items-center gap-1"><MapPin size={12} className="text-m-blue-light" /> Bengaluru</span>
              </div>
            </div>
          </div>

          <Link
            href="mailto:kartikkulkarni1411@gmail.com?subject=Project%20inquiry%20from%20karthik.dev&body=Hi%20Karthik%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project."
            className="brutal-card__btn"
          >
            Get in touch <ArrowRight size={14} className="inline" />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
