import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GridOverlay } from "@/components/GridOverlay";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://kartik1502.github.io/portfolio";

export const metadata: Metadata = {
  title: "Karthik Kulkarni — Backend Engineer",
  description:
    "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  authors: [{ name: "Karthik Kulkarni" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Karthik Kulkarni",
    title: "Karthik Kulkarni — Backend Engineer",
    description:
      "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices.",
    url: siteUrl,
    images: [{ url: "/portfolio/og-image.png", width: 1200, height: 630, alt: "Karthik Kulkarni" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik Kulkarni — Backend Engineer",
    description:
      "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices.",
    images: ["/portfolio/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} ${inter.variable} font-body antialiased`}>
        <ScrollProgress />
        <ScrollToTop />
        <GridOverlay />
        <SiteNav />
        <main className="relative z-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
