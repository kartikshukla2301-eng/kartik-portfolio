export const documentLinks = {
  // Centralized Google Drive configuration
  resume: "https://drive.google.com/file/d/1l7RdUSiIk6kHgYRdxfYx5Vao14-DUm9N/view?usp=sharing",
  mongodb: "", // GOOGLE_DRIVE_MONGODB_CERT_URL = "[ADD_MONGODB_CERTIFICATE_LINK]"
  awsGenAI: "", // GOOGLE_DRIVE_AWS_GENAI_CERT_URL = "[ADD_AWS_GENAI_CERTIFICATE_LINK]"
  claudeCode: "", // GOOGLE_DRIVE_CLAUDE_CODE_CERT_URL = "[ADD_CLAUDE_CODE_CERTIFICATE_LINK]"
  softpro: "", // GOOGLE_DRIVE_SOFTPRO_CERT_URL = "[ADD_SOFTPRO_CERTIFICATE_LINK]"
  pythonCert: "", // GOOGLE_DRIVE_PYTHON_CERT_URL = "[ADD_PYTHON_INTERNSHIP_CERTIFICATE_LINK]"
  pythonExperience: "", // GOOGLE_DRIVE_PYTHON_EXPERIENCE_URL = "[ADD_PYTHON_EXPERIENCE_CERTIFICATE_LINK]"
};

export const siteConfig = {
  name: "Kartik Shukla",
  title: "Kartik Shukla | Full Stack Developer & AI Engineer",
  primaryTitle: "Full Stack Developer",
  secondaryTitle: "AI Engineer | Software Developer",
  description:
    "Full Stack Developer and AI Engineer with hands-on experience building production-oriented healthcare systems, scalable web applications, REST APIs and AI-powered applications. Experienced with React, Next.js, Node.js, Python, FastAPI, PostgreSQL, MongoDB, AWS and Docker. Interested in building reliable software products, intelligent applications and scalable backend systems.",
  heroDescription:
    "I build scalable web applications, reliable backend systems and AI-powered products. I enjoy solving real-world engineering problems through clean architecture, modern technologies and practical software development.",
  url: "https://kartik-portfolio-chi-eight.vercel.app",
  email: "kartikshukla2301@gmail.com",
  phone: "+91-6390020374",
  github: "https://github.com/kartikshukla2301-eng",
  linkedin: "https://www.linkedin.com/in/kartik-shukla-cse",
  leetcode: "https://leetcode.com/u/cdlPAR9B41/",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/kartikshum7i0",
  instagram: "https://www.instagram.com/_ig_kartikk/",
  resumeUrl: documentLinks.resume,
  education: {
    degree: "B.Tech – Computer Science & Engineering",
    college: "Ambalika Institute of Management and Technology",
    university: "Dr. APJ Abdul Kalam Technical University (AKTU)",
    period: "2023–2027",
    cgpa: "7.9/10 through Semester VI",
    expectedGraduation: "2027",
  },
  portrait: {
    src: "/images/kartik-shukla.png",
    alt: "Kartik Shukla — Full Stack Developer & AI Engineer",
    width: 800,
    height: 1000,
  },
} as const;

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
      "B.Tech CSE at AKTU (2023–2027), CGPA 7.9/10 through Semester VI. Active contributor to student developer communities.",
  },
] as const;

