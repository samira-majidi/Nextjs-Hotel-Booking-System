import { useQuery } from '@tanstack/react-query';

import { fetchRoomsByHotelId } from './fetchRoomsByHotel';

export const useGetRoom = (hotelId: string | null, roomId: string | null) => {
  return useQuery({
    queryKey: ['hotel-rooms', hotelId], 
    queryFn: () => fetchRoomsByHotelId(hotelId!),
    
    select: (response) => {
      // ۱. پیدا کردن اتاق مورد نظر
      const targetRoom = response.data.data.find((room) => room.id === roomId);
      
      // ۲. گرفتن اسم هتل از آبجکت hotel (نه hotelId)
      // اگر TypeScript اینجا خطا میده، یعنی توی تایپ Room فیلد hotel رو تعریف نکردی
      const hotelName = targetRoom?.hotel?.name || 'هتل نامشخص';
      
      return {
        room: targetRoom,
        hotelName: hotelName,
      };
    },
    
    enabled: !!hotelId && !!roomId,
  });
};
