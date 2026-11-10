/**
 * Content that is NOT editable from the admin panel.
 * Everything editable (profile, internships, projects, certificates, skills, timeline)
 * lives in src/lib/content/ and is read through useContent().
 */

export const aboutCards = [
  {
    icon: "Code2" as const,
    title: "Full Stack Engineering",
    description:
      "Crafting production-grade healthcare systems, scalable REST APIs, and type-safe frontends with Next.js, React, Node.js, and FastAPI.",
  },
  {
    icon: "Brain" as const,
    title: "AI & Intelligent Systems",
    description:
      "Architecting LLM integrations, RAG pipelines, OCR document parsing, and agentic workflows with OpenAI and OpenRouter APIs.",
  },
  {
    icon: "Server" as const,
    title: "Backend & Systems",
    description:
      "Designing robust databases in PostgreSQL and MongoDB, microservice workflows, Dockerized environments, and cloud infrastructure.",
  },
  {
    icon: "GraduationCap" as const,
    title: "Academic Background",
    description:
      "B.Tech CSE at AKTU (2023-2027), CGPA 7.9/10 through Semester VI. Active contributor to student developer communities.",
  },
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#certifications" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
] as const;
