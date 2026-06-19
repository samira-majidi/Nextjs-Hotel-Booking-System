import React from 'react';

interface HotelAboutProps {
  description: string;
  address?: string; // ✅ پراپ آدرس اضافه شد
}

export function HotelAbout({ description, address }: HotelAboutProps) {
  // اگر نه توضیحات بود نه آدرس، کلا کامپوننت رندر نشه
  if (!description && !address) return null;

  return (
    <section id="about" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">About the Hotel</h2>
      
      {/* بخش توضیحات + متن فیک برای پرتر شدن */}
      <div className="text-gray-700 leading-relaxed space-y-4 mb-6">
        {/* متن اصلی دیتابیس (اگر وجود داشت) */}
        {description && (
          <p>{description}</p>
        )}
        
        {/* متن فیک ثابت برای زیباتر شدن ظاهر صفحه */}
        <p className="text-gray-500">
          Experience world-class service and unparalleled comfort. Our property offers a unique blend of modern amenities and classic elegance, ensuring a memorable stay for both leisure and business travelers. Enjoy our carefully curated facilities, friendly staff, and a welcoming atmosphere designed to make you feel right at home.
        </p>
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
