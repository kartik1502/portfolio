export const PROJECTS = [
  {
    n: "01",
    title: "Arya Banking",
    description:
      "Event-driven banking platform with 7 microservices using Kafka-based async communication. Auth, user, admin, API gateway, and Config server services with Dockerized deployment.",
    tags: ["Spring Boot", "Kafka", "Keycloak", "Docker", "Microservices"],
    href: "https://github.com/Event-Based-Banking-Application",
    repo: "org:Event-Based-Banking-Application",
    label: "MODULE_ARYA_BANKING",
    domain: "Fintech",
    year: "2024",
    problem:
      "Coordinating 7 banking services synchronously created cascading failures. A downed auth service could freeze onboarding, transactions, and admin actions at once.",
    approach:
      "Broke tight coupling with Kafka topics per bounded context. Services publish domain events and consume what they need — no direct HTTP dependencies between core flows.",
    impact: [
      "Zero cascading outages across 7 services in local load runs",
      "Independent scaling of auth vs. transaction consumers",
      "New service onboarding reduced to producer/consumer wiring",
    ],
    architecture: [
      "  Client → [API Gateway] → [Auth] ⇄ Keycloak",
      "                       ↓",
      "              ┌────────┼─────────┐",
      "              ▼        ▼         ▼",
      "           [User]  [Admin]   [Payments]",
      "              │        │         │",
      "              └────────┼─────────┘",
      "                       ▼",
      "                 ═══ Kafka ═══",
      "                       ▼",
      "                 [Config Server]",
    ],
  },
  {
    n: "02",
    title: "Spring Boot Microservices Banking",
    description:
      "Microservices banking platform with Eureka service registry, Spring Cloud Gateway, Keycloak auth, and Feign Client communication. Database-per-service pattern with 5 dedicated MySQL instances.",
    tags: ["Spring Boot", "Microservices", "Eureka", "Keycloak", "MySQL"],
    href: "https://github.com/kartik1502/Spring-Boot-Microservices-Banking-Application",
    repo: "kartik1502/Spring-Boot-Microservices-Banking-Application",
    label: "MODULE_SB_MICROSERVICES",
    domain: "Fintech",
    year: "2023",
    problem:
      "Shared-database monoliths meant one schema migration blocked every team and every deploy. Ownership of banking domains was blurred across services.",
    approach:
      "Database-per-service with Eureka discovery, Spring Cloud Gateway routing, and Feign for typed inter-service calls. Keycloak centralizes identity without leaking auth into every service.",
    impact: [
      "5 independently deployable services, 5 dedicated MySQL schemas",
      "Typed Feign clients eliminated hand-rolled REST plumbing",
      "Gateway-level auth removed 100% of duplicated security code",
    ],
    architecture: [
      "  Client → [Cloud Gateway] ⇄ Keycloak",
      "                │",
      "                ▼",
      "         [Eureka Registry]",
      "         ┌──────┼──────┐",
      "         ▼      ▼      ▼",
      "      [Users][Accts][Txn]  ← Feign clients",
      "         │      │      │",
      "       MySQL  MySQL  MySQL",
    ],
  },
];

export const WRITING = [
  {
    title: "Apache Kafka: Intro and Setup",
    href: "https://devscribbles.hashnode.dev/apache-kafka-intro-and-setup",
  },
  {
    title: "Spring Boot Tutorial: Spring Batch",
    href: "https://devscribbles.hashnode.dev/spring-boot-tutorial-spring-batch",
  },
  {
    title: "Mastering Microservices: Inter-Service Communication with Feign Client",
    href: "https://devscribbles.hashnode.dev/mastering-microservices-inter-service-communication-using-spring-cloud-feign-client-part-4",
  },
];

export const EXPERIENCE = [
  {
    company: "HCLTech (Client: Citi)",
    role: "Senior Software Engineer",
    period: "Feb 2024 — Present",
    location: "Bengaluru, Karnataka",
    bullets: [
      "Architected transaction processing for APAC region with Kafka event-driven architecture, processing thousands of transactions daily with zero compliance incidents.",
      "Engineered multi-country Payment service consuming and validating cross-border transactions across diverse regional formats, reducing manual reconciliation effort by 80%.",
      "Owned Payment Acceptance System (PAS) transaction pipeline end-to-end, optimizing Kafka consumers and MongoDB queries to consistently meet 2-second per-transaction SLA.",
      "Onboarded pre-sanctions screening service to the regional team, reducing dependency on core banking systems by offloading compliance checks to an independent microservice.",
      "Designed Payer ID resolution service, reducing new country onboarding time from 2 days to 3-4 hours (85% faster), eliminating 95% of country-specific code changes.",
      "Collaborated with product and compliance teams to translate regional regulatory requirements into technical specifications, delivering 4 quarterly releases on schedule with zero production defects.",
    ],
  },
];

