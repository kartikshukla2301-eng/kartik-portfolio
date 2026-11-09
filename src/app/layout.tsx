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

const CANONICAL_URL = "https://kartik-portfolio-chi-eight.vercel.app";

export const viewport: Viewport = {
  themeColor: "#FAFAFC",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: {
    default: "Kartik Shukla | Full Stack Developer & AI Engineer",
    template: "%s | Kartik Shukla",
  },
  description:
    "Portfolio of Kartik Shukla, Full Stack Developer and AI Engineer. Explore projects, production development experience, technical skills and AI-powered applications.",
  keywords: [
    "Kartik Shukla",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React 19",
    "TypeScript",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Healthcare Information System",
    "AKTU CSE",
  ],
  authors: [{ name: "Kartik Shukla", url: CANONICAL_URL }],
  creator: "Kartik Shukla",
  publisher: "Kartik Shukla",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "profile",
    firstName: "Kartik",
    lastName: "Shukla",
    username: "kartikshukla2301-eng",
    gender: "male",
    locale: "en_US",
    url: CANONICAL_URL,
    title: "Kartik Shukla | Full Stack Developer & AI Engineer",
    description:
      "Portfolio of Kartik Shukla, Full Stack Developer and AI Engineer. Explore projects, production development experience, technical skills and AI-powered applications.",
    siteName: "Kartik Shukla Portfolio",
    images: [
      {
        url: "/images/kartik-shukla.png",
        width: 800,
        height: 1000,
        alt: "Kartik Shukla — Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartik Shukla | Full Stack Developer & AI Engineer",
    description:
      "Portfolio of Kartik Shukla, Full Stack Developer and AI Engineer. Explore projects, production development experience, technical skills and AI-powered applications.",
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
        "@id": `${CANONICAL_URL}/#person`,
        name: "Kartik Shukla",
        jobTitle: "Full Stack Developer | AI Engineer",
        description:
          "Full Stack Developer and AI Engineer with hands-on experience building production-oriented healthcare systems, scalable web applications, REST APIs and AI-powered applications.",
        url: CANONICAL_URL,
        image: `${CANONICAL_URL}/images/kartik-shukla.png`,
        email: "kartikshukla2301@gmail.com",
        sameAs: [
          "https://github.com/kartikshukla2301-eng",
          "https://www.linkedin.com/in/kartik-shukla-cse",
          "https://leetcode.com/u/cdlPAR9B41/",
          "https://www.geeksforgeeks.org/profile/kartikshum7i0",
          "https://www.instagram.com/_ig_kartikk/",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Dr. APJ Abdul Kalam Technical University (AKTU)",
          url: "https://aktu.ac.in",
        },
        knowsAbout: [
          "Full Stack Development",
          "Artificial Intelligence",
          "Next.js",
          "React",
          "TypeScript",
          "Python",
          "FastAPI",
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "MongoDB",
          "AWS",
          "Docker",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${CANONICAL_URL}/#website`,
        url: CANONICAL_URL,
        name: "Kartik Shukla Portfolio",
        description: "Official Portfolio of Kartik Shukla — Full Stack Developer & AI Engineer",
        publisher: {
          "@id": `${CANONICAL_URL}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${CANONICAL_URL}/#profilepage`,
        url: CANONICAL_URL,
        name: "Kartik Shukla | Full Stack Developer & AI Engineer",
        isPartOf: {
          "@id": `${CANONICAL_URL}/#website`,
        },
        mainEntity: {
          "@id": `${CANONICAL_URL}/#person`,
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3587427941344024"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFC] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
