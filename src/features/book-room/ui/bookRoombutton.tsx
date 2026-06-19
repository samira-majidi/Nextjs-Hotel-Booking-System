'use client';

import { useQueryClient } from '@tanstack/react-query'; // 👈 اضافه شد
import { differenceInDays, format, parse } from 'date-fns';
import React, { useState } from 'react';

import { RoomDto } from '@/entities/room/model/types';
import { encodeBookingData } from '@/shared/lib/bookingToken';
import { useSmartRouter } from '@/shared/utils/useSmartRoter';
import { useBookingStore } from '@/store/useBookingStore';

import { RoomDatePickerModal } from './RoomDatePickerModal';
// اگه تایپ RoomDto رو داری ایمپورت کن، وگرنه any بذار موقتاً

export interface BookRoomButtonProps {
  hotelId: string|number;
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
  roomData, // 👈 اضافه شد
  className = '',
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const queryClient = useQueryClient(); // 👈 اضافه شد
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
    setBookingDetails({
       hotelId: String(hotelId),
      roomId,
      checkIn: format(newCheckIn, 'yyyy-MM-dd'),
      checkOut: format(newCheckOut, 'yyyy-MM-dd'),
    });
  };

  const handleCancelReservation = () => {
    clearBookingDetails(); 
    // 👈 پاک کردن دیتای این اتاق خاص از کش ری‌اکت کوئری
    queryClient.removeQueries({ queryKey: ['room', roomId] });
  };

  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  const totalPrice = nights * numericPrice;

  const handleBookRoom = () => {
    if (!checkInDate || !checkOutDate) return;

    // 👈 جادوی کش کردن! دیتای اتاق رو برای صفحه بعدی آماده می‌ذاریم تو کش
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
          <strong className="text-gray-900">${totalPrice.toLocaleString()}</strong>
        </span>
        
        <div className="flex w-full sm:w-auto gap-2">
          <button
            onClick={handleCancelReservation}
            className="flex flex-1 sm:flex-none justify-center bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors whitespace-nowrap"
          >
            Cancel
          </button>

          <button
            onClick={handleBookRoom}
            className="flex flex-1 sm:flex-none justify-center bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap"
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
        <RoomDatePickerModal onClose={() => setIsCalendarOpen(false)} onApply={handleApplyDates} />
      )}
    </div>
  );
};
