'use client'; 

import { useRef } from 'react'; 

import { Hotel } from '@/entities/hotel/model/types'; 
import HotelCard from '@/entities/hotel/ui/HotelCard';

// یه اینترفیس تعریف می‌کنیم که بگیم این کامپوننت قراره لیست هتل‌ها رو بگیره
interface MostBookedHotelsProps {
  hotels: Hotel[];
}
  
export default function MostBookedHotels({ hotels }: MostBookedHotelsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 300;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
if (!Array.isArray(hotels)) {
  // eslint-disable-next-line no-console
  console.error("دیتای هتل‌ها آرایه نیست! مقدار دریافتی اینه:", hotels);
  return <p>در حال حاضر هتلی برای نمایش وجود ندارد.</p>; 
}

  // اگه هتلی نبود چیزی رندر نکنیم
  if (!hotels || hotels.length === 0) return null;

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Most Booked
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="rounded-full text-xl p-3 font-semibold text-blue-600 hover:bg-gray-100">&lt;</button>
            <button onClick={() => scroll('right')} className="rounded-full text-xl p-3 font-semibold text-blue-600 hover:bg-gray-100">&gt;</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          
          {/* Left Column (Desktop only) */}
          <div className="hidden md:block md:w-1/4">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              Most Booked
            </h2>
            <h3 className="mb-4 text-3xl font-bold leading-snug text-gray-900">
              Most Booked Hotels <br /> of the Week
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              Accommodations that have received the most attention and bookings from travelers this week. Don&apos;t miss out!
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"> &lt; </button>
                <button onClick={() => scroll('right')} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"> &gt; </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef} 
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:w-3/4 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {/* رندر کردن هتل‌های واقعی که از سمت سرور اومدن */}
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex-none snap-center w-full max-w-[360px] sm:max-w-none sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)]"
              >
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
