"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    title: "Apache Kafka: Intro and Setup",
    href: "https://devscribbles.hashnode.dev/apache-kafka-intro-and-setup",
  },
  {
    title: "Spring Boot Tutorial: Spring Batch",
    href: "https://devscribbles.hashnode.dev/spring-boot-tutorial-spring-batch",
  },
  {
    title:
      "Mastering Microservices: Inter-Service Communication using Spring Cloud Feign Client Part 4",
    href: "https://devscribbles.hashnode.dev/mastering-microservices-inter-service-communication-using-spring-cloud-feign-client-part-4",
  },
  {
    title:
      "Mastering Microservices: Inter-Service Communication using Spring Cloud Feign Client Part 3",
    href: "https://devscribbles.hashnode.dev/mastering-microservices-inter-service-communication-using-spring-cloud-feign-client-part-3",
  },
  {
    title:
      "Mastering Microservices: Inter-Service Communication using Spring Cloud Feign Client Part 2",
    href: "https://devscribbles.hashnode.dev/mastering-microservices-inter-service-communication-using-spring-cloud-feign-client-part-2",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
      <AnimatedSection>
        <p className="section-label">Writing</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-neon">#</span> Blog
        </h1>
        <p className="section-subtitle">
          Thoughts on Java, Spring Boot, microservices, and backend engineering.
        </p>
        <Link
          href="https://devscribbles.hashnode.dev"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm text-neon hover:underline mb-12"
        >
          Visit Hashnode <ExternalLink size={14} />
        </Link>
      </AnimatedSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {posts.map((post) => (
          <motion.div key={post.href} variants={itemVariants}>
            <Link
              href={post.href}
              target="_blank"
              className="card p-5 flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors">
                <BookOpen size={16} className="text-neon" />
              </div>
              <span className="flex-1 text-sm text-gray-300 group-hover:text-neon transition-colors leading-relaxed">
                {post.title}
              </span>
              <ExternalLink
                size={16}
                className="text-gray-500 group-hover:text-neon transition-colors shrink-0"
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
