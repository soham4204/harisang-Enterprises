"use client";

import { SERVICES_DATA } from "@/data/servicesData";
import ServiceCard from "./ServiceCard";
import { Phone, CheckCircle2 } from "lucide-react";
import { getTelUrl, SITE_CONFIG } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface ServicesSectionProps {
  onOpenGetCall: () => void;
}

export default function ServicesSection({ onOpenGetCall }: ServicesSectionProps) {
  const handleCallBanner = () => {
    logTrafficEvent("CALL_CLICK", "Services Banner Call Now");
  };

  return (
    <section id="services" className="py-20 bg-[#0f141c] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0d2847] border border-[#183e6b] text-[#fdb813] font-bold text-xs uppercase tracking-widest mb-3">
            EQUIPMENT RENTAL FLEET
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1.5 hazard-stripes mx-auto rounded-full mb-5" />
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Harisang Enterprises offers an extensive fleet of modern, certified heavy lifting machinery and earthmoving equipment available on hourly, daily, or long-term contract hire across Mumbai, Thane, and Maharashtra.
          </p>
        </div>

        {/* 8 Equipment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Custom Heavy Project Inquiries Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0d2847] via-[#152a42] to-[#0d2847] rounded-2xl p-6 sm:p-8 border border-[#1e4575] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center md:justify-start gap-2">
              <span className="text-[#fdb813]">★</span> Need Specialized Heavy Lifting or Oversized Project Cranes?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              From high-tonnage industrial erections to complex metro infra projects, our certified operators and engineers handle custom heavy-lift execution.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#fdb813]" /> Safety Certified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#fdb813]" /> 24/7 Rapid Mobilization
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#fdb813]" /> Competitive Rental Rates
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenGetCall}
              className="bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold px-6 py-3 rounded-lg text-sm transition-transform active:scale-95 shadow-md cursor-pointer"
            >
              Get Instant Quote
            </button>
            <a
              href={getTelUrl()}
              onClick={handleCallBanner}
              className="bg-black/40 hover:bg-black/60 text-white border border-white/20 font-bold px-5 py-3 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#fdb813]" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