export const PROFICIENCY = [
  { name: "Java", value: 95 },
  { name: "Spring Boot", value: 92 },
  { name: "Microservices", value: 88 },
  { name: "Spring Security", value: 82 },
  { name: "Docker", value: 80 },
  { name: "Kafka", value: 78 },
  { name: "MongoDB", value: 75 },
  { name: "System Design", value: 72 },
];

export const CREDENTIALS = [
  {
    title: "GitHub Copilot Certification",
    issuer: "Microsoft / GitHub",
    year: "2025",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/KarthikBanuKulkarni-3822/F3E8EB6DA5B638F1?sharingId=6B658AF77CCC44",
  },
  {
    title: "B.E Computer Science",
    issuer: "Bengaluru",
    year: "",
    href: null,
  },
];

export const CONTACT = {
  email: "kartikkulkarni1411@gmail.com",
  github: "https://github.com/kartik1502",
  linkedin: "https://www.linkedin.com/in/kartik1502",
};

export const STACK = [
  "Java 17", "Spring Boot", "Spring Cloud", "Spring Security",
  "Apache Kafka", "MongoDB", "MySQL", "Docker", "Keycloak", "Redis", "REST", "JUnit",
];

export const METRICS = [
  { value: "2.5y", label: "Production experience", note: "HCLTech · Citi" },
  { value: "APAC", label: "Region", note: "Cross-border payments" },
  { value: "2s", label: "Per-txn SLA held", note: "PAS pipeline" },
  { value: "85%", label: "Faster onboarding", note: "Payer ID service" },
  { value: "80%", label: "Less reconciliation", note: "Multi-country validation" },
  { value: "0", label: "Prod defects", note: "4 quarterly releases" },
];

export const NOW = [
  "Architecting a 9-repository event-driven platform on Kafka + Spring Boot.",
  "Sharpening system design fundamentals — CAP, backpressure, idempotent consumers.",
  "Writing long-form on Kafka, Spring Batch, and microservice communication.",
  "Open to senior backend roles — remote or Bengaluru.",
];

export const TESTIMONIALS = [
  {
    quote: "Owns problems end-to-end. Ships production-grade Kafka pipelines without hand-holding.",
    who: "Tech Lead", where: "Citi / APAC Payments",
  },
  {
    quote: "Turns vague compliance requirements into clean service boundaries. Rare skill.",
    who: "Product Manager", where: "Payments",
  },
];

export const VALUES = [
  {
    n: "01", title: "Boring tech, sharp fundamentals",
    body: "Prefer well-understood building blocks (Spring, Kafka, Postgres) over novelty. Depth over breadth.",
  },
  {
    n: "02", title: "Explicit over clever",
    body: "Readable code, typed contracts, obvious failure modes. Future-you will thank present-you.",
  },
  {
    n: "03", title: "Own the pager",
    body: "The engineer who designs the system runs it in production. Feedback loops shape better systems.",
  },
  {
    n: "04", title: "Write it down",
    body: "Diagrams, ADRs, runbooks. Distributed systems die in tribal knowledge.",
  },
];

export const TOOLBOX: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java 17", "SQL", "TypeScript", "Bash"] },
  { group: "Frameworks", items: ["Spring Boot", "Spring Cloud", "Spring Security", "Spring Batch", "JPA / Hibernate"] },
  { group: "Data & Messaging", items: ["Apache Kafka", "MongoDB", "MySQL", "Redis"] },
  { group: "Platform", items: ["Docker", "Keycloak", "Eureka", "Spring Cloud Gateway", "Feign"] },
  { group: "Practice", items: ["Event-driven design", "Microservices", "REST APIs", "TDD / JUnit", "Observability"] },
];

export const BEYOND = [
  { title: "Long-form writing", body: "Publish deep-dives on Hashnode about Kafka, Spring Batch, and Feign — teaching is how I close my own gaps." },
  { title: "Mentoring juniors", body: "Pair with early-career engineers on system design and Spring internals inside the team." },
  { title: "Reading", body: "Currently working through Designing Data-Intensive Applications and Release It! for the second time." },
  { title: "Off-screen", body: "Long walks, cricket, and slowly cooking through a South Indian recipe backlog." },
];

export type ChangelogEntry = {
  date: string;
  time?: string;
  title: string;
  description: string;
  tags?: string[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-07-25",
    time: "10:30",
    title: "Dependency management BOM proposal",
    description: "Audited all 7 service POMs for dependency redundancy, identified scope issues (lombok compile vs provided), missing transitive deps (commons-io, commons-codec), and version drift (SB 3.5.3 vs 3.5.4). Proposed centralized arya-banking-bom and added to platform roadmap.",
    tags: ["arya-banking", "maven", "pom"],
  },
  {
    date: "2026-07-25",
    time: "12:15",
    title: "Admin-service OpenAPI config fix",
    description: "Added explicit OpenApiConfig.java to admin-service to stop SpringDoc from auto-generating 'host.docker.internal:8089' as the server URL. Explicit server entries set for API Gateway (8085) and direct (8089).",
    tags: ["arya-banking", "admin-service", "swagger"],
  },
];
