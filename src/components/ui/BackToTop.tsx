"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl bg-white hover:bg-[#fdb813] text-slate-800 hover:text-black border border-slate-200 hover:border-[#fdb813] shadow-lg transition-all duration-300 active:scale-95 cursor-pointer animate-in fade-in"
      aria-label="Scroll to top"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5 text-[#0f3b73] hover:text-black" />
    </button>
  );
}
