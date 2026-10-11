"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";
import { getTelUrl, SITE_CONFIG } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What equipment does Harisang Enterprises provide on hire in Mumbai?",
    answer:
      "Harisang Enterprises provides an extensive heavy machinery rental fleet including Hydraulic Mobile Cranes, Road Rollers, JCB Backhoe Loaders, Poclain Excavators, Industrial Forklifts, Multi-Axle Truck Trailers, Hydra Cranes, and Farana Cranes across Mumbai, Thane, Navi Mumbai, and all Maharashtra industrial areas.",
  },
  {
    question: "Are machine operators and riggers included with the equipment?",
    answer:
      "Yes, all machinery rented from Harisang Enterprises comes with licensed, highly experienced, and safety-certified operators and riggers. We also offer options for dry hire or wet hire (with fuel and maintenance included) according to your project requirements.",
  },
  {
    question: "How fast can you mobilize a crane or JCB to our project site?",
    answer:
      "We operate 24/7 across Thane and Mumbai. Standard dispatches are arranged within a few hours, and emergency crane deployments for industrial breakdowns or metro projects can often be mobilized within 2 to 4 hours.",
  },
  {
    question: "What is the minimum hire period for cranes and earthmoving machinery?",
    answer:
      "We provide flexible rental arrangements ranging from single-shift (8-hour/10-hour) emergency lifts to weekly, monthly, and multi-year infrastructure project contracts. Significant cost advantages are offered for extended duration hires.",
  },
  {
    question: "Which areas in Maharashtra does Harisang Enterprises serve?",
    answer:
      "Our primary operations cover Mumbai, Thane, Navi Mumbai, Kalyan, Bhiwandi, Panvel, Taloja, and surrounding MIDC industrial zones. For specialized heavy-lift project cranes and long-term contracts, we mobilize across all of Maharashtra.",
  },
  {
    question: "How do I book equipment or get a rental quotation?",
    answer:
      "You can call us directly at +91 9987003674, message our fleet desk on WhatsApp, or enter your mobile number in the 'Get A Call' popup on this website. Our coordinators will review your site lifting capacity and provide an immediate written quotation.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleCall = () => {
    logTrafficEvent("CALL_CLICK", "FAQ Section Call CTA");
  };

  return (
    <section id="faq" className="py-20 bg-[#0b0e14] text-white relative border-t border-[#1e2736]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0d2847] border border-[#183e6b] text-[#fdb813] font-bold text-xs uppercase tracking-widest mb-3">
            EQUIPMENT RENTAL FAQs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1.5 hazard-stripes mx-auto rounded-full mb-5" />
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about crane hire, JCB leasing, operator certifications, and equipment mobilization across Mumbai and Thane.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#151c27] rounded-xl border border-[#222d3d] hover:border-[#fdb813]/60 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#fdb813] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#fdb813] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-300 leading-relaxed border-t border-[#222d3d]/60 pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 text-center bg-[#151c27] border border-[#222d3d] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-lg font-bold text-white">Have a specific machinery requirement?</h4>
            <p className="text-xs text-slate-400">Speak directly with our technical lifting supervisor today.</p>
          </div>
          <a
            href={getTelUrl()}
            onClick={handleCall}
            className="bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold px-6 py-3 rounded-lg text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md shrink-0"
          >
            <Phone className="w-4 h-4 fill-black" />
            <span>Call {SITE_CONFIG.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
