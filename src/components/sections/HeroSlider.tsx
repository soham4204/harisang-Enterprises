"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Phone, MessageSquare, ArrowDownCircle } from "lucide-react";
import { SITE_CONFIG, getTelUrl, getWhatsAppUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface SlideData {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
}

const SLIDES: SlideData[] = [
  {
    image: "/assets/Crane2.jpeg",
    badge: "PREMIUM HEAVY LIFTING SOLUTIONS",
    title: "End-to-End Crane Rental & Heavy Equipment in Mumbai",
    subtitle: "Hydraulic mobile cranes, telescopic booms, and oversized project cargo handling across Maharashtra with certified operators.",
    ctaText: "Inquire Crane Rental",
  },
  {
    image: "/assets/JCB.jpeg",
    badge: "EARTHMOVING & DEMOLITION",
    title: "High-Performance JCB & Poclain Excavators on Hire",
    subtitle: "Versatile 4x4 backhoe loaders and heavy tracked excavators ready for excavation, foundation trenching, and site leveling.",
    ctaText: "Inquire JCB Hire",
  },
  {
    image: "/assets/Roadroller.jpeg",
    badge: "ROAD & SOIL COMPACTION",
    title: "Vibratory Road Rollers for Highways & Industrial Yards",
    subtitle: "Reliable single and tandem asphalt road rollers engineered for superior soil compaction and highway construction.",
    ctaText: "Inquire Road Roller",
  },
  {
    image: "/assets/Forklist.jpeg",
    badge: "WAREHOUSE & LOGISTICS",
    title: "Industrial Forklifts & Multi-Axle Trailers on Hire",
    subtitle: "Precision pallet loading, container handling, and nationwide heavy haulage transportation for industrial machinery.",
    ctaText: "Inquire Forklift & Trailers",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  const handlePhoneClick = () => {
    logTrafficEvent("CALL_CLICK", `Hero Slider Phone CTA (Slide ${currentSlide + 1})`);
  };

  const handleWhatsAppClick = () => {
    logTrafficEvent("WHATSAPP_CLICK", `Hero Slider WhatsApp CTA (Slide ${currentSlide + 1})`);
  };

  return (
    <section
      id="home"
      className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Background */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Image with slight scale */}
          <div className="relative w-full h-full transform scale-105 duration-10000">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.45] contrast-110"
              priority={index === 0}
            />
          </div>

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f141c] via-transparent to-black/50" />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl sm:max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0d2847]/85 border border-[#183e6b] text-[#fdb813] font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#fdb813] animate-pulse"></span>
                  <span>{slide.badge}</span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md mb-4 sm:mb-6">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 max-w-xl font-normal leading-relaxed drop-shadow">
                  {slide.subtitle}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#services"
                    className="flex items-center gap-2 bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowDownCircle className="w-4 h-4" />
                  </a>

                  <a
                    href={getTelUrl()}
                    onClick={handlePhoneClick}
                    className="flex items-center gap-2 bg-[#0d2847] hover:bg-[#183e6b] text-white border border-[#223d60] font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#fdb813]" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={getWhatsAppUrl(`Hello Harisang Enterprises, inquiring regarding: ${slide.title}`)}
                    onClick={handleWhatsAppClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#128C7E] hover:bg-[#0b665c] text-white font-bold px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#fdb813] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-[#fdb813] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2 sm:gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all rounded-full cursor-pointer ${
              index === currentSlide
                ? "w-8 sm:w-10 h-2.5 bg-[#fdb813] shadow-md"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
