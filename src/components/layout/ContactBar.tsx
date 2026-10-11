"use client";

import { Phone, Mail, Clock, PhoneCall } from "lucide-react";
import { SITE_CONFIG, getTelUrl, getMailtoUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface ContactBarProps {
  onOpenGetCall: () => void;
}

export default function ContactBar({ onOpenGetCall }: ContactBarProps) {
  const handlePhoneClick = () => {
    logTrafficEvent("CALL_CLICK", "Contact Bar Phone Link");
  };

  return (
    <div className="bg-[#091e35] text-slate-200 border-b border-[#183e6b] text-xs sm:text-sm py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Phone & Email */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href={getTelUrl()}
            onClick={handlePhoneClick}
            className="flex items-center gap-2 hover:text-[#fdb813] transition-colors font-medium group"
            title="Call Harisang Enterprises"
          >
            <span className="p-1 rounded bg-[#0d2847] text-[#fdb813] group-hover:bg-[#fdb813] group-hover:text-black transition-colors">
              <Phone className="w-3.5 h-3.5" />
            </span>
            <span>{SITE_CONFIG.phoneDisplay}</span>
          </a>

          <a
            href={getMailtoUrl()}
            className="hidden sm:flex items-center gap-2 hover:text-[#fdb813] transition-colors text-slate-300"
            title="Email Harisang Enterprises"
          >
            <span className="p-1 rounded bg-[#0d2847] text-[#fdb813]">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <span>{SITE_CONFIG.email}</span>
          </a>
        </div>

        {/* Right Side: Working hours & Get A Call */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">
          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs">24/7 Heavy Lifting Support</span>
          </div>

          <button
            onClick={onOpenGetCall}
            className="flex items-center gap-1.5 bg-[#fdb813] hover:bg-[#e5a812] text-black font-semibold px-3 py-1 rounded text-xs tracking-wide shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Get A Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}
