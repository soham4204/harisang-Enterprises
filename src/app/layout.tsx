import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fdb813",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://harisangenterprises.in"),
  title: {
    default: "Harisang Enterprises | Crane Rental & Heavy Equipment on Hire in Mumbai",
    template: "%s | Harisang Enterprises",
  },
  description:
    "Harisang Enterprises is India's premier crane and heavy equipment rental company in Mumbai & Thane. Hydraulic Mobile Cranes, Road Rollers, JCBs, Poclains, Forklifts, and Hydra Cranes on hire 24/7.",
  keywords: [
    "Crane on hire Mumbai",
    "Crane rental Thane",
    "JCB on hire Mumbai",
    "Road Roller rental Maharashtra",
    "Poclain excavator on hire",
    "Forklift rental services Mumbai",
    "Hydra crane hire Thane",
    "Farana crane on hire",
    "Heavy lifting equipment Mumbai",
    "Truck trailer hire Mumbai",
    "Harisang Enterprises",
    "Heavy machinery rental Wagle Estate",
  ],
  authors: [{ name: "Harisang Enterprises", url: "https://harisangenterprises.in" }],
  creator: "Harisang Enterprises",
  publisher: "Harisang Enterprises",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://harisangenterprises.in",
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
    icon: [
      { url: "/assets/logo.png" },
      { url: "/assets/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Harisang Enterprises | Heavy Equipment & Crane Rental Services in Mumbai",
    description:
      "Reliable heavy lifting, hydraulic telescopic cranes, JCBs, and earthmoving machinery on hire 24/7 across Mumbai, Thane, and Maharashtra.",
    url: "https://harisangenterprises.in",
    siteName: "Harisang Enterprises",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/Crane.jpeg",
        width: 1200,
        height: 630,
        alt: "Harisang Enterprises Heavy Mobile Crane Fleet in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harisang Enterprises | Crane & Heavy Equipment Rental Mumbai",
    description:
      "Heavy mobile cranes, JCB, road rollers, and forklifts on hire in Mumbai & Thane with certified operators.",
    images: ["/assets/Crane.jpeg"],
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Thane, Mumbai, Maharashtra",
    "geo.position": "19.1914;72.9515",
    ICBM: "19.1914, 72.9515",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-[#0f141c] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
