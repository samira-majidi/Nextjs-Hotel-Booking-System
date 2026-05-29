'use client'; // قدم اول: تبدیل به کامپوننت کلاینت

import { useRef } from 'react'; // قدم دوم: ایمپورت کردن useRef

import HotelCard from '@/features/hotels/components/HotelCard';

const topBookedHotels = [
  {
    id: 1,
    name: 'Espinas Palace Hotel',
    location: 'Tehran',
    rating: 4.6,
    reviews: 248,
    price: 120,
    imageUrl: 'https://s3.ir-thr-at1.arvanstorage.ir/hotel-reservation-images/pexels-slrajeti-36970800-1779550390404-9ddefbde-2162-4d8e-8c62-73962ac81469.jpg',
  },
  {
    id: 2,
    name: 'Darvishi Royal Hotel',
    location: 'Mashhad',
    rating: 4.7,
    reviews: 982,
    price: 88,
    imageUrl: 'https://s3.ir-thr-at1.arvanstorage.ir/hotel-reservation-images/pexels-zachtheshoota-1838640-1779550041441-16f8cbb4-56b7-450d-9f3e-b6eb66f1aac2.jpg',
  },
  {
    id: 3,
    name: 'Zandiyeh Hotel',
    location: 'Shiraz',
    rating: 4.5,
    reviews: 756,
    price: 85,
    imageUrl: 'https://s3.ir-thr-at1.arvanstorage.ir/hotel-reservation-images/pexels-pavel-danilyuk-9119736-1779556060670-828c6a7e-df4a-4452-90ba-27f1a331bca0.jpg',
  },
  {
    id: 4,
    name: 'Abbasi Hotel',
    location: 'Isfahan',
    rating: 4.7,
    reviews: 502,
    price: 110,
    imageUrl: 'https://s3.ir-thr-at1.arvanstorage.ir/hotel-reservation-images/pexels-mographe-15531226-1779555119908-b56f9b3b-fb8d-4282-9cd9-91bf30e8afab.jpg',
  },
];

export default function MostBookedHotels() {
  // یک ref برای دسترسی به div اسکرول‌شونده می‌سازیم
  const scrollRef = useRef<HTMLDivElement>(null);

  // تابعی که اسکرول رو انجام میده
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // مقدار اسکرول (مثلاً 300 پیکسل)
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Most Booked
          </h2>
          <div className="flex items-center gap-2">
            {/* دکمه‌های اسکرول برای موبایل */}
            <button onClick={() => scroll('left')} className="rounded-full  text-xl p-3 font-semibold text-blue-600 hover:bg-gray-100">&lt;</button>
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
              {/* دکمه‌های اسکرول برای دسکتاپ */}
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"> &lt; </button>
                <button onClick={() => scroll('right')} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"> &gt; </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef} // قدم سوم: ref رو به کانتینر متصل می‌کنیم
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:w-3/4 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {topBookedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="w-[calc(50%-8px)] flex-none snap-start md:w-[calc(50%-12px)] xl:w-[280px]"
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