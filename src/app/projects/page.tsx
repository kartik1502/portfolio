import type { Metadata } from "next";
import { ProjectsContent } from "@/components/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects — Karthik Kulkarni | Fintech Backend Engineering",
  description:
    "Distributed systems and microservices platforms — architecture, tradeoffs, and code. Featuring Arya Banking, an event-driven platform with Kafka, Avro, and transactional outbox.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio/projects" },
  openGraph: {
    title: "Projects — Karthik Kulkarni | Fintech Backend Engineering",
    description:
      "Distributed systems and microservices platforms — architecture, tradeoffs, and code.",
    url: "https://kartik1502.github.io/portfolio/projects",
  },
};

export default function Projects() {
  return <ProjectsContent />;
}
