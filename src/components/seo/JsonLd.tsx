import Script from "next/script";

export default function JsonLd() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Harisang Enterprises",
    alternateName: "Harisang Crane & Heavy Equipment Rental",
    image: "https://harisangenterprises.in/assets/Crane.jpeg",
    logo: "https://harisangenterprises.in/assets/logo.png",
    "@id": "https://harisangenterprises.in/#business",
    url: "https://harisangenterprises.in",
    telephone: "+91-9987003674",
    email: "Harisangenterprises@gmail.com",
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer, UPI, Cheque",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7/1, Suresh Niwas, kisan nagar no. 2, road no. 16, wagle estate",
      addressLocality: "Thane (West)",
      addressRegion: "Maharashtra",
      postalCode: "400604",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.1914",
      longitude: "72.9515",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Thane" },
      { "@type": "City", name: "Navi Mumbai" },
      { "@type": "City", name: "Kalyan" },
      { "@type": "City", name: "Bhiwandi" },
      { "@type": "State", name: "Maharashtra" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Heavy Machinery & Equipment Rental Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Crane on hire in Mumbai",
            description: "Heavy mobile cranes with hydraulic telescopic booms for industrial lifting and construction.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Road Roller on hire",
            description: "Vibratory soil and asphalt road rollers for highway construction and compaction.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "JCB on hire in Thane & Mumbai",
            description: "Versatile backhoe loaders for heavy digging, trenching, and site leveling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Poclain excavator on hire",
            description: "Heavy hydraulic tracked excavators for demolition and deep rock excavation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Forklift on hire",
            description: "Diesel and electric forklifts for warehouse loading and pallet handling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Truck Trailer on hire",
            description: "Multi-axle low-bed trailers for heavy machinery transportation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hydra crane on hire",
            description: "Pick-and-carry hydra cranes for tight space industrial lifting.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Farana crane on hire",
            description: "High-tonnage articulated Farana cranes for precision site operations.",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What equipment does Harisang Enterprises provide on hire in Mumbai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harisang Enterprises provides an extensive heavy machinery rental fleet including Hydraulic Mobile Cranes, Road Rollers, JCB Backhoe Loaders, Poclain Excavators, Forklifts, Multi-Axle Truck Trailers, Hydra Cranes, and Farana Cranes across Mumbai, Thane, and Maharashtra.",
        },
      },
      {
        "@type": "Question",
        name: "Are machine operators and fuel included with equipment rental?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our machinery is supplied with highly skilled, safety-certified operators and riggers. Flexible hire packages with or without fuel (dry/wet hire) are available depending on your project duration and preferences.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly can a crane or JCB be dispatched to my site?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer 24/7 rapid mobilization throughout Mumbai, Thane, Navi Mumbai, and surrounding industrial corridors. Emergency crane deployments can frequently be mobilized within 2-4 hours upon booking confirmation.",
        },
      },
      {
        "@type": "Question",
        name: "What are the minimum rental periods available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accommodate shift-based (single shift/daily), weekly, monthly, and multi-year long-term project contracts with discounted rates for long-term infrastructure works.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
