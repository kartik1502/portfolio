import type { Metadata } from "next";
import { ContactContent } from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact — Karthik Kulkarni | Backend Engineer",
  description:
    "Get in touch with Karthik Kulkarni for backend engineering roles, microservices consulting, or system design collaboration.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio/contact" },
  openGraph: {
    title: "Contact — Karthik Kulkarni | Backend Engineer",
    description:
      "Get in touch for backend engineering roles, microservices consulting, or system design collaboration.",
    url: "https://kartik1502.github.io/portfolio/contact",
  },
};

export default function Contact() {
  return <ContactContent />;
}