export const skills = [
  {
    category: "Programming Languages",
    icon: "Terminal" as const,
    items: ["Python", "JavaScript", "TypeScript", "C++", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frontend Development",
    icon: "Monitor" as const,
    items: ["React.js", "Next.js", "React 19", "Vite", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    icon: "Server" as const,
    items: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "Server-Sent Events"],
  },
  {
    category: "Databases",
    icon: "Layers" as const,
    items: ["PostgreSQL", "MongoDB", "MongoDB Atlas", "Supabase"],
  },
  {
    category: "AI & Intelligent Systems",
    icon: "Sparkles" as const,
    items: [
      "OpenAI API",
      "OpenRouter",
      "RAG",
      "OCR",
      "PDF Processing",
      "Prompt Engineering",
      "Prompt-Injection Safeguards",
    ],
  },
  {
    category: "Security",
    icon: "Shield" as const,
    items: ["JWT", "Google OAuth 2.0", "RBAC", "Zod", "Input Validation", "bcrypt"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud" as const,
    items: ["AWS", "Docker", "Docker Compose", "Git", "GitHub", "Vercel", "Render"],
  },
  {
    category: "Data & Python Ecosystem",
    icon: "Database" as const,
    items: ["Pandas", "NumPy", "Matplotlib", "SQL", "Jupyter Notebook", "Django", "Flask"],
  },
  {
    category: "IoT",
    icon: "Cpu" as const,
    items: ["Arduino UNO", "ESP32", "Sensors", "HuskyLens", "Bluetooth/WiFi"],
  },
] as const;

export interface ExperienceRecord {
  company: string;
  legalName?: string;
  role: string;
  period: string;
  mode: string;
  location?: string;
  isOngoing?: boolean;
  technologies: string[];
  highlights: string[];
}

export const experiences: ExperienceRecord[] = [
  {
    company: "Pristyn Care",
    role: "Full Stack Developer Intern",
    period: "August 2026 – October 2026",
    mode: "On-site",
    technologies: ["Next.js", "React.js", "REST APIs", "AWS", "Docker", "Databases"],
    highlights: [
      "Worked on a production Hospital Information System (HIS) supporting clinical and administrative operations.",
      "Engineered DB-driven All Hospitals reporting eligibility and backend authorization based on actual user-to-hospital mappings.",
      "Enforced a 60-day range restriction for All Hospitals reporting while preserving existing single-hospital workflows.",
      "Built Hospital Expense Management workflows including expense validation, approval lifecycles, finance permissions, and audit-trail functionality.",
      "Achieved 15/15 passed security tests across expense-management modules and authorization gates.",
      "Implemented Org Admin Staff Management featuring searchable role selection and hospital Select All/Deselect All.",
      "Contributed to the MRD (Medical Records Department) module and designed an IT Asset Management Dashboard replacing legacy Excel tracking.",
      "Delivered three merged production pull requests.",
    ],
  },
  {
    company: "OnCare Cancer Centre",
    legalName: "Aedos Health Solutions Pvt Ltd",
    role: "Developer Intern",
    period: "October 2026 – January 2027",
    mode: "Work From Office, Gurgaon",
    isOngoing: true,
    technologies: ["Next.js", "React.js", "CMS", "REST APIs", "Responsive UI"],
    highlights: [
      "Maintaining and enhancing the company's core web platform, marketing landing pages, and responsive UI.",
      "Developing critical features including the Raise PO module and appointment date selection interface.",
      "Building CMS-driven homepage components and optimizing website content management workflows.",
      "Conducting frontend and backend integration investigations and implementing static header/footer generation workflows.",
      "Performing proactive bug fixes and continuous user-experience improvements across production pages.",
    ],
  },
  {
    company: "Infosys Makers Lab",
    role: "IoT Summer Intern",
    period: "June 2026 – July 2026",
    mode: "On-site, AKTU New Campus, Lucknow",
    technologies: ["Arduino UNO", "ESP32", "Sensors", "Bluetooth/WiFi", "HuskyLens"],
    highlights: [
      "Programmed Arduino UNO and ESP32 microcontrollers with multi-sensor integration and wireless communication protocols.",
      "Developed Smart Water Tank Monitoring system with automatic pump control, ultrasonic sensing, and overflow/dry-run prevention.",
      "Built an AI-driven Smart Access Control System using HuskyLens face-recognition with servo-actuated lock mechanisms.",
      "Integrated Bluetooth (HC-05) and ESP32 WiFi (STA/AP modes) for real-time remote sensor telemetry and actuation.",
    ],
  },
  {
    company: "The Developers Arena",
    role: "Python Developer Intern",
    period: "July 2026 – October 2026",
    mode: "Virtual / Structured Internship Program",
    technologies: ["Python", "Django", "Flask", "Pandas", "NumPy", "Matplotlib", "SQL", "Jupyter", "Git", "Docker"],
    highlights: [
      "Completed intensive 3-month Python Developer Development Program with 100% task completion across 12/12 evaluated assignments.",
      "Achieved A+ evaluation grade with Outstanding performance rating across 108+ documented learning hours.",
      "Developed practical applications including a personal finance tracker, OOP library management system, weather API app, and Pandas sales analytics.",
      "Built full-stack web applications and REST APIs using Flask, Docker, and CI/CD deployment fundamentals.",
    ],
  },
];

// Single experience export for backwards compatibility
export const experience = experiences[0];

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  live?: string;
  featured: boolean;
  status?: string;
  isPrivate?: boolean;
}

export const projects: ProjectItem[] = [
  {
    title: "DEVLEVELER",
    description:
      "Flagship AI-powered developer-intelligence platform that analyzes GitHub activity and resumes to calculate developer XP scores, evaluate coding consistency, analyze ATS compatibility, identify skill gaps, and provide RAG-based career roadmaps.",
    tags: ["Next.js", "FastAPI", "OpenAI", "RAG", "PostgreSQL", "Docker"],
    repo: "https://github.com/kartikshukla2301-eng/DEVLEVELER.git",
    live: "https://devleveler.vercel.app/",
    featured: true,
    status: "Flagship / In Development",
  },
  {
    title: "GROWEasy CRM – AI CSV Importer",
    description:
      "Intelligent data onboarding engine featuring LLM-driven CSV column mapping to a fixed CRM schema, Zod runtime validation, business-rule enforcement, concurrent batch processing, Server-Sent Events (SSE) for real-time progress, and prompt-injection safeguards.",
    tags: ["Next.js", "TypeScript", "Express.js", "Zod", "OpenRouter", "SSE"],
    repo: "https://github.com/kartikshukla2301-eng/GROWEASY_CSV_IMPORTER",
    live: "https://groweasy-csv-importer-client-six.vercel.app/",
    featured: true,
  },
  {
    title: "AI Study Assistant",
    description:
      "Full-stack AI study platform with OCR/PDF processing pipeline, seven specialized study modes, 7-Mark Answer Generator, Exam Kit, and Revision Planner with JWT authentication and Google OAuth, deployed on Vercel, Render, and MongoDB Atlas.",
    tags: ["React 19", "Vite", "Node.js", "Express.js", "MongoDB Atlas", "FastAPI"],
    repo: "https://github.com/kartikshukla2301-eng/ai-study-assistant",
    live: "https://ai-study-assistant-eight-psi.vercel.app/",
    featured: true,
  },
  {
    title: "HaiDrama Task Manager",
    description:
      "Production-ready task management platform featuring task assignment, real-time progress tracking, team collaboration, secure user authentication, and multi-user PostgreSQL schemas.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Flask"],
    repo: "https://github.com/kartikshukla2301-eng/Hairdrama-Task-Manager.git",
    live: "https://hairdrama-task-manager-coral.vercel.app/",
    featured: true,
  },
];

