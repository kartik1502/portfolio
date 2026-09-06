import type { Metadata } from "next";
import { ChangelogContent } from "@/components/ChangelogContent";

export const metadata: Metadata = {
  title: "Changelog — Karthik Kulkarni | Activity Log",
  description:
    "A running record of work done — feature additions, fixes, refactors, and infrastructure changes on the arya-banking platform.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio/changelog" },
  openGraph: {
    title: "Changelog — Karthik Kulkarni | Activity Log",
    description:
      "A running record of work done — feature additions, fixes, refactors, and infrastructure changes.",
    url: "https://kartik1502.github.io/portfolio/changelog",
  },
};

export default function Changelog() {
  return <ChangelogContent />;
}
