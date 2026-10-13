"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, ShieldCheck } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG, getTelUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";
import MobileNav from "./MobileNav";

interface HeaderProps {
  onOpenGetCall: () => void;
}

export default function Header({ onOpenGetCall }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePhoneClick = () => {
    logTrafficEvent("CALL_CLICK", "Header Call Now Button");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link href="#home" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-1 border-2 border-[#fdb813] shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt={SITE_CONFIG.name}
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-[#0f3b73] flex items-center gap-1.5">
                  HARISANG
                  <span className="text-xs bg-[#fdb813] text-black px-1.5 py-0.5 rounded font-extrabold uppercase shadow-xs">
                    Rentals
                  </span>
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-wide">
                  ENTERPRISES • MUMBAI & THANE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-[#0f3b73] hover:bg-slate-100 transition-colors rounded-lg"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Action Button (Desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={getTelUrl()}
                onClick={handlePhoneClick}
                className="flex items-center gap-2 bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold px-4 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md transition-all active:scale-95 group"
              >
                <Phone className="w-4 h-4 fill-black group-hover:rotate-12 transition-transform" />
                <span>Call: {SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-lg bg-slate-100 text-slate-750 hover:text-[#0f3b73] border border-slate-200 hover:border-[#0f3b73] transition-all cursor-pointer"
                aria-label="Open main menu"
              >
                <Menu className="w-6 h-6 text-slate-800" />
              </button>
            </div>
          </div>
        </div>

        {/* Hazard warning stripe bottom edge */}
        <div className="h-[3px] hazard-stripes w-full opacity-90" />
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenGetCall={onOpenGetCall}
      />
    </>
  );
}
