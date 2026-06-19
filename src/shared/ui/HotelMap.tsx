import { MapPin } from 'lucide-react'; // 💡 اضافه کردن آیکون
import React from 'react';

interface HotelMapProps {
  address: string;
  city: string;
}

export default function HotelMap({ address, city }: HotelMapProps) {
  const fullAddress = `${address}, ${city}, Iran`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
      {/* بخش هدر فشرده‌تر */}
      <div className="bg-slate-50 p-4 border-b border-slate-100">
        <h3 className="text-lg font-bold tracking-tight text-slate-800 flex items-center gap-2">
          {/* 💡 جایگزینی ایموجی با آیکون سبز رنگ */}
          <MapPin className="w-5 h-5 text-emerald-500" />
          Location
        </h3>
        <p className="text-sm font-medium text-slate-500 mt-1 truncate">
          {city}، {address}
        </p>
      </div>
      
      {/* بخش نقشه با ارتفاع کمتر */}
      <div className="relative w-full h-[250px] sm:h-[280px] bg-slate-100">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>
      </div>
    </div>
  );
}
