"use client";

import { useState, useEffect } from "react";
import ContactBar from "@/components/layout/ContactBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/sections/HeroSlider";
import ServicesSection from "@/components/sections/ServicesSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import GetACallModal from "@/components/ui/GetACallModal";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import BackToTop from "@/components/ui/BackToTop";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import LightboxModal from "@/components/sections/LightboxModal";
import FaqSection from "@/components/sections/FaqSection";

export default function HomePage() {
  const [getCallModalOpen, setGetCallModalOpen] = useState(false);
  const [footerLightboxIndex, setFooterLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    // Show Get A Call modal after 5 seconds on first visit (like reference site)
    const hasSeenPopup = sessionStorage.getItem("harisang_modal_seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setGetCallModalOpen(true);
        sessionStorage.setItem("harisang_modal_seen", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f141c] text-white flex flex-col selection:bg-[#fdb813] selection:text-black">
      {/* Automated Traffic Tracker */}
      <AnalyticsTracker pageName="Home" />

      {/* Top Contact Strip */}
      <ContactBar onOpenGetCall={() => setGetCallModalOpen(true)} />

      {/* Main Navigation Header */}
      <Header onOpenGetCall={() => setGetCallModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Slider Area */}
        <HeroSlider />

        {/* Services Catalogue (8 Equipment Cards) */}
        <ServicesSection onOpenGetCall={() => setGetCallModalOpen(true)} />

        {/* Gallery Grid & Lightbox */}
        <GallerySection />

        {/* SEO FAQ Section with Rich Answers */}
        <FaqSection />

        {/* Contact Details & Priority Callback Section */}
        <ContactSection />
      </main>

      {/* Footer Area */}
      <Footer onOpenLightbox={(idx) => setFooterLightboxIndex(idx)} />

      {/* Interactive Modals & Persistent CTAs */}
      <GetACallModal
        isOpen={getCallModalOpen}
        onClose={() => setGetCallModalOpen(false)}
      />

      {/* Lightbox triggered from footer gallery thumbnails */}
      <LightboxModal
        currentIndex={footerLightboxIndex}
        onClose={() => setFooterLightboxIndex(null)}
        onNavigate={(idx) => setFooterLightboxIndex(idx)}
      />

      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}
