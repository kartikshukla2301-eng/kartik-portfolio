import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kartik Shukla | Full Stack Developer & AI Engineer",
    short_name: "Kartik Shukla",
    description:
      "Portfolio of Kartik Shukla, Full Stack Developer and AI Engineer. Explore projects, production development experience, technical skills and AI-powered applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFC",
    theme_color: "#4F46E5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
