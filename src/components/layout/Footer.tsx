"use client";

import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { SITE_CONFIG, NAV_ITEMS, getTelUrl, getMailtoUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface FooterProps {
  onOpenLightbox?: (index: number) => void;
}

const FOOTER_THUMBNAILS = [
  { src: "/assets/Crane.jpeg", alt: "Crane hire thumbnail", index: 0 },
  { src: "/assets/JCB.jpeg", alt: "JCB thumbnail", index: 1 },
  { src: "/assets/Roadroller.jpeg", alt: "Road roller thumbnail", index: 2 },
  { src: "/assets/Forklist.jpeg", alt: "Forklift thumbnail", index: 3 },
  { src: "/assets/JCBcrane.jpeg", alt: "Excavator thumbnail", index: 4 },
  { src: "/assets/Truck.jpeg", alt: "Truck trailer thumbnail", index: 5 },
];

export default function Footer({ onOpenLightbox }: FooterProps) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePhoneClick = () => {
    logTrafficEvent("CALL_CLICK", "Footer Phone Link");
  };

  return (
    <footer id="contact" className="bg-[#0b0e14] text-slate-300 pt-16 border-t border-[#1e2736]">
      {/* Top Hazard Line */}
      <div className="h-1 hazard-stripes w-full mb-12 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Get In Touch */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#fdb813] rounded-sm"></span>
              Get In Touch
            </h4>
            <div className="space-y-3.5 text-sm">
              <p className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-[#fdb813] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </p>
              <p>
                <a
                  href={getTelUrl()}
                  onClick={handlePhoneClick}
                  className="flex items-center gap-3 text-slate-300 hover:text-[#fdb813] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#fdb813] shrink-0" />
                  <span>{SITE_CONFIG.phoneDisplay}</span>
                </a>
              </p>
              <p>
                <a
                  href={getMailtoUrl()}
                  className="flex items-center gap-3 text-slate-300 hover:text-[#fdb813] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#fdb813] shrink-0" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </p>
            </div>

            <h5 className="text-white text-xs uppercase font-bold tracking-wider mt-6 mb-3">
              Follow Our Fleet
            </h5>
            <div className="flex items-center gap-2">
              {/* Twitter / X */}
              <a
                href={SITE_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#151c27] hover:bg-[#fdb813] hover:text-black text-slate-300 flex items-center justify-center transition-colors border border-[#222d3d]"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#151c27] hover:bg-[#fdb813] hover:text-black text-slate-300 flex items-center justify-center transition-colors border border-[#222d3d]"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.704 0-1.27.135-1.632.41-.362.274-.52.793-.52 1.624v2.016h4.526l-.602 3.667h-3.924v7.98h-4.663z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#151c27] hover:bg-[#fdb813] hover:text-black text-slate-300 flex items-center justify-center transition-colors border border-[#222d3d]"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-[#151c27] hover:bg-[#fdb813] hover:text-black text-slate-300 flex items-center justify-center transition-colors border border-[#222d3d]"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#fdb813] rounded-sm"></span>
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-[#fdb813] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#fdb813]" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Gallery Thumbnails */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#fdb813] rounded-sm"></span>
              Fleet Gallery
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {FOOTER_THUMBNAILS.map((thumb) => (
                <button
                  key={thumb.index}
                  onClick={() => onOpenLightbox && onOpenLightbox(thumb.index)}
                  className="relative aspect-square rounded overflow-hidden border border-[#222d3d] hover:border-[#fdb813] transition-all group cursor-pointer"
                  title="View enlarged image"
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Click thumbnail to open full-screen lightbox preview.
            </p>
          </div>

          {/* Column 4: About Harisang Enterprises */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#fdb813] rounded-sm"></span>
              About Company
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Harisang Enterprises is one of India’s leading end-to-end Crane rental & hiring companies. Specializing in offering an extensive range of equipment on hire basis; besides this, we also offer handling of oversized and heavy lifting projects across Mumbai, Thane, and Maharashtra.
            </p>
            <div className="p-3 rounded-lg bg-[#151c27] border border-[#222d3d] text-xs text-slate-300">
              <span className="font-semibold text-[#fdb813]">Heavy Equipment Fleet:</span> Cranes, Road Rollers, JCBs, Poclains, Forklifts, and Multi-Axle Trailers.
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-[#1a2331] bg-[#07090d] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            &copy; 2026 <strong className="text-white">Harisang Enterprises</strong>. All Rights Reserved. Heavy Equipment & Crane Rental Specialists.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#fdb813] transition-colors bg-[#151c27] px-3 py-1.5 rounded border border-[#222d3d] hover:border-[#fdb813] cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#fdb813]" />
              <span>Back To Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
