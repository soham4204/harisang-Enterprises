"use client";

import Image from "next/image";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { ServiceItem } from "@/types";
import { getWhatsAppUrl } from "@/lib/constants";
import { logTrafficEvent } from "@/lib/analytics";

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const handleCall = () => {
    logTrafficEvent("CALL_CLICK", `Service Card: ${service.title}`);
  };

  const handleWhatsApp = () => {
    logTrafficEvent("WHATSAPP_CLICK", `Service Card: ${service.title}`);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#fdb813] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
      {/* Image Container with Badge */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* "From Mumbai" Badge */}
        <div className="absolute top-3 left-3 bg-[#fdb813] text-black font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md flex items-center gap-1 uppercase tracking-wider">
          <MapPin className="w-3 h-3 text-black fill-black" />
          <span>{service.location}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0f3b73] transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-5">
            {service.description}
          </p>
        </div>

        {/* Buttons (Call Now & WhatsApp) */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
          <a
            href={service.phoneHref}
            onClick={handleCall}
            className="flex items-center justify-center gap-1.5 bg-[#0f3b73] hover:bg-[#0a254a] text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#fdb813]" />
            <span>Call Now</span>
          </a>

          <a
            href={getWhatsAppUrl(service.whatsappMessage)}
            onClick={handleWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#128C7E] hover:bg-[#0b665c] text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-colors shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
