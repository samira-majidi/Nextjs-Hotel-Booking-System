import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AmenityTag } from '@/shared/ui/AmenityTag';
import { StarRating } from '@/shared/ui/StarRating';

import { Hotel } from '../model/types/hotelcard';

interface HotelCardProps {
  hotel: Hotel;
  queryString?: string;
  // ✨ پراپ جدید برای تعیین نوع چیدمان (پیش‌فرض: عمودی)
  layout?: 'vertical' | 'horizontal'; 
}

export default function HotelCard({ hotel, queryString, layout = 'vertical' }: HotelCardProps) {
  const coverImage = hotel.galleryImages?.[0]?.path || hotel.city.imageUrl;
  const shortAddress = hotel.address?.split(/[,،-]/)[0]?.trim() || hotel.address;

  const finalHref = queryString ? `/hotels/${hotel.id}?${queryString}` : `/hotels/${hotel.id}`;

  // متغیری برای تشخیص سریع حالت افقی
  const isHorizontal = layout === 'horizontal';

  return (
    <div 
      className={`flex bg-white rounded-xl border border-gray-200 p-3 gap-3 md:gap-4 shadow-sm hover:shadow-md transition-shadow ${
        // ✨ تفاوت اصلی کلاس‌های والد
        isHorizontal ? 'flex-col sm:flex-row w-full' : 'flex-col h-full'
      }`}
    >
      
      {/* بخش تصویر */}
      <div 
        className={`relative shrink-0 rounded-lg overflow-hidden ${
          // ✨ کنترل ابعاد تصویر بر اساس نوع چیدمان
          isHorizontal 
            ? 'w-full h-48 sm:w-64 md:w-[280px] sm:h-full sm:min-h-[180px]' // در حالت افقی (موبایل عمودیه، تبلت و دسکتاپ افقی میشه)
            : 'w-full h-40' // در حالت عمودی (کارت‌های قبلی)
        }`}
      >
        <Image
          src={coverImage}
          alt={hotel.name}
          fill
          unoptimized={true}
          priority={true}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-50 transition-colors z-10">
          <Heart className="w-3.5 h-3.5 text-gray-600" />
        </button>
      </div>

      {/* بخش اطلاعات */}
      <div className="flex flex-col flex-1 py-1 min-w-0"> {/* min-w-0 از بیرون زدن متن جلوگیری میکنه */}
        <div className="flex flex-col gap-2">
          
          {/* ردیف ۱: ستاره‌ها و نام هتل */}
          <div>
            <StarRating rating={hotel.stars} className="flex items-center pb-1 gap-0.5" />
            <h3 className={`font-bold text-gray-900 line-clamp-1 ${isHorizontal ? 'text-lg' : 'text-base'}`}>
              {hotel.name}
            </h3>
          </div>

          {/* ردیف ۲: امکانات */}
          <div className="flex flex-wrap gap-1.5">
            {hotel.amenities?.slice(0, 3).map((amenity) => (
              <AmenityTag
                key={amenity.id}
                name={amenity.name}
                className="!text-[10px] !text-emerald-700 !border-emerald-200 !bg-emerald-50 !px-2 !py-1 !shadow-none hover:!bg-emerald-100"
              />
            ))}
          </div>

          {/* ردیف ۳: آدرس */}
          <div className="flex items-center text-xs text-gray-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
            <span className="truncate">{shortAddress}</span>
          </div>
        </div>

        {/* ردیف ۴: قیمت و دکمه */}
        <div className="mt-auto flex flex-row flex-wrap justify-between items-end gap-2 pt-3 border-t border-gray-50">
          {/* قیمت */}
          <div className="flex flex-col items-start shrink-0">
            {hotel.minPrice ? (
              <span className={`font-bold text-blue-700 ${isHorizontal ? 'text-lg' : 'text-base'}`}>
                ${(hotel.minPrice / 100).toLocaleString()}{' '}
                <span className="text-xs font-normal text-gray-500">/ night</span>
              </span>
            ) : (
              <span className="text-xs font-medium text-gray-500">N/A</span>
            )}
          </div>

          {/* دکمه */}
          <Link
            href={finalHref}
            className={`flex justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
               isHorizontal ? 'py-2 px-5 text-sm' : 'py-2 px-4 text-xs'
            }`}
          >
            See availability
          </Link>
        </div>

      </div>
    </div>
  );
}
