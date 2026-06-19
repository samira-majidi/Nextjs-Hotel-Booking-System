'use client';

import { differenceInDays, parseISO } from 'date-fns'; // 👈 اضافه شد برای محاسبه روزها
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGetRoom } from '@/entities/room/Api/useGetRoom'; // 👈 اضافه شد برای گرفتن دیتای واقعی
import { useBookingStore } from '@/store/useBookingStore';

export default function BookingSuccessPage() {
  const router = useRouter();
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const {
    hotelId,       // 👈 این دو تا رو از استور می‌گیریم تا به API پاس بدیم
    roomId,        // 👈 
    reservationId,
    hotelName: storeHotelName,
    roomName: storeRoomName,
    roomNumber,
    checkIn,
    checkOut,
    totalPrice: storeTotalPrice,
    clearBookingDetails
  } = useBookingStore();

  // 🌟 دقیقا مثل BookingSummary: گرفتن اطلاعات از API
  const { data } = useGetRoom(hotelId, roomId);
  const roomDetails = data?.room;
  const apiHotelName = data?.hotelName;

  // 🌟 محاسبه دقیق قیمت‌ها بر اساس تاریخ‌ها (مثل BookingSummary)
  const nights = (checkIn && checkOut) 
    ? differenceInDays(parseISO(checkOut), parseISO(checkIn)) 
    : 0;

  const safeBasePrice = Number(roomDetails?.basePrice) || 0;
  const safeNights = Number(nights) || 0;
  const roomRate = safeBasePrice * safeNights;
  const resortFee = 80;
  const taxesAndFees = roomRate * 0.1; 
  // اگر دیتای API لود شده بود، قیمت جدید رو حساب کن
  const apiTotalAmount = (roomRate > 0) ? (roomRate + resortFee + taxesAndFees) : null;

  // 🌟 اولویت‌بندی دیتا: اول API، بعد استور، در نهایت مقدار پیش‌فرض (Fallback)
  const finalHotelName = apiHotelName || storeHotelName || 'Abbasi Hotel Isfahan';
  const finalRoomName = roomDetails?.type || storeRoomName || 'Royal Suite';
  const finalTotalPrice = apiTotalAmount || storeTotalPrice || 320.00;

  const handleGoHome = () => {
    clearBookingDetails();
    router.push('/');
  };

  const handleViewBookings = () => {
    router.push('/my-bookings'); 
  };

  if (!isMounted) {
    return null;
  }

  if (!reservationId) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#f4f5f7] text-gray-800 p-4">
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 text-center max-w-sm w-full">
          <h1 className="text-xl font-bold mb-2 text-red-500">No Active Booking</h1>
          <p className="text-gray-500 text-sm mb-5">We could not find any recent booking details.</p>
          <button 
            onClick={() => router.push('/')} 
            className="w-full py-2.5 bg-[#1d4ed8] text-white font-medium rounded-xl hover:bg-blue-800 transition-colors"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  const formatMainDate = (dateString?: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDay = (dateString?: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f5f8] p-4 font-sans">
      <div className="bg-white p-6 sm:px-8 sm:py-7 rounded-[28px] shadow-[0_10px_40px_rgb(0,0,0,0.03)] max-w-[480px] w-full relative">
        
        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center mb-3 border-[3px] border-green-500 shadow-sm">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Booking Confirmed</h1>
          <p className="text-[13px] text-gray-500 leading-snug px-2">
            Your reservation has been successfully confirmed.
          </p>
        </div>

        <div className="border border-gray-100 rounded-[20px] mb-5 p-1.5 shadow-sm">
          <div className="divide-y divide-gray-100">
            
            {/* Reservation ID */}
            <div className="flex items-center py-2 px-3">
              <div className="bg-blue-50/50 p-1.5 rounded-lg mr-3 text-[#1d4ed8]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 leading-none mb-1">Reservation ID</p>
                <p className="text-[13px] font-bold text-[#1d4ed8] leading-none">#{reservationId}</p>
              </div>
            </div>

            {/* Hotel Info */}
            <div className="flex items-center py-2 px-3">
              <div className="bg-blue-50/50 p-1.5 rounded-lg mr-3 text-[#1d4ed8]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 leading-none mb-1">Hotel Info</p>
                <p className="text-[13px] font-bold text-gray-900 leading-none">{finalHotelName}</p>
              </div>
            </div>

            {/* Room Details */}
            <div className="flex items-center py-2 px-3">
              <div className="bg-blue-50/50 p-1.5 rounded-lg mr-3 text-[#1d4ed8]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 leading-none mb-1">Room Details</p>
                <div className="flex items-center gap-1">
                  <p className="text-[13px] font-bold text-gray-900 leading-none">{finalRoomName}</p>
                  <span className="text-[11px] text-gray-400">|</span>
                  <p className="text-[12px] text-gray-500 leading-none">Room {roomNumber || 'A-402'}</p>
                </div>
              </div>
            </div>

            {/* Check-in & Check-out */}
            <div className="flex items-center py-2.5 px-3">
              <div className="bg-blue-50/50 p-1.5 rounded-lg mr-3 text-[#1d4ed8]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5 leading-none">Check-in</p>
                  <p className="text-[13px] font-bold text-gray-900 leading-none mb-0.5">{formatMainDate(checkIn)}</p>
                  <p className="text-[11px] text-gray-400 leading-none">{formatDay(checkIn)}</p>
                </div>
                <div className="text-gray-300 px-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
                <div className="text-left w-[90px]">
                  <p className="text-[11px] text-gray-500 mb-0.5 leading-none">Check-out</p>
                  <p className="text-[13px] font-bold text-gray-900 leading-none mb-0.5">{formatMainDate(checkOut)}</p>
                  <p className="text-[11px] text-gray-400 leading-none">{formatDay(checkOut)}</p>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[#eff4ff] rounded-[14px] py-2.5 px-4 mt-1.5 flex justify-between items-center">
            <span className="text-[13px] font-bold text-[#1d4ed8]">Total Price</span>
            <span className="text-[16px] font-bold text-[#1d4ed8]">
              €{finalTotalPrice ? Number(finalTotalPrice).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '320.00'}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleViewBookings}
            className="flex-1 py-2.5 bg-[#1a4bcf] text-white text-[13px] font-semibold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            My Bookings
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex-1 py-2.5 bg-white border border-[#1a4bcf]/20 text-[#1a4bcf] text-[13px] font-semibold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}
