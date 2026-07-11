import BlogCard from "@/components/BlogCard";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title:
      "Apache Kafka: Intro and Setup",
    href: "https://devscribbles.hashnode.dev/apache-kafka-intro-and-setup",
  },
  {
    title:
      "Spring Boot Tutorial: Spring Batch",
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

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        <span className="text-neon">#</span> Blog
      </h1>
      <p className="text-gray-400 mb-2">
        Thoughts on Java, Spring Boot, microservices, and backend engineering.
      </p>

      <Link
        href="https://devscribbles.hashnode.dev"
        target="_blank"
        className="inline-flex items-center gap-1 text-sm text-neon hover:underline mb-10"
      >
        Visit Hashnode <ExternalLink size={14} />
      </Link>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <BlogCard key={post.href} {...post} />
        ))}
      </div>
    </div>
  );
}
