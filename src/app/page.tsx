import type { Metadata } from "next";
import { HomeContent } from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Karthik Kulkarni — Backend Engineer | Java, Spring Boot, Kafka",
  description:
    "Backend engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices. Building high-volume payment systems at Citi via HCLTech with 2.5+ years of production experience.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio" },
};

export default function Home() {
  return <HomeContent />;
}
