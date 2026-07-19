import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import InteractiveDots from "@/components/InteractiveDots";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://kartik1502.github.io/portfolio";

export const metadata: Metadata = {
  title: {
    template: "%s | Karthik Kulkarni",
    default: "Karthik Kulkarni — Java & Spring Boot Microservices Engineer",
  },
  description:
    "Java Developer with 2.5 years of production experience building high-volume payment processing systems at Citi. Spring Boot, Kafka, event-driven microservices.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    siteName: "Karthik Kulkarni",
    title: "Karthik Kulkarni — Java & Spring Boot Microservices Engineer",
    description:
      "Java Developer with 2.5 years of production experience building high-volume payment processing systems at Citi. Spring Boot, Kafka, event-driven microservices.",
    url: siteUrl,
    images: [
      {
        url: "/portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karthik Kulkarni — Java & Spring Boot Microservices Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik Kulkarni — Java & Spring Boot Microservices Engineer",
    description:
      "Java Developer with 2.5 years of production experience building high-volume payment processing systems at Citi.",
    images: ["/portfolio/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Karthik Kulkarni",
      description:
        "Java Developer with 2.5 years of production experience building high-volume payment processing systems at Citi. Spring Boot, Kafka, event-driven microservices.",
      inLanguage: "en-US",
      publisher: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Karthik Kulkarni",
        url: siteUrl,
        image: `${siteUrl}/og-image.png`,
        sameAs: [
          "https://github.com/kartik1502",
          "https://www.linkedin.com/in/karthikulkarni/",
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Karthik Kulkarni",
      givenName: "Karthik",
      familyName: "Kulkarni",
      jobTitle: "Senior Software Engineer",
      description:
        "Java Developer with 2.5 years of production experience building high-volume payment processing systems at Citi. Spring Boot, Kafka, event-driven microservices.",
      url: siteUrl,
      image: `${siteUrl}/og-image.png`,
      sameAs: [
        "https://github.com/kartik1502",
        "https://www.linkedin.com/in/karthikulkarni/",
      ],
      knowsAbout: [
        "Java",
        "Spring Boot",
        "Apache Kafka",
        "Microservices",
        "System Design",
        "Docker",
        "MongoDB",
        "Keycloak",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://github.com/Event-Based-Banking-Application#softwareapplication",
      name: "Arya Banking",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Linux, Windows, macOS",
      description:
        "Event-driven banking platform with 7 microservices using Kafka-based async communication. Implemented authentication, user, admin, API gateway, and Config server services with Dockerized deployment.",
      url: "https://github.com/Event-Based-Banking-Application",
      author: {
        "@id": `${siteUrl}/#person`,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        <CustomCursor />
        <InteractiveDots />
        <Navbar />
        <div className="m-stripe" />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
