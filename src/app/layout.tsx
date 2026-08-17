import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kartikshukla.dev"),
  title: {
    default: "Kartik Shukla — AI Engineer & Full Stack Developer",
    template: "%s | Kartik Shukla",
  },
  description:
    "AI Engineer & Full Stack Developer building intelligent AI-powered products, autonomous developer agents, and scalable web applications. B.Tech CSE (2023–2027).",
  keywords: [
    "Kartik Shukla",
    "AI Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "React 19",
    "TypeScript",
    "Python AI",
    "OpenAI API",
    "Developer AI",
    "MERN Stack",
    "Software Engineer Portfolio",
    "Machine Learning",
    "Web Development",
    "AKTU CSE",
  ],
  authors: [{ name: "Kartik Shukla", url: "https://kartikshukla.dev" }],
  creator: "Kartik Shukla",
  publisher: "Kartik Shukla",
  alternates: {
    canonical: "https://kartikshukla.dev",
  },
  openGraph: {
    type: "profile",
    firstName: "Kartik",
    lastName: "Shukla",
    username: "kartikshukla2301-eng",
    gender: "male",
    locale: "en_US",
    url: "https://kartikshukla.dev",
    title: "Kartik Shukla — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer & Full Stack Developer building intelligent AI-powered products and high-performance web applications.",
    siteName: "Kartik Shukla Portfolio",
    images: [
      {
        url: "/images/kartik-shukla.png",
        width: 800,
        height: 1000,
        alt: "Kartik Shukla — AI Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartik Shukla — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer & Full Stack Developer building intelligent AI-powered products and high-performance web applications.",
    images: ["/images/kartik-shukla.png"],
    creator: "@_ig_kartikk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://kartikshukla.dev/#person",
        name: "Kartik Shukla",
        jobTitle: "AI Engineer & Full Stack Developer",
        description:
          "AI Engineer & Full Stack Developer building intelligent AI-powered products, LLM agents, and scalable web applications.",
        url: "https://kartikshukla.dev",
        image: "https://kartikshukla.dev/images/kartik-shukla.png",
        email: "kartikshukla2301@gmail.com",
        sameAs: [
          "https://github.com/kartikshukla2301-eng",
          "https://linkedin.com/in/kartikshukla2301",
          "https://instagram.com/_ig_kartikk",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Dr. APJ Abdul Kalam Technical University",
          url: "https://aktu.ac.in",
        },
        knowsAbout: [
          "Artificial Intelligence",
          "Large Language Models",
          "Full Stack Development",
          "Next.js",
          "React",
          "TypeScript",
          "Python",
          "Node.js",
          "MongoDB",
          "PostgreSQL",
          "FastAPI",
          "Tailwind CSS",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://kartikshukla.dev/#website",
        url: "https://kartikshukla.dev",
        name: "Kartik Shukla Portfolio",
        description: "Official Portfolio of Kartik Shukla — AI Engineer & Full Stack Developer",
        publisher: {
          "@id": "https://kartikshukla.dev/#person",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://kartikshukla.dev/#profilepage",
        url: "https://kartikshukla.dev",
        name: "Kartik Shukla — AI Engineer & Full Stack Developer",
        isPartOf: {
          "@id": "https://kartikshukla.dev/#website",
        },
        mainEntity: {
          "@id": "https://kartikshukla.dev/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#030303] text-[#e8e8e8]">
        {children}
      </body>
    </html>
  );
}
