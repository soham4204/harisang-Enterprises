"use client";

import { X, Phone, MessageSquare, MapPin, Mail } from "lucide-react";
import Image from "next/image";
import { NAV_ITEMS, SITE_CONFIG, getTelUrl, getWhatsAppUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGetCall: () => void;
}

export default function MobileNav({ isOpen, onClose, onOpenGetCall }: MobileNavProps) {
  if (!isOpen) return null;

  const handlePhoneClick = () => {
    logTrafficEvent("CALL_CLICK", "Mobile Menu Call Button");
    onClose();
  };

  const handleWhatsAppClick = () => {
    logTrafficEvent("WHATSAPP_CLICK", "Mobile Menu WhatsApp Button");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0f141c] border-l border-[#222d3d] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#222d3d] bg-[#151c27]">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded overflow-hidden bg-white p-0.5">
                <Image
                  src="/assets/logo.png"
                  alt={SITE_CONFIG.name}
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-white text-base tracking-wide">
                HARISANG
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#222d3d] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Warning stripe decorative line */}
          <div className="h-1.5 hazard-stripes w-full" />

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-slate-200 hover:text-[#fdb813] hover:bg-[#151c27] font-medium text-base transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[#fdb813] text-sm">›</span>
              </a>
            ))}
          </nav>

          {/* Quick Action CTAs */}
          <div className="p-4 space-y-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenGetCall();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#fdb813] hover:bg-[#e5a812] text-black font-bold py-3 rounded-lg transition-transform active:scale-95 shadow-md text-sm"
            >
              <span>Get A Callback</span>
            </button>

            <a
              href={getTelUrl()}
              onClick={handlePhoneClick}
              className="w-full flex items-center justify-center gap-2 bg-[#0d2847] hover:bg-[#183e6b] text-white border border-[#223d60] font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-[#fdb813]" />
              <span>Call: {SITE_CONFIG.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-[#222d3d] bg-[#121721] text-xs text-slate-400 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#fdb813] shrink-0 mt-0.5" />
            <span>Wagle Estate, Thane (W), Maharashtra</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#fdb813] shrink-0" />
            <span className="truncate">{SITE_CONFIG.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
