import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Link as LinkIcon,
  Mail,
  Terminal,
  Database,
  Cloud,
  Code2,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";

const skills = {
  Languages: ["Java", "Python", "C", "C++", "PHP"],
  Frameworks: ["Spring Boot", "Spring Cloud", "Spring Security", "Hibernate"],
  "Databases & Messaging": ["MongoDB", "MySQL", "Apache Kafka"],
  Tools: ["Docker", "Git", "Postman", "Swagger"],
};

const featuredProjects = [
  {
    title: "Arya Banking",
    description:
      "Event-driven microservices platform with Spring Boot, Kafka, Keycloak, Vault, and Eureka across 9 repositories.",
    tags: ["Spring Boot", "Kafka", "Keycloak", "Vault", "Docker"],
    href: "https://github.com/Event-Based-Banking-Application",
  },
  {
    title: "Banking Application",
    description:
      "Microservices-based banking system with service discovery, API gateway, and centralized configuration.",
    tags: ["Spring Boot", "Microservices", "Eureka", "Docker"],
    href: "https://github.com/kartik1502/Spring-Boot-Microservices-Banking-Application",
  },
];

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-neon text-sm font-mono mb-4">
              Hi, my name is
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Karthik Kulkarni
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
              Backend Developer & Java Enthusiast
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
              I build scalable event-driven microservices. Currently architecting
              the{" "}
              <span className="text-neon">Arya Banking</span> platform — a
              9-repository ecosystem powering digital banking backend systems.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-neon text-dark-950 px-6 py-3 rounded-lg font-semibold hover:bg-neon-dark transition-colors glow"
              >
                View Projects <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 px-6 py-3 rounded-lg hover:border-neon hover:text-neon transition-colors"
              >
                Contact Me
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Link
                href="https://github.com/kartik1502"
                target="_blank"
                className="text-gray-500 hover:text-neon transition-colors"
              >
                <Globe size={22} />
              </Link>
              <Link
                href="https://linkedin.com/in/karthik-kulkarni-ka1411/"
                target="_blank"
                className="text-gray-500 hover:text-neon transition-colors"
              >
                <LinkIcon size={22} />
              </Link>
              <Link
                href="mailto:kartikkulkarni1411@gmail.com"
                className="text-gray-500 hover:text-neon transition-colors"
              >
                <Mail size={22} />
              </Link>
            </div>
          </div>

          <div className="hidden md:block w-72 h-72 rounded-full glow-border flex items-center justify-center bg-dark-800">
            <Terminal size={80} className="text-neon opacity-60" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="section-heading">
          <span className="text-neon">#</span> Tech Stack
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                {category === "Languages" && (
                  <Code2 size={18} className="text-neon" />
                )}
                {category === "Frameworks" && (
                  <Terminal size={18} className="text-neon" />
                )}
                {category === "Databases & Messaging" && (
                  <Database size={18} className="text-neon" />
                )}
                {category === "Tools" && (
                  <Cloud size={18} className="text-neon" />
                )}
                <h3 className="text-sm font-semibold text-gray-300">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading mb-0">
            <span className="text-neon">#</span> Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-gray-400 hover:text-neon transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>
    </div>
  );
}
