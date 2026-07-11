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

export const metadata: Metadata = {
  title: "Karthik Kulkarni",
  description:
    "Java Developer with 2.5 years of production experience building high-volume payment processing systems at Citi. Spring Boot, Kafka, event-driven microservices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
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
