import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — Karthik Kulkarni | Senior Software Engineer",
  description:
    "Java developer with 2.5+ years building high-volume payment processing systems at Citi. Specializing in Spring Boot, Spring Data JPA, and event-driven microservices.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio/about" },
  openGraph: {
    title: "About — Karthik Kulkarni | Senior Software Engineer",
    description:
      "Java developer with 2.5+ years building high-volume payment processing systems at Citi.",
    url: "https://kartik1502.github.io/portfolio/about",
  },
};

export default function About() {
  return <AboutContent />;
}
