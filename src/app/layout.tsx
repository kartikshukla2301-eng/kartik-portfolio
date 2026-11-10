import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Caveat, Geist, Geist_Mono } from "next/font/google";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Display: heavy condensed caps. Body: Geist. HUD/labels: Geist Mono. Quotes: Caveat.
const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0A08",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Page-specific metadata lives in (site)/layout.tsx (reads the editable content) and admin/layout.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebas.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[#0B0A08] text-[rgba(255,250,240,0.88)]">
        <noscript>
          <style>{`[data-split]{opacity:1!important}.cf-line{--p:100!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
