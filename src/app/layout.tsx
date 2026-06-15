import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kartik Shukla | AI Engineer & Full Stack Developer",
  description:
    "Personal portfolio of Kartik Shukla, B.Tech CSE student (2027). Building intelligent AI-powered products and highly scalable full stack web applications.",
  keywords: [
    "Kartik Shukla",
    "AI Engineer",
    "Full Stack Developer",
    "Software Engineer Portfolio",
    "Machine Learning Integration",
    "Next.js Developer",
    "React Engineer",
    "B.Tech CSE 2027",
  ],
  authors: [{ name: "Kartik Shukla" }],
  creator: "Kartik Shukla",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kartikshukla.dev", // Replace with real URL if needed
    title: "Kartik Shukla | AI Engineer & Full Stack Developer",
    description:
      "Building intelligent AI-powered products and highly scalable full stack web applications. Explored Web Dev, building Developer AI.",
    siteName: "Kartik Shukla Portfolio",
    images: [
      {
        url: "/images/kartik-shukla.png",
        width: 1200,
        height: 630,
        alt: "Kartik Shukla - AI Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartik Shukla | AI Engineer & Full Stack Developer",
    description:
      "Building intelligent AI-powered products and highly scalable full stack web applications.",
    images: ["/images/kartik-shukla.png"],
    creator: "@kartikshukla",
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
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-dark-bg text-white antialiased selection:bg-primary/30 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
