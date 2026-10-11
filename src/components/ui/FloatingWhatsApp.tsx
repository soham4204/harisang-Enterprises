"use client";

import { MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

export default function FloatingWhatsApp() {
  const handleClick = () => {
    logTrafficEvent("WHATSAPP_CLICK", "Sticky Floating WhatsApp Button");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <a
        href={getWhatsAppUrl("Hello Harisang Enterprises, I need heavy equipment rental quotation in Mumbai.")}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Chat with Harisang Enterprises on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        <MessageSquare className="w-7 h-7 fill-white stroke-none" />
      </a>

      {/* Hover tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#0d2847] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg border border-[#183e6b] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Quick WhatsApp Quote
      </div>
    </div>
  );
}
