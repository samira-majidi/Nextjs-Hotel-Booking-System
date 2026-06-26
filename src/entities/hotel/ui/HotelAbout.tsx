'use client';

import React, { useState } from 'react';

interface HotelAboutProps {
  description: string;
  address?: string; // ✅ پراپ آدرس
}

export function HotelAbout({ description, address }: HotelAboutProps) {
  // استیت برای کنترل باز و بسته بودن متن در موبایل
  const [isExpanded, setIsExpanded] = useState(false);

  // اگر نه توضیحات بود نه آدرس، کلا کامپوننت رندر نشه
  if (!description && !address) return null;

  return (
    <section id="about" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">About the Hotel</h2>
      
      {/* بخش توضیحات */}
      <div className="mb-6">
        {/* کانتینر متن‌ها با قابلیت محدود شدن به ۳ خط در سایزهای کوچکتر از md */}
        <div 
          className={`text-gray-700 leading-relaxed space-y-4 ${
            !isExpanded ? 'line-clamp-3 md:line-clamp-none' : ''
          }`}
        >
          {/* متن اصلی دیتابیس (اگر وجود داشت) */}
          {description && (
            <p>{description}</p>
          )}
          
          {/* متن فیک ثابت برای زیباتر شدن ظاهر صفحه */}
          <p className="text-gray-500">
            Experience world-class service and unparalleled comfort. Our property offers a unique blend of modern amenities and classic elegance, ensuring a memorable stay for both leisure and business travelers. Enjoy our carefully curated facilities, friendly staff, and a welcoming atmosphere designed to make you feel right at home.
          </p>
        </div>

        {/* دکمه "Read more" با رنگ آبی که فقط در موبایل و تبلت دیده می‌شود */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden mt-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors flex items-center gap-1"
        >
          {isExpanded ? 'Show less' : 'Read more'}
          {/* یک فلش کوچیک هم براش گذاشتم که خوشگل‌تر بشه */}
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* بخش آدرس */}
      {address && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-start gap-3">
          {/* آیکون لوکیشن */}
          <svg 
            className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{address}</p>
          </div>
        </div>
      )}
    </section>
  );
}
