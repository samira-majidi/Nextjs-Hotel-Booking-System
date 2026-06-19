import React from 'react';

import { AmenityTag } from '@/shared/ui/AmenityTag';

import { Amenities } from '../model/types';

interface HotelAmenitiesProps {
  amenities: Amenities[];
  className?: string; 
}

export function HotelAmenities({ amenities, className = "" }: HotelAmenitiesProps) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <h2 className="text-xl font-bold text-gray-900 mb-6 px-2">
        Amenities
      </h2>
      
      {/* 
        حذف پس‌زمینه طوسی و gap. 
        اضافه کردن یک حاشیه (border) دور تا دور کل کانتینر.
      */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-transparent">
        {amenities.map((amenity, index) => (
          /* 
            به جای فاصله، به خود آیتم‌ها بردر راست و پایین دادیم.
            فضاهای خالی دیگه هیچ استایل و پس‌زمینه‌ای ندارن.
          */
          <div 
            key={index} 
            className="bg-gray-50 border-r border-b border-gray-200 p-4 flex items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <AmenityTag 
              name={amenity.name} 
              className="!bg-transparent !border-none !p-0 !shadow-none text-gray-700 font-medium text-sm w-full flex items-center gap-3 justify-start [&_svg]:text-emerald-500 [&_svg]:w-5 [&_svg]:h-5"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
