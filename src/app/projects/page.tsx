import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Arya Banking",
    description:
      "Event-driven microservices platform across 9 repositories. Uses Spring Boot, Kafka, Keycloak, Vault, and Eureka. Features service discovery, centralized config, API gateway, and comprehensive documentation.",
    tags: ["Spring Boot", "Kafka", "Keycloak", "Vault", "Docker"],
    href: "https://github.com/Event-Based-Banking-Application",
  },
  {
    title: "Banking Application",
    description:
      "Microservices-based banking system with service discovery (Eureka), API gateway (Spring Cloud Gateway), and centralized configuration (Spring Cloud Config).",
    tags: ["Spring Boot", "Microservices", "Eureka", "Docker"],
    href: "https://github.com/kartik1502/Spring-Boot-Microservices-Banking-Application",
  },
];

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        <span className="text-neon">#</span> Projects
      </h1>
      <p className="text-gray-400 mb-10">
        Things I have built and am currently building.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
