export const SITE_CONFIG = {
  name: "Harisang Enterprises",
  shortName: "Harisang",
  tagline: "Heavy Lifting & Equipment Rental Services",
  phoneDisplay: "+91 9987003674",
  phoneRaw: "+919987003674",
  email: "Harisangenterprises@gmail.com",
  whatsappNumber: "919987003674",
  address: "7/1, Suresh Niwas, kisan nagar no. 2, road no. 16, wagle estate, Thane(West), Maharashtra - 400 604",
  hours: "24/7 Available for Emergency Lifting & Bookings",
  socials: {
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
};

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Our Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Our Gallery", href: "#gallery" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact Us", href: "#contact-details" },
];

export function getWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || "Hello Harisang Enterprises, I would like to inquire about equipment rental in Mumbai.";
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getTelUrl(): string {
  return `tel:${SITE_CONFIG.phoneRaw}`;
}

export function getMailtoUrl(): string {
  return `mailto:${SITE_CONFIG.email}`;
}
