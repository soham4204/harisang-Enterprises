"use client";

import { useState } from "react";
import { X, PhoneCall, CheckCircle2 } from "lucide-react";
import { saveCallbackLead } from "@/lib/analytics";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/constants";

interface GetACallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetACallModal({ isOpen, onClose }: GetACallModalProps) {
  const [mobile, setMobile] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = mobile.replace(/\D/g, "");
    if (cleanNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    saveCallbackLead(cleanNumber, "Get A Call Modal");
    setIsSuccess(true);
    setError("");
  };

  const handleReset = () => {
    setMobile("");
    setIsSuccess(false);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-sm bg-white border-2 border-[#fdb813] rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#fdb813] text-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 fill-black" />
            <h3 className="font-black text-xl tracking-tight text-slate-950">Get A Call</h3>
          </div>
          <button
            onClick={handleReset}
            className="w-7 h-7 rounded-full bg-black/10 hover:bg-black text-black hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Hazard stripe accent line */}
        <div className="h-1 hazard-stripes w-full" />

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                Thank You!
              </h4>
              <p className="text-xs text-slate-600 mb-6">
                Your request has been registered. An equipment specialist from {SITE_CONFIG.name} will call you shortly.
              </p>

              <div className="space-y-2">
                <a
                  href={getWhatsAppUrl(`Hello Harisang Enterprises, I just requested a callback for mobile number: ${mobile}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                >
                  Also Chat on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Enter your mobile number to receive immediate machinery availability and rental quotes:
              </p>

              <div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter 10-Digit Mobile Number"
                  maxLength={10}
                  className="w-full bg-slate-50 border-2 border-slate-300 focus:border-[#0f3b73] text-slate-900 px-4 py-3 rounded-xl text-base outline-none transition-colors text-center font-semibold tracking-wider placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400"
                  autoFocus
                />
                {error && (
                  <p className="text-xs text-rose-500 mt-1.5 font-medium text-center">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold py-3.5 rounded-xl text-sm transition-transform active:scale-95 shadow-md cursor-pointer uppercase tracking-wider"
              >
                Send Request
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Fast Response • Direct Fleet Owners • Thane & Mumbai
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
