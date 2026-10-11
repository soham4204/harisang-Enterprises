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
    <div className="group bg-[#151c27] rounded-xl overflow-hidden border border-[#222d3d] hover:border-[#fdb813] transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between">
      {/* Image Container with Badge */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/40">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151c27] via-transparent to-black/30" />

        {/* "From Mumbai" Badge */}
        <div className="absolute top-3 left-3 bg-[#fdb813] text-black font-extrabold text-xs px-2.5 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider">
          <MapPin className="w-3 h-3 text-black fill-black" />
          <span>{service.location}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#fdb813] transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-5">
            {service.description}
          </p>
        </div>

        {/* Buttons (Call Now & WhatsApp) */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#222d3d]">
          <a
            href={service.phoneHref}
            onClick={handleCall}
            className="flex items-center justify-center gap-1.5 bg-[#0d2847] hover:bg-[#183e6b] text-white font-semibold text-xs sm:text-sm py-2.5 px-3 rounded-lg border border-[#223d60] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#fdb813]" />
            <span>Call Now</span>
          </a>

          <a
            href={getWhatsAppUrl(service.whatsappMessage)}
            onClick={handleWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#128C7E] hover:bg-[#0b665c] text-white font-semibold text-xs sm:text-sm py-2.5 px-3 rounded-lg transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