export interface SecondaryProjectItem {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  live?: string;
  isPrivate?: boolean;
}

export const secondaryProjects: SecondaryProjectItem[] = [
  {
    title: "Ultra AI Chatbot",
    description: "Desktop-based conversational AI chatbot featuring context-aware chat with a modern GUI.",
    tags: ["Python", "Tkinter"],
    repo: "https://github.com/kartikshukla2301-eng/UltraAi-Chatbot.git",
  },
  {
    title: "Harmony Hub",
    description: "Cross-platform real-time messaging architecture with Python WebSocket backend and Flutter client.",
    tags: ["Python", "Flutter", "WebSocket"],
    repo: "https://github.com/kartikshukla2301-eng/Harmony_Hub.git",
  },
  {
    title: "Smart Access Control System",
    description: "Arduino UNO + HuskyLens face-recognition system with servo-driven lock actuation and buzzer feedback.",
    tags: ["Arduino", "HuskyLens", "Servo", "Sensors"],
  },
  {
    title: "Smart Water Tank Monitoring",
    description: "Arduino UNO and ultrasonic sensor with relay-controlled pump switching, overflow and dry-run prevention.",
    tags: ["Arduino", "Ultrasonic", "Relay"],
  },
  {
    title: "JOB_AGENT – AI Job Application Agent",
    description: "Autonomous job search and application agent with intelligent profile matching and automated workflows.",
    tags: ["Python", "AI Agent", "Automation"],
    isPrivate: true,
  },
];

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  driveKey: keyof typeof documentLinks;
  credentialUrl?: string;
  location?: string;
}

