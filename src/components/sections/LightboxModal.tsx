"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { GALLERY_DATA } from "@/data/galleryData";
import { logTrafficEvent } from "@/lib/analytics";

interface LightboxModalProps {
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const currentItem = currentIndex !== null ? GALLERY_DATA[currentIndex] : null;

  const handleNext = useCallback(() => {
    if (currentIndex !== null) {
      const nextIdx = (currentIndex + 1) % GALLERY_DATA.length;
      onNavigate(nextIdx);
    }
  }, [currentIndex, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex !== null) {
      const prevIdx = (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
      onNavigate(prevIdx);
    }
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    if (currentIndex !== null && currentItem) {
      logTrafficEvent("GALLERY_VIEW", `Viewed: ${currentItem.title}`);
    }
  }, [currentIndex, currentItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, handleNext, handlePrev]);

  if (currentIndex === null || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Header Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="bg-[#fdb813] text-black font-extrabold text-xs px-2.5 py-1 rounded uppercase tracking-wider">
            {currentItem.category}
          </span>
          <span className="text-sm font-medium text-slate-300">
            {currentIndex + 1} / {GALLERY_DATA.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-[#fdb813] hover:text-black text-white transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-[#fdb813] hover:text-black text-white transition-all backdrop-blur-sm cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-[#fdb813] hover:text-black text-white transition-all backdrop-blur-sm cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image View */}
      <div className="relative max-w-5xl max-h-[82vh] w-[90vw] h-[75vh] flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={currentItem.src}
            alt={currentItem.title}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Caption Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center bg-gradient-to-t from-black/90 to-transparent z-40">
        <h4 className="text-white text-base sm:text-lg font-bold">
          {currentItem.title}
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Harisang Enterprises Heavy Equipment Fleet • Press Esc or click outside to exit
        </p>
      </div>
    </div>
  );
}
