import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kartik Shukla | Full Stack Developer & AI Engineer",
    short_name: "Kartik Shukla",
    description:
      "Portfolio of Kartik Shukla, Full Stack Developer and AI Engineer. Explore projects, production development experience, technical skills and AI-powered applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0A08",
    theme_color: "#C96F4A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
