import type { Metadata } from "next";
import { WritingContent } from "@/components/WritingContent";

export const metadata: Metadata = {
  title: "Writing — Karthik Kulkarni | Kafka, Spring Boot, Microservices",
  description:
    "Technical articles on Apache Kafka, Spring Boot, microservices patterns, and backend engineering. Published on Hashnode.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio/writing" },
  openGraph: {
    title: "Writing — Karthik Kulkarni | Kafka, Spring Boot, Microservices",
    description:
      "Technical articles on Apache Kafka, Spring Boot, microservices patterns, and backend engineering.",
    url: "https://kartik1502.github.io/portfolio/writing",
  },
};

export default function Writing() {
  return <WritingContent />;
}
