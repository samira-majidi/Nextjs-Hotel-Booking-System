'use client';

import { useQueryClient } from '@tanstack/react-query';
import { differenceInDays, format, parse } from 'date-fns';
import { X } from 'lucide-react'; // 👈 آیکون ضربدر رو اضافه کردیم
import React, { useState } from 'react';

import { RoomDto } from '@/entities/room/model/types';
import { encodeBookingData } from '@/shared/lib/bookingToken';
import { useSmartRouter } from '@/shared/utils/useSmartRoter';
import { useBookingStore } from '@/store/useBookingStore';

import { RoomDatePickerModal } from './RoomDatePickerModal';

export interface BookRoomButtonProps {
  hotelId: string | number;
  roomId: string;
  isAvailable: boolean;
  basePrice: string | number;
  roomData?: RoomDto; 
  onSelectDates?: (roomId: string) => void;
  className?: string;
}

export const BookRoomButton: React.FC<BookRoomButtonProps> = ({
  hotelId,
  roomId,
  isAvailable,
  basePrice,
  roomData,
  className = '',
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const { pushWithParams } = useSmartRouter();
  const numericPrice = Number(basePrice) || 0;

  // استخراج مقادیر از استور
  const storedHotelId = useBookingStore((state) => state.hotelId);
  const storedRoomId = useBookingStore((state) => state.roomId);
  const storedCheckIn = useBookingStore((state) => state.checkIn);
  const storedCheckOut = useBookingStore((state) => state.checkOut);
  const _hasHydrated = useBookingStore((state) => state._hasHydrated);
  
  const setBookingDetails = useBookingStore((state) => state.setBookingDetails);
  const clearBookingDetails = useBookingStore((state) => state.clearBookingDetails);

  const isCurrentRoomSelected = 
    _hasHydrated && 
    String(storedHotelId) === String(hotelId) && 
    String(storedRoomId) === String(roomId);

  const checkInDate = isCurrentRoomSelected && storedCheckIn
      ? parse(storedCheckIn, 'yyyy-MM-dd', new Date())
      : null;
      
  const checkOutDate = isCurrentRoomSelected && storedCheckOut
      ? parse(storedCheckOut, 'yyyy-MM-dd', new Date())
      : null;

  const handleApplyDates = (newCheckIn: Date, newCheckOut: Date) => {
    setIsCalendarOpen(false);
    
    // 💡 رفع مشکل صفر شدن قیمت در پرداخت:
    // محاسبه شب‌ها و قیمت کل همینجا انجام میشه و به استور پاس داده میشه
    const calculatedNights = differenceInDays(newCheckOut, newCheckIn);
    const calculatedTotalPrice = calculatedNights * numericPrice;

    setBookingDetails({
      hotelId: String(hotelId),
      roomId,
      checkIn: format(newCheckIn, 'yyyy-MM-dd'),
      checkOut: format(newCheckOut, 'yyyy-MM-dd'),
      totalPrice: calculatedTotalPrice, // 👈 قیمت نهایی تو استور ذخیره میشه!
    });
  };

  const handleCancelReservation = () => {
    clearBookingDetails(); 
    queryClient.removeQueries({ queryKey: ['room', roomId] });
  };

  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const totalPrice = nights * numericPrice;

  const handleBookRoom = () => {
    if (!checkInDate || !checkOutDate) return;

    if (roomData) {
      queryClient.setQueryData(['room', roomId], roomData);
    }

    const formattedCheckIn = format(checkInDate, 'yyyy-MM-dd');
    const formattedCheckOut = format(checkOutDate, 'yyyy-MM-dd');

    const token = encodeBookingData({
      hotelId: hotelId,
      roomId: roomId,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
    });

    pushWithParams(`/reservation-form?token=${token}`, undefined, { scroll: true });
  };

  if (!isAvailable) {
    return (
      <div className={`flex justify-center items-center bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold py-2.5 px-6 rounded-lg whitespace-nowrap w-full sm:w-auto shrink-0 ${className}`}>
        Fully Booked
      </div>
    );
  }

  if (checkInDate && checkOutDate) {
    return (
      <div className={`flex flex-col items-center sm:items-end gap-3 ${className}`}>
        <span className="text-sm font-medium text-gray-600">
          Total for {nights} nights:{' '}
          <strong className="text-gray-900">€{totalPrice.toLocaleString()}</strong>
        </span>
        
        <div className="flex w-full sm:w-auto gap-2">
          {/* ✨ دکمه کنسل/پاک‌کردن تاریخ‌ها (جمع و جور و استاندارد) */}
          <button
            onClick={handleCancelReservation}
            title="Clear selected dates"
            className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 rounded-lg transition-colors duration-200 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>

         <button
  onClick={handleBookRoom}
  className="flex flex-1 sm:flex-none justify-center bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 text-sm font-semibold py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap"
>
  Book Room
</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsCalendarOpen(true)}
        className="flex justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap w-full sm:w-auto shrink-0"
      >
        Select Dates
      </button>

      {isCalendarOpen && (
        <RoomDatePickerModal  roomId={roomId} onClose={() => setIsCalendarOpen(false)} onApply={handleApplyDates} />
      )}
    </div>
  );
};
