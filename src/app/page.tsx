import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Karthik Kulkarni — Backend Engineer | Java, Spring Boot, Kafka",
  description:
    "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices. Building high-volume payment systems at HCLTech[Citi] with 2.5+ years of production experience.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio" },
  openGraph: {
    title: "Karthik Kulkarni — Backend Engineer | Java, Spring Boot, Kafka",
    description:
      "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices. Building high-volume payment systems.",
    url: "https://kartik1502.github.io/portfolio",
  },
};

export default function Home() {
  return <HomeContent />;
}