export const certifications: CertificationItem[] = [
  {
    title: "MongoDB Overview: Core Concepts and Architecture",
    issuer: "MongoDB / Credly",
    year: "2026",
    driveKey: "mongodb",
    credentialUrl: "https://credly.com/badges/b347eabb-63a5-4bd6-98ef-16c40779cf89",
  },
  {
    title: "Generative AI with AWS",
    issuer: "Analytics Vidhya",
    year: "2026",
    driveKey: "awsGenAI",
  },
  {
    title: "Claude Code: The Coding Assistant",
    issuer: "Analytics Vidhya",
    year: "2026",
    driveKey: "claudeCode",
  },
  {
    title: "Full Stack Web Development Workshop",
    issuer: "SoftPro India × Dr. APJ Abdul Kalam Technical University",
    year: "2025",
    driveKey: "softpro",
    location: "Ambalika Institute of Management and Technology, Lucknow",
  },
  {
    title: "Python Developer Internship Completion Certificate",
    issuer: "The Developers Arena",
    year: "2026",
    driveKey: "pythonCert",
  },
  {
    title: "Python Developer Experience Certificate",
    issuer: "The Developers Arena",
    year: "2026",
    driveKey: "pythonExperience",
  },
];

export const timeline = [
  {
    year: "2023",
    title: "Started B.Tech CSE at Ambalika (AKTU)",
    description: "Computer Science fundamentals, Data Structures, Algorithms, and Object-Oriented Programming in C++.",
  },
  {
    year: "2025",
    title: "Advanced Full-Stack Systems",
    description: "Building production-grade web applications with Next.js App Router, React, Express, MongoDB Atlas, and Supabase.",
  },
  {
    year: "2026",
    title: "Production Internships & AI Engineering",
    description:
      "Full Stack Intern at Pristyn Care (HIS & Expense Management), Developer Intern at OnCare Cancer Centre, IoT Intern at Infosys Makers Lab, and Python Developer Intern at The Developers Arena.",
  },
  {
    year: "2027",
    title: "Expected B.Tech Graduation",
    description: "Targeting Full Stack Developer, Software Development Engineer, and AI Engineering roles in innovative engineering teams.",
  },
];

export const recruiterStats = {
  cgpa: "7.9/10",
  education: "B.Tech CSE – AKTU",
  graduation: "2027 (Expected)",
  dsaSolved: "200+ Solved",
  dsaPlatforms: "LeetCode & GeeksforGeeks",
  leadership: "Social Media Head – IEEE Student Branch",
};

export const developerAI = {
  name: "Developer AI",
  description:
    "An AI-powered terminal-first agent for developer workflows — autonomous doc generation and code-defect patching.",
  progress: 68,
  features: ["CLI Companion", "AI Debugger"],
  roadmap: [
    { phase: "Model Fine-Tuning", quarter: "Q2 2026" },
    { phase: "Shell Agent & CLI", quarter: "Q3 2026" },
    { phase: "Private Alpha Invite", quarter: "Q4 2026" },
    { phase: "Production Deploy", quarter: "Q1 2027" },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#certifications" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
] as const;

export const tagCloud = [
  "Full Stack Development",
  "AI Engineering",
  "Healthcare Systems",
  "REST APIs & Webhooks",
  "PostgreSQL & MongoDB",
  "RAG & LLM Agents",
  "Docker & AWS",
];
