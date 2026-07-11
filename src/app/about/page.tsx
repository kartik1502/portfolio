import { Download, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

const experience = [
  {
    role: "Backend Developer",
    company: "Arya Banking",
    period: "2025 - Present",
    description:
      "Architecting and building a 9-repository event-driven microservices platform with Spring Boot, Kafka, Keycloak, and HashiCorp Vault.",
  },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        <span className="text-neon">#</span> About
      </h1>
      <p className="text-gray-400 mb-12">A bit about me and what I do.</p>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <p className="text-gray-300 leading-relaxed mb-6">
            I am a backend developer passionate about building scalable,
            event-driven systems. I specialize in Java, Spring Boot, and
            microservices architecture.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Currently, I am building the Arya Banking platform — a complete
            microservices ecosystem with 9 interconnected repositories covering
            service discovery, centralized configuration, API gateway, domain
            services, and infrastructure automation.
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <MapPin size={16} className="text-neon" />
              India
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar size={16} className="text-neon" />
              3+ years of experience
            </div>
          </div>

          <Link
            href="mailto:kartikkulkarni1411@gmail.com"
            className="inline-flex items-center gap-2 bg-neon text-dark-950 px-5 py-2.5 rounded-lg font-semibold hover:bg-neon-dark transition-colors glow text-sm"
          >
            <Download size={16} /> Get in Touch
          </Link>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-6">
            Experience
          </h3>

          {experience.map((exp) => (
            <div key={exp.role} className="card p-5 mb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-medium">{exp.role}</h4>
                  <p className="text-neon text-sm">{exp.company}</p>
                </div>
                <span className="text-gray-500 text-xs whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
