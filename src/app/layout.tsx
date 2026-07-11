import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Karthik Kulkarni | Backend Developer",
  description:
    "Backend developer specializing in Java, Spring Boot, and Microservices. Building event-driven systems at scale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
