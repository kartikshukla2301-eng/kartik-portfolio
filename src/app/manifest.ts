import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kartik Shukla — AI Engineer & Full Stack Developer",
    short_name: "Kartik Shukla",
    description:
      "AI Engineer & Full Stack Developer building intelligent AI-powered products and scalable web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#030303",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
