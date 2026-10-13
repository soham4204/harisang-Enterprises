"use client";

import Image from "next/image";
import { ShieldCheck, Award, Clock, Wrench, CheckCircle2, Phone } from "lucide-react";
import { SITE_CONFIG, getTelUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface AboutSectionProps {
  onOpenGetCall: () => void;
}

export default function AboutSection({ onOpenGetCall }: AboutSectionProps) {
  const handleCall = () => {
    logTrafficEvent("CALL_CLICK", "About Section Call CTA");
  };

  const highlights = [
    {
      icon: ShieldCheck,
      title: "Certified Riggers & Operators",
      desc: "Every crane and heavy machine is operated by licensed, safety-trained technicians adhering to stringent industrial site protocols.",
    },
    {
      icon: Clock,
      title: "24/7 Rapid Site Mobilization",
      desc: "Emergency equipment dispatch within 2-4 hours across Thane, Mumbai, and Maharashtra industrial corridors.",
    },
    {
      icon: Wrench,
      title: "Zero-Downtime Maintained Fleet",
      desc: "Preventive maintenance and routine load testing ensure optimum machinery reliability on high-stakes project sites.",
    },
    {
      icon: Award,
      title: "Oversized & Heavy Project Handling",
      desc: "Extensive experience in metro construction, industrial erections, factory relocations, and complex infrastructure lifts.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Machinery Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100 group">
              <Image
                src="/assets/Crane2.jpeg"
                alt="Harisang Enterprises Heavy Mobile Crane Fleet"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Float Experience Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0f3b73]/95 border border-blue-400/30 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#fdb813] text-black font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                    15+
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">Years of Heavy Lifting Excellence</h4>
                    <p className="text-xs text-blue-100 font-medium">Mumbai • Thane • Maharashtra</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Industrial Hazard Accent Bar */}
            <div className="absolute -bottom-3 -right-3 w-32 h-6 hazard-stripes rounded-lg -z-10 hidden sm:block opacity-85" />
          </div>

          {/* Right Column: About Company Story & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0f3b73] font-extrabold text-xs uppercase tracking-widest mb-3 shadow-xs">
                ABOUT HARISANG ENTERPRISES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                India’s Trusted Heavy Crane & Machinery Rental Partner
              </h2>
              <div className="w-20 h-1.5 hazard-stripes rounded-full mb-6" />
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
                <strong className="text-slate-900">Harisang Enterprises</strong> is one of India’s leading end-to-end Crane rental and hiring companies. Headquartered in Wagle Estate, Thane (West), we specialize in offering an extensive, modern fleet of heavy equipment on shift, monthly, and project contract bases.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Beyond standard machinery rentals, we excel in engineering custom lifting plans for oversized and high-tonnage project cargo, industrial plant assembly, metro works, and road infrastructure projects across Maharashtra.
              </p>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#fdb813] transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="p-2 rounded-xl bg-blue-50 text-[#0f3b73] border border-blue-100">
                        <Icon className="w-4 h-4" />
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenGetCall}
                className="bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold px-6 py-3.5 rounded-xl text-sm transition-transform active:scale-95 shadow-md cursor-pointer"
              >
                Request Equipment Availability
              </button>

              <a
                href={getTelUrl()}
                onClick={handleCall}
                className="flex items-center gap-2 bg-[#0f3b73] hover:bg-[#0a254a] text-white font-bold px-5 py-3.5 rounded-xl text-sm transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#fdb813]" />
                <span>Call: {SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
