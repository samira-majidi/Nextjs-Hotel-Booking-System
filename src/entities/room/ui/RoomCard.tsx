import { BedDouble, Users } from 'lucide-react';
import Image from 'next/image';
import React, { ReactNode } from 'react';

import { GalleryImageDto } from '../model/types';

interface RoomCardProps {
  id: string;
  type: string; // e.g., DOUBLE, TWIN
  capacity: number;
  basePrice: string | number;
  galleryImages: GalleryImageDto[];
  actionSlot?: ReactNode; 
}

export function RoomCard({
  type,
  capacity,
  basePrice,
  galleryImages,
  actionSlot,
}: RoomCardProps) {
  // فرمت کردن قیمت
  const formattedPrice = Number(basePrice).toLocaleString();
  
  // بررسی امن برای وجود تصویر
  const hasImage = galleryImages && galleryImages.length > 0;

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 sm:p-5 md:p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      
      {/* بخش تصویر اتاق */}
      <div className="relative w-full md:w-64 h-56 md:h-auto shrink-0 rounded-xl overflow-hidden bg-gray-50">
        {hasImage ? (
          <Image
            src={galleryImages[0].path}
            alt={`${type} Room`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 256px"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-400">
            No Image Available
          </div>
        )}
      </div>

      {/* بخش اطلاعات و قیمت */}
      <div className="flex flex-col flex-1 justify-between">
        
        {/* هدر کارت: عنوان (سایز فونت کوچکتر شد) */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 capitalize">
            {type.toLowerCase()} Room
          </h3>
        </div>

        {/* ویژگی‌های اصلی اتاق */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 my-4 text-sm sm:text-base text-gray-700">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            <span className="font-medium">Capacity: {capacity} Guests</span>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-emerald-500" />
            <span className="font-medium capitalize">Type: {type.toLowerCase()}</span>
          </div>
        </div>

        {/* بخش پایین: قیمت و دکمه رزرو */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-auto pt-4 md:pt-5 border-t border-gray-100 gap-4">
          
          {/* باکس قیمت: حالت یک‌خطی و جمع‌وجور */}
          <div className="flex items-baseline gap-1.5 w-full sm:w-auto">
            <span className="text-base sm:text-lg font-bold text-blue-600">
              $ {formattedPrice}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-400">
              / night
            </span>
          </div>

          {/* دکمه عملیات (Slot) */}
          <div className="w-full sm:w-auto mt-2 sm:mt-0 *:w-full *:sm:w-auto">
            {actionSlot}
          </div>
        </div>

      </div>
    </div>
  );
}
