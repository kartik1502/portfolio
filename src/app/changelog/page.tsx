import type { Metadata } from "next";
import { ChangelogContent } from "@/components/ChangelogContent";

export const metadata: Metadata = {
  title: "Changelog — Karthik Kulkarni | Activity Log",
  description:
    "A running record of work done across my projects and open-source contributions — features, fixes, refactors, and infrastructure changes.",
  alternates: { canonical: "https://kartik1502.github.io/portfolio/changelog" },
  openGraph: {
    title: "Changelog — Karthik Kulkarni | Activity Log",
    description:
      "A running record of work done across my projects and open-source contributions.",
    url: "https://kartik1502.github.io/portfolio/changelog",
  },
};

export default function Changelog() {
  return <ChangelogContent />;
}
