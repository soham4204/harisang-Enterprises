"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { SITE_CONFIG, getTelUrl, getMailtoUrl, getWhatsAppUrl } from "@/lib/constants";
import { logTrafficEvent, saveCallbackLead } from "@/lib/analytics";

export default function ContactSection() {
  const [phoneInput, setPhoneInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneInput.trim().replace(/\D/g, "");
    if (clean.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    saveCallbackLead(clean, "Contact Section Form");
    setSubmitted(true);
    setError("");
    setPhoneInput("");
  };

  const handlePhoneClick = () => {
    logTrafficEvent("CALL_CLICK", "Contact Section Phone Box");
  };

  const handleWhatsAppClick = () => {
    logTrafficEvent("WHATSAPP_CLICK", "Contact Section WhatsApp Box");
  };

  return (
    <section id="contact-details" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0f3b73] font-extrabold text-xs uppercase tracking-widest mb-3 shadow-xs">
            REACH OUR TEAM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Contact Harisang Enterprises
          </h2>
          <div className="w-24 h-1.5 hazard-stripes mx-auto rounded-full mb-5" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Need urgent machinery rental for your site? Contact our equipment dispatch coordinators 24/7 for instant equipment availability and rental quotation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Call Us */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#fdb813] transition-all flex flex-col justify-between shadow-sm hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0f3b73] flex items-center justify-center mb-5 border border-blue-100">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Direct Phone Line</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Connect directly with our fleet manager for immediate crane allocation or site inspections.
              </p>
            </div>
            <a
              href={getTelUrl()}
              onClick={handlePhoneClick}
              className="inline-flex items-center justify-center gap-2 bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold py-3.5 px-4 rounded-xl text-sm transition-transform active:scale-95 shadow-sm"
            >
              <Phone className="w-4 h-4 fill-black" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#128C7E] transition-all flex flex-col justify-between shadow-sm hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#128C7E] flex items-center justify-center mb-5 border border-emerald-100">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant WhatsApp</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Send site photos, lifting requirements, and location coordinates for quick quotation.
              </p>
            </div>
            <a
              href={getWhatsAppUrl()}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0b665c] text-white font-extrabold py-3.5 px-4 rounded-xl text-sm transition-transform active:scale-95 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Head Office Address */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#fdb813] transition-all flex flex-col justify-between shadow-sm hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0f3b73] flex items-center justify-center mb-5 border border-blue-100">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Head Office</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {SITE_CONFIG.address}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0f3b73]" />
              <span className="font-medium">24 Hours / 7 Days Fleet Operations</span>
            </div>
          </div>
        </div>

        {/* Quick Callback Form */}
        <div className="mt-14 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Request A Priority Callback
            </h3>
            <p className="text-sm text-slate-600">
              Enter your mobile number below and our equipment specialist will ring you back within 15 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-lg font-bold text-slate-900">Callback Request Received!</h4>
              <p className="text-sm text-slate-600 mt-1">
                Thank you. An equipment coordinator from Harisang Enterprises will call you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold text-[#0f3b73] underline cursor-pointer"
              >
                Submit another number
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className="flex-1 bg-white border border-slate-300 focus:border-[#0f3b73] text-slate-900 px-4 py-3.5 rounded-xl text-base outline-none transition-colors shadow-xs placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold px-6 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>Call Me Back</span>
                </button>
              </div>
              {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}
              <p className="text-xs text-slate-500 text-center">
                Your details are strictly used for rental communication only. No spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
