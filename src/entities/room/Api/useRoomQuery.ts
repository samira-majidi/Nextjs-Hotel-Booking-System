import { useQuery } from '@tanstack/react-query';

import { fetchRoomsByHotelId } from './fetchRoomsByHotel';

export function useHotelRooms(hotelId: string | number) {
  return useQuery({
    // 🔥 چقدر تمیزتر شد! فقط همون هتل کش میشه
    queryKey: ['hotel-rooms', hotelId],
    queryFn: () => fetchRoomsByHotelId(hotelId),
  });
}
