"use client";

import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";

const projects = [
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
      "Microservices banking platform with Eureka service registry, Spring Cloud Gateway with Keycloak authentication, and Feign Client inter-service communication. Database-per-service pattern with 5 dedicated MySQL instances.",
    tags: ["Spring Boot", "Microservices", "Eureka", "Keycloak", "MySQL"],
    href: "https://github.com/kartik1502/Spring-Boot-Microservices-Banking-Application",
    metrics: [
      { label: "GitHub Stars", value: "—" },
      { label: "Forks", value: "—" },
    ],
    repo: "kartik1502/Spring-Boot-Microservices-Banking-Application",
  },
];

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <AnimatedSection>
        <p className="section-label">Work</p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink uppercase tracking-[-0.01em] mb-3">
          Selected projects
        </h1>
        <p className="text-base text-body-strong max-w-xl">
          Proof, not adjectives. Here is what I have built and shipped.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-5 mt-12">
        {projects.map((project, i) => (
          <AnimatedSection key={project.title} delay={i * 0.1}>
            <ProjectCard {...project} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
