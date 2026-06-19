import { differenceInDays, parseISO } from 'date-fns';
import Image from 'next/image';
import React from 'react';

import { useGetRoom } from '@/entities/room/Api/useGetRoom';
import { useBookingStore } from '@/store/useBookingStore';

const BookingSummary = () => {
  const { hotelId, roomId, checkIn, checkOut } = useBookingStore();
  const { data, isLoading, isError } = useGetRoom(hotelId, roomId);
  
  const roomDetails = data?.room;
  const hotelName = data?.hotelName; 

  if (isLoading) {
    return <div className="p-4 text-center animate-pulse text-gray-600">Loading room details... ⏳</div>;
  }

  if (isError || !roomDetails) {
    return <div className="p-4 text-red-500 text-sm">Error loading room details! Please try again.</div>;
  }

  const nights = (checkIn && checkOut) 
    ? differenceInDays(parseISO(checkOut), parseISO(checkIn)) 
    : 0;

  const safeBasePrice = Number(roomDetails.basePrice) || 0;
  const safeNights = Number(nights) || 0;

  // محاسبه فقط بر اساس قیمت اتاق (بدون مالیات و هزینه‌های اضافه)
  const totalAmount = safeBasePrice * safeNights;

  return (
    <div className="bg-white rounded-[24px] p-4 lg:p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Booking Summary</h2>
      
      <div className="relative w-full h-[130px] rounded-2xl overflow-hidden mb-4">
        <Image 
          src={roomDetails.galleryImages?.[0]?.path || '/images/default-room.jpg'} 
          alt={roomDetails.type || 'Room Image'}
          fill
          className="object-cover"
        />
      </div>

      {/* 🌟 اسم هتل با فونت درشت و جذاب 🌟 */}
      {hotelName && (
        <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-1">
          {hotelName}
        </h2>
      )}

      {/* اسم اتاق (کمی کوچکتر از هتل) */}
      <h3 className="font-semibold text-[16px] text-gray-600 mb-5">
        {roomDetails.type || 'Ocean View Suite'}
      </h3>

      <div className="space-y-2.5 text-[14px] mb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 bg-green-50 p-0.5 rounded-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span>Check-in</span>
          </div>
          <span className="font-semibold text-gray-900">{checkIn}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 bg-green-50 p-0.5 rounded-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span>Check-out</span>
          </div>
          <span className="font-semibold text-gray-900">{checkOut}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 bg-green-50 p-0.5 rounded-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Guests</span>
          </div>
          <span className="font-semibold text-gray-900">2 Adults</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500 bg-green-50 p-0.5 rounded-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42l-8.704-8.704z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
            <span>Nights</span>
          </div>
          <span className="font-semibold text-gray-900">{nights} Nights</span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#f8f7ff] p-3.5 rounded-[16px] mt-1">
        <div className="flex flex-col">
          <p className="font-bold text-[15px] text-gray-900">Total Amount</p>
          <p className="text-[12px] text-gray-500">Total for {nights} nights</p>
        </div>
        {/* 💡 رنگ مبلغ توتال به آبی تغییر یافت */}
        <span className="font-bold text-[20px] text-blue-600">
          ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default BookingSummary;
