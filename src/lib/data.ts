export const siteConfig = {
  name: "Kartik Shukla",
  title: "Kartik Shukla — AI Engineer & Full Stack Developer",
  description:
    "AI Engineer & Full Stack Developer building intelligent AI-powered products and scalable, performance-driven web applications.",
  url: "https://kartikshukla.dev",
  email: "kartikshukla2301@gmail.com",
  github: "https://github.com/kartikshukla2301-eng",
  linkedin: "https://www.linkedin.com/in/kartik-shukla-cse/",
  instagram: "https://instagram.com/_ig_kartikk",
  resumeUrl: "/resume.pdf",
  portrait: {
    src: "/images/kartik-shukla.png",
    alt: "Kartik Shukla — AI Engineer & Full Stack Developer",
    width: 800,
    height: 1000,
  },
} as const;

export const aboutCards = [
  {
    icon: "Brain" as const,
    title: "AI Enthusiast",
    description:
      "Building agentic workflows, LLM integrations, and AI-powered products that push boundaries.",
  },
  {
    icon: "Code2" as const,
    title: "Full Stack Developer",
    description:
      "From Next.js frontends to Express APIs to MongoDB — type-safe, performant, end-to-end.",
  },
  {
    icon: "Lightbulb" as const,
    title: "Problem Solver",
    description:
      "Code as a tool for real user pain points and developer velocity. Every line earns its place.",
  },
  {
    icon: "GraduationCap" as const,
    title: "Continuous Learner",
    description:
      "B.Tech CSE grad 2027. Ships daily, explores frameworks, and stays curious.",
  },
] as const;

export const skills = [
  {
    category: "Frontend Engineering",
    icon: "Monitor" as const,
    items: [
      "Next.js 15+",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "JavaScript",
      "HTML5 & CSS3",
    ],
  },
  {
    category: "Backend & Systems",
    icon: "Server" as const,
    items: [
      "Node.js",
      "Express.js",
      "Flask",
      "REST APIs",
      "MongoDB",
      "PostgreSQL/Supabase",
      "Document & Relational DB Design",
    ],
  },
  {
    category: "Artificial Intelligence",
    icon: "Sparkles" as const,
    items: [
      "Python",
      "OpenAI API",
      "Gemini API",
      "Prompt Engineering",
      "RAG Fundamentals",
      "OCR/PDF Processing",
      "Claude Assistant",
    ],
  },
  {
    category: "Developer Workspaces",
    icon: "Terminal" as const,
    items: [
      "Git & GitHub",
      "AWS",
      "Vercel",
      "Render",
      "VS Code",
      "Postman",
      "Terminal CLI",
    ],
  },
] as const;

export const experience = {
  company: "Infosys Makers Lab",
  role: "Summer Internship — IoT",
  period: "Jun 24, 2026 — Jul 18, 2026",
  duration: "4 weeks",
  highlights: [
    "Hands-on microcontroller programming, sensor integration, and wireless communication using Arduino UNO and ESP32",
    "Built embedded automation projects: traffic light system, automatic street light, relay/sensor-driven irrigation system",
    "Smart Water Tank Monitoring & Automatic Pump Control (ultrasonic sensing + relay actuation)",
    "Implemented Bluetooth (HC-05) and ESP32 WiFi (STA/AP) for remote sensor monitoring/control",
    "Smart Access Control System using HuskyLens face recognition with servo-driven lock actuation, LCD, DHT11, smoke, and rain sensors",
  ],
};

