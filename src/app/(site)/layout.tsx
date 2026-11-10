import type { Metadata } from "next";
import { ContentProvider } from "@/components/providers/ContentProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { getContent } from "@/lib/content/store";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const title = `${profile.name} | ${profile.primaryTitle} & AI Engineer`;
  const description = `Portfolio of ${profile.name}, ${profile.primaryTitle} and AI Engineer. Explore projects, production development experience, technical skills and AI-powered applications.`;
  const [firstName = profile.name, ...rest] = profile.name.split(" ");
  const username = profile.github.split("/").filter(Boolean).pop() ?? "";

  return {
    title: { default: title, template: `%s | ${profile.name}` },
    description,
    keywords: [
      profile.name,
      profile.primaryTitle,
      "AI Engineer",
      "Next.js Developer",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
    ],
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: "profile",
      firstName,
      lastName: rest.join(" "),
      username,
      locale: "en_US",
      url: SITE_URL,
      title,
      description,
      siteName: `${profile.name} Portfolio`,
      images: [{ url: profile.portrait.src, width: 1000, height: 1000, alt: profile.portrait.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.portrait.src],
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
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const { profile } = content;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: `${profile.primaryTitle} | AI Engineer`,
        description: profile.description,
        url: SITE_URL,
        image: profile.portrait.src.startsWith("/") ? `${SITE_URL}${profile.portrait.src}` : profile.portrait.src,
        email: profile.email,
        sameAs: [profile.github, profile.linkedin, profile.leetcode, profile.geeksforgeeks, profile.instagram].filter(Boolean),
        alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.university },
        knowsAbout: content.skills.flatMap((s) => s.items).slice(0, 30),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${profile.name} Portfolio`,
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${profile.name} | ${profile.primaryTitle}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <ContentProvider content={content}>
      <MotionProvider>{children}</MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {/* A plain async tag (React hoists it to <head>); next/script adds data-nscript, which AdSense rejects. */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3587427941344024"
        crossOrigin="anonymous"
      />
    </ContentProvider>
  );
}
