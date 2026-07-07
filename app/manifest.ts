import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Babylon Translation Agency",
    short_name: "Babylon",
    description:
      "Translation agency in Lutsk: translation into all world languages, notarization, apostille, document legalization.",
    start_url: "/",
    display: "browser",
    background_color: "#F6F7F9",
    theme_color: "#20337A",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
