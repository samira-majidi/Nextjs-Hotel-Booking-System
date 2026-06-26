'use client';

import { differenceInDays, parseISO } from 'date-fns';
import { Briefcase, Calendar, MapPin, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import { useGetRoom } from '@/entities/room/Api/useGetRoom';
import { useBookingStore } from '@/store/useBookingStore';

const BreakdownRow = ({ icon: Icon, label, value, isDiscount = false }: { icon: React.ElementType, label: string, value: string | number, isDiscount?: boolean }) => (
  <div className="flex justify-between items-center mb-4 last:mb-0">
    <div className="flex items-center gap-3 text-gray-600">
      <Icon className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
      {/* سایز رسپانسیو شد */}
      <span className="text-sm sm:text-[15px] font-medium">{label}</span>
    </div>
    {/* سایز رسپانسیو شد */}
    <span className={`text-sm sm:text-[15px] font-semibold ${isDiscount ? 'text-emerald-700' : 'text-gray-900'}`}>
      {value}
    </span>
  </div>
);

const BookingSummary = () => {
  const { hotelId, roomId, checkIn, checkOut } = useBookingStore();
  const { data, isLoading, isError } = useGetRoom(hotelId, roomId);
  
  // هوک فعال شد (پیش‌فرض بسته تو موبایل، اما تو دسکتاپ با CSS همیشه بازه)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); 

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse text-sm sm:text-base text-gray-600 font-medium bg-white/70 backdrop-blur-lg rounded-[2rem]">Loading room details... ⏳</div>;
  }

  if (isError || !data?.room) {
    return <div className="p-8 text-sm sm:text-base text-red-500 font-medium bg-white/70 backdrop-blur-lg rounded-[2rem]">Error loading room details! Please try again.</div>;
  }

  const roomDetails = data.room;
  const hotelName = data.hotelName; 

  const nights = (checkIn && checkOut) 
    ? differenceInDays(parseISO(checkOut), parseISO(checkIn)) 
    : 0;

  const safeBasePrice = Number(roomDetails.basePrice) || 0;
  const safeNights = Number(nights) || 0;
  
  const roomTotal = safeBasePrice * safeNights;
  const taxes = 180.00;

  const totalAmount = roomTotal;

  const formatCurrency = (amount: number) => 
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 w-full h-full my-auto">
      
      {/* ===== هدر (حالا تو موبایل قابل کلیکه تا باز و بسته بشه) ===== */}
      <div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4 cursor-pointer sm:cursor-default"
        onClick={() => setIsDetailsVisible(!isDetailsVisible)}
      >
        <div>
          {/* سایز رسپانسیو شد */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Booking Summary</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Review your stay and payment details</p>
        </div>

        <div className="bg-emerald-50/80 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-emerald-100/50 self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {safeNights} Nights
        </div>
      </div>

      {/* ===== بدنه (تو دسکتاپ همیشه بلاک، تو موبایل وابسته به استیت) ===== */}
      <div className={`${isDetailsVisible ? 'block' : 'hidden'} sm:block`}>
        {/* ===== اطلاعات هتل و اتاق ===== */}
        <div className="flex flex-col xl:flex-row gap-6 mb-8">
          <div className="relative w-full xl:w-[280px] h-[180px] rounded-2xl overflow-hidden shrink-0 shadow-sm">
            <Image 
              src={roomDetails.galleryImages?.[0]?.path || '/images/default-room.jpg'} 
              alt={roomDetails.type || 'Room Image'}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center flex-1">
            {/* سایز رسپانسیو شد */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">
              {hotelName || 'Oceanview Luxury Resort'}
            </h3>
            
            <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              <span>Maldives</span>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-semibold text-xs sm:text-sm">
                    {checkIn || 'May 24, 2025'} – {checkOut || 'May 26, 2025'}
                  </p>
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5 font-medium">
                    Check-in 3:00 PM • Check-out 11:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-900 font-semibold text-xs sm:text-sm">1 Room, 2 Adults</p>
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5 font-medium">
                    {roomDetails.type || 'Deluxe Ocean View Room'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100 mb-8" />

        {/* ===== لیست هزینه‌ها ===== */}
        <div className="mb-8">
          <BreakdownRow 
            icon={Calendar} 
            label={`Room Rate (${safeNights} Nights)`} 
            value={formatCurrency(roomTotal)} 
          />
          <BreakdownRow 
            icon={Briefcase} 
            label="Taxes & Fees" 
            value={formatCurrency(taxes)} 
          />
        </div>

        {/* ===== باکس مبلغ کل ===== */}
        <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl flex justify-between items-center">
          <span className="font-bold text-gray-900 text-base sm:text-lg">Total Amount</span>
          <span className="font-extrabold text-lg sm:text-xl text-gray-900">
            USD {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default BookingSummary;
