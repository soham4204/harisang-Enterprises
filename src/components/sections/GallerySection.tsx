"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, Camera } from "lucide-react";
import { GALLERY_DATA } from "@/data/galleryData";
import LightboxModal from "./LightboxModal";

export default function GallerySection() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 bg-[#0b0e14] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0d2847] border border-[#183e6b] text-[#fdb813] font-bold text-xs uppercase tracking-widest mb-3">
            EQUIPMENT IN ACTION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Our Gallery
          </h2>
          <div className="w-24 h-1.5 hazard-stripes mx-auto rounded-full mb-5" />
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Take a visual tour through our heavy lifting deployments, crane operations, road construction works, and logistics fleet in operation across various project sites.
          </p>
        </div>

        {/* 10 Gallery Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {GALLERY_DATA.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#151c27] border border-[#222d3d] hover:border-[#fdb813] transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-between p-4 text-center">
                <span className="self-end p-2 rounded-full bg-[#fdb813] text-black">
                  <Maximize2 className="w-4 h-4" />
                </span>

                <div>
                  <span className="text-[11px] font-bold text-[#fdb813] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white line-clamp-2 mt-1">
                    {item.title}
                  </h4>
                </div>

                <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full">
                  Click to Expand
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(idx) => setActiveLightboxIndex(idx)}
      />
    </section>
  );
}
