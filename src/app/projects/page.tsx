"use client";

import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Arya Banking",
    description:
      "Event-driven microservices platform across 9 repositories. Uses Spring Boot, Kafka, Keycloak, Vault, and Eureka. Features service discovery, centralized config, API gateway, and comprehensive documentation.",
    tags: ["Spring Boot", "Kafka", "Keycloak", "Vault", "Docker"],
    href: "https://github.com/Event-Based-Banking-Application",
  },
  {
    title: "Banking Application",
    description:
      "Microservices-based banking system with service discovery (Eureka), API gateway (Spring Cloud Gateway), and centralized configuration (Spring Cloud Config).",
    tags: ["Spring Boot", "Microservices", "Eureka", "Docker"],
    href: "https://github.com/kartik1502/Spring-Boot-Microservices-Banking-Application",
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

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <AnimatedSection>
        <p className="section-label">Work</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-neon">#</span> Projects
        </h1>
        <p className="section-subtitle">
          Things I have built and am currently building.
        </p>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={itemVariants}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
