import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harisang Enterprises - Crane & Heavy Equipment Rental",
    short_name: "Harisang Rentals",
    description: "End-to-End Crane and Heavy Equipment Rental Services in Mumbai & Thane.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f141c",
    theme_color: "#fdb813",
    icons: [
      {
        src: "/assets/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
