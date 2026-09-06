import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GridOverlay } from "@/components/GridOverlay";
import { Providers } from "./providers";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Karthik Kulkarni",
  url: siteUrl,
  jobTitle: "Senior Software Engineer",
  description:
    "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices.",
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Apache Kafka",
    "Microservices",
    "Event-Driven Architecture",
    "MongoDB",
    "Docker",
    "System Design",
  ],
  sameAs: [
    "https://github.com/kartik1502",
    "https://www.linkedin.com/in/kartik1502",
  ],
  worksFor: {
    "@type": "Organization",
    name: "HCLTech",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Karthik Kulkarni — Backend Engineer | Java, Spring Boot, Kafka",
    template: "%s | Karthik Kulkarni",
  },
  description:
    "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices. Building high-volume payment systems at HCLTech[Citi].",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  authors: [{ name: "Karthik Kulkarni", url: siteUrl }],
  creator: "Karthik Kulkarni",
  keywords: [
    "Karthik Kulkarni",
    "Backend Engineer",
    "Java Developer",
    "Spring Boot",
    "Apache Kafka",
    "Microservices",
    "Event-Driven Architecture",
    "Payment Systems",
    "Bengaluru",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Karthik Kulkarni — Portfolio",
    title: "Karthik Kulkarni — Backend Engineer | Java, Spring Boot, Kafka",
    description:
      "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices. Building high-volume payment systems.",
    images: [
      {
        url: "/portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karthik Kulkarni — Backend Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik Kulkarni — Backend Engineer | Java, Spring Boot, Kafka",
    description:
      "Senior software engineer specializing in Java, Spring Boot, Kafka, and event-driven microservices.",
    images: ["/portfolio/og-image.png"],
    creator: "@kartik1502",
  },
  verification: {},
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0a0f1e" />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jetbrainsMono.variable} ${inter.variable} font-body antialiased`}>
        <ScrollProgress />
        <ScrollToTop />
        <GridOverlay />
        <SiteNav />
        <main className="relative z-10"><Providers>{children}</Providers></main>
        <SiteFooter />
      </body>
    </html>
  );
}
