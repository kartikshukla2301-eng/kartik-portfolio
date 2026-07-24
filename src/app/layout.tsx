import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kartik Shukla — AI Engineer & Full Stack Developer",
  description:
    "AI Engineer & Full Stack Developer building intelligent AI-powered products and scalable, performance-driven web applications. B.Tech CSE, AKTU 2023–2027.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "OpenAI",
    "MongoDB",
    "Portfolio",
    "Kartik Shukla",
  ],
  authors: [{ name: "Kartik Shukla" }],
  creator: "Kartik Shukla",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kartikshukla.dev",
    title: "Kartik Shukla — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer & Full Stack Developer building intelligent AI-powered products and scalable, performance-driven web applications.",
    siteName: "Kartik Shukla Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartik Shukla — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer & Full Stack Developer building intelligent AI-powered products and scalable, performance-driven web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kartik Shukla",
    jobTitle: "AI Engineer & Full Stack Developer",
    description:
      "AI Engineer & Full Stack Developer building intelligent AI-powered products and scalable, performance-driven web applications.",
    url: "https://kartikshukla.dev",
    email: "kartikshukla2301@gmail.com",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dr. APJ Abdul Kalam Technical University",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Full Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Node.js",
      "MongoDB",
    ],
  };

  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
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
