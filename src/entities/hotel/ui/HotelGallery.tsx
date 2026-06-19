"use client";

import Image from "next/image";
import { useState } from "react";

import { GalleryImage } from "@/entities/hotel/model/types/galleryImage";

interface HotelGalleryProps {
  images: GalleryImage[];
}

export function HotelGallery({ images }: HotelGalleryProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(
    images?.length > 0 ? images[0] : null
  );

  if (!images || images.length === 0 || !activeImage) {
    return (
      // ارتفاع در حالت بدون عکس هم اصلاح شد
      <div className="w-full h-[225px] sm:h-[300px] md:h-[340px] bg-slate-100 flex items-center justify-center rounded-b-lg md:rounded-none">
        <span className="text-slate-400 font-medium">No images available</span>
      </div>
    );
  }

  const thumbnails = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    // 👇 ارتفاع‌ها دوباره ۵٪ کاهش یافت تا جمعاً ۲۵٪ نسبت به فایل اولیه کمتر شود
    <div className="relative block w-full min-h-[225px] h-[225px] sm:min-h-[300px] sm:h-[300px] md:min-h-[340px] md:h-[340px] lg:min-h-[380px] lg:h-[380px] bg-slate-200 shrink-0">
      
      <Image
        src={activeImage.path}
        alt="Hotel Main View"
        fill
        priority
        unoptimized={true} 
        className="object-cover object-center transition-all duration-300"
        sizes="100vw"
      />

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 flex items-center gap-2 md:gap-3 z-10">
        {thumbnails.map((img, index) => {
          const isLastThumbnail = index === 3;
          const showMoreOverlay = isLastThumbnail && remainingCount > 0;
          const isActive = activeImage.id === img.id;

          return (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className={`relative block shrink-0 w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 rounded sm:rounded-md overflow-hidden border-[1.5px] sm:border-2 shadow-lg cursor-pointer group transition-all duration-300 hover:-translate-y-1 ${
                isActive ? "border-blue-500 scale-105" : "border-white"
              }`}
            >
              <Image
                src={img.path}
                alt={`Hotel view ${index + 1}`}
                fill
                unoptimized={true} 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
              />
              
              {showMoreOverlay && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center text-white text-xs sm:text-sm font-semibold tracking-wide">
                  +{remainingCount} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
