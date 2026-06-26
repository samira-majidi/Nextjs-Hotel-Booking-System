'use client';

import { CheckCircle, ChevronDown, ChevronUp, Hash, Users } from 'lucide-react';
import Image from 'next/image';
import { useMemo,useState } from 'react';

import { Reservation } from '../model/type';

export default function ReservationCard({ reservation }: { reservation: Reservation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalPrice = reservation.totalPrice || 0;
  const guestsCount = reservation.numberOfGuests || 1;
  const imageSrc = reservation.room?.galleryImages?.[0]?.path || '/default-room.jpg';
  const hotelName = reservation.room?.hotel?.name || 'نام هتل';

  // 💡 بهینه‌سازی: جلوگیری از محاسبه مجدد تاریخ‌ها در هر بار رندر (مثلاً موقع باز و بسته کردن جزئیات)
  const formattedCheckIn = useMemo(() => {
    return new Date(reservation.checkInDate).toLocaleDateString();
  }, [reservation.checkInDate]);

  const formattedCheckOut = useMemo(() => {
    return new Date(reservation.checkOutDate).toLocaleDateString();
  }, [reservation.checkOutDate]);

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row transition-all duration-300 hover:shadow-md">
      
      {/* عکس هتل */}
      <div className="relative w-full sm:w-64 h-48 sm:h-auto shrink-0 bg-gray-50">
       <Image
          src={imageSrc} 
          alt={hotelName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 256px"
          // 💡 بهینه‌سازی: اگر عکس‌ها از CDN یا آروان‌کلاد میان و خودشون بهینه هستن، 
          // این رو true کن تا Next.js الکی منابع سرور رو درگیر بهینه‌سازی مجدد نکنه
          unoptimized={true} 
          loading="lazy"
        />
        {reservation.status === 'CONFIRMED' && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-[#00A651] shadow-sm">
            <CheckCircle className="w-4 h-4" />
            Confirmed
          </div>
        )}
      </div>

      {/* اطلاعات رزرو */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {hotelName}
            </h2>
            <span className="text-lg font-bold text-[#00A651]">
              ${totalPrice}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                Check-in
              </p>
              <p className="font-semibold text-gray-800">
                {formattedCheckIn}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                Check-out
              </p>
              <p className="font-semibold text-gray-800">
                {formattedCheckOut}
              </p>
            </div>
          </div>
        </div>

        {/* بخش جزئیات بیشتر */}
        {isExpanded && (
          <div className="border-t border-gray-100 pt-4 mb-4 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Hash className="w-3 h-3" /> Booking ID
              </span>
              <span className="text-sm font-medium text-gray-700">{reservation.id}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Users className="w-3 h-3" /> Guests
              </span>
              <span className="text-sm font-medium text-gray-700">{guestsCount} Person(s)</span>
            </div>
          </div>
        )}

        {/* دکمه عملیات */}
        <div className="flex justify-end pt-4 border-t border-gray-100 mt-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none"
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
