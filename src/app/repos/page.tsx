import type { Metadata } from "next";
import { ReposContent } from "@/components/ReposContent";

export const metadata: Metadata = {
  title: "Repo Analytics — Karthik Kulkarni | WakaTime Coding Activity",
  description:
    "Time spent across the arya-banking microservices platform — every repo, every day, straight from WakaTime heartbeats.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio/repos" },
  openGraph: {
    title: "Repo Analytics — Karthik Kulkarni | WakaTime Coding Activity",
    description:
      "Time spent across the arya-banking microservices platform — every repo, every day.",
    url: "https://kartik1502.github.io/portfolio/repos",
  },
};

export default function Repos() {
  return <ReposContent />;
}