export const projects = [
  {
    title: "AI Study Assistant",
    description:
      "Full-stack AI learning platform with OCR-powered PDF intelligence, 10+ AI features including Chat Assistant, 7-Mark Answer Generator, Notes Generator, and Exam Kit Mode. Mobile-first PWA with multiple themes.",
    tags: ["React 19", "Vite", "Node.js", "Express", "MongoDB", "OpenAI API", "Tailwind CSS"],
    repo: "https://github.com/kartikshukla2301-eng/ai-study-assistant",
    live: "https://ai-study-assistant-eight-psi.vercel.app",
    featured: true,
  },
  {
    title: "HaiDrama Task Manager",
    description:
      "Production-grade full-stack task/team management platform with Google OAuth 2.0, role-based access control, automated email notification pipelines, and scalable multi-user PostgreSQL schemas.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Flask", "Resend"],
    repo: "https://github.com/kartikshukla2301-eng/Hairdrama-Task-Manager",
    live: "https://hairdrama-task-manager-coral.vercel.app",
    featured: true,
  },
  {
    title: "Ultra AI Chatbot",
    description:
      "Desktop conversational AI assistant with context-aware conversation, modern dark-themed GUI, packaged as standalone Windows executable.",
    tags: ["Python", "Tkinter", "Google Gemini API", "PyInstaller"],
    repo: "https://github.com/kartikshukla2301-eng/UltraAi-Chatbot",
    live: undefined,
    featured: true,
  },
] as const;

export const secondaryProjects = [
  {
    title: "Smart Access Control System",
    description: "Arduino UNO + HuskyLens face-recognition-triggered servo lock with buzzer feedback",
    tags: ["Arduino", "HuskyLens", "Servo"],
  },
  {
    title: "Smart Water Tank Monitoring",
    description: "Arduino UNO, ultrasonic sensor, relay-controlled pump switching, overflow/dry-run prevention",
    tags: ["Arduino", "Ultrasonic", "Relay"],
  },
  {
    title: "Harmony Hub",
    description: "Python WebSocket server, Flutter cross-platform real-time messaging",
    tags: ["Python", "Flutter", "WebSocket"],
  },
  {
    title: "News Aggregator CLI",
    description: "Python, Requests, BeautifulSoup, NewsAPI, SQLite",
    tags: ["Python", "SQLite", "BeautifulSoup"],
  },
  {
    title: "CSV Importer",
    description: "Flask + PostgreSQL bulk data validation pipeline",
    tags: ["Flask", "PostgreSQL", "Python"],
  },
];

export const certifications = [
  {
    title: "Claude Code: The Coding Assistant",
    issuer: "Analytics Vidhya",
    date: "Feb 25, 2026",
    credentialUrl: undefined,
    image: "/certificates/claude-code.pdf",
    imageFile: "/certificates/claude.jpeg",
  },
  {
    title: "Generative AI with AWS",
    issuer: "Analytics Vidhya",
    date: "Feb 17, 2026",
    credentialUrl: undefined,
    image: "/certificates/genai-aws.pdf",
    imageFile: "/certificates/genai.jpeg",
  },
  {
    title: "MongoDB Overview: Core Concepts and Architecture",
    issuer: "MongoDB, Inc.",
    date: "Jun 11, 2026",
    credentialUrl: "https://credly.com/badges/b347eabb-63a5-4bd6-98ef-16c40779cf89",
    image: "/certificates/mongodb.pdf",
    imageFile: "/certificates/mongo.jpeg",
  },
  {
    title: "Design to Deploy — A Full Stack Web Journey",
    issuer: "Softpro India (ISO 9001:2015) × Dr. APJ Abdul Kalam Technical University",
    date: "Dec 1, 2025",
    credentialUrl: undefined,
    image: "/certificates/softpro.pdf",
    imageFile: "/certificates/softpro.jpeg",
    location: "Ambalika Institute of Engineering & Technology, Lucknow",
  },
];

export const timeline = [
  {
    year: "2023",
    title: "Started B.Tech CSE",
    description: "Data Structures, Algorithms, C/C++",
  },
  {
    year: "2024",
    title: "Explored Web Development",
    description: "React.js, Tailwind CSS, UI/UX systems",
  },
  {
    year: "2025",
    title: "Built Full Stack Applications",
    description: "Next.js App Router, Express/Node, MongoDB Atlas, auth gateways",
  },
  {
    year: "2026",
    title: "AI Engineering & Internship Journey",
    description: "OpenAI API, agentic pipelines, Developer AI, Infosys Makers Lab IoT Internship",
  },
  {
    year: "2027",
    title: "Graduate & Industry Ready",
    description: "System Design, Enterprise Scalability, Product Engineering",
  },
];

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
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export const tagCloud = [
  "AI Engineering",
  "Full Stack Development",
  "Open Source Learning",
  "Building Developer AI",
  "Problem Solving",
];
