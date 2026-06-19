"use client";

import React from 'react';

import { RoomDto } from '@/entities/room/model/types';
import { RoomCard } from '@/entities/room/ui/RoomCard';
import { BookRoomButton } from '@/features/book-room/ui/bookRoombutton';

interface HotelRoomsListProps {
  rooms: RoomDto[];
}

export const HotelRoomsList: React.FC<HotelRoomsListProps> = ({ rooms }) => {
  const handleDateSelection = (roomId: string) => {
    // eslint-disable-next-line no-console
    console.log(`Open calendar for room: ${roomId}`);
  };

  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-gray-400 text-center py-10">
        No rooms available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          {...room}
          actionSlot={
            <BookRoomButton 
              hotelId={room.hotelId}
              roomId={room.id} 
              isAvailable={room.status === 'AVAILABLE'} 
              basePrice={room.basePrice} 
              roomData={room} // 👈 این خط اضافه شد تا کل دیتا بره تو دکمه
              onSelectDates={handleDateSelection}
            />
          }
        />
      ))}
    </div>
  );
};
