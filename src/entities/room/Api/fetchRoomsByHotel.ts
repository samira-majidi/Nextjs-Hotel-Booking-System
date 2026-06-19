
import { PaginatedRoomsResponse } from '@/entities/room/model/types';
import { API_URL } from '@/shared/config/env';

export async function fetchRoomsByHotelId(
  hotelId: string | number,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedRoomsResponse> {
  // ساختن تمیزِ کوئری پارامترها برای URL
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  // فرض می‌کنیم روت کنترلر اصلی در بک‌اند 'rooms' باشه 
  // (طبق کد NestJS شما: /rooms/hotel/:hotelId)
  const targetUrl = `${API_URL}/rooms/hotel/${hotelId}?${queryParams.toString()}`;

  const res = await fetch(targetUrl, {
    cache: 'no-store', // چون ممکنه وضعیت اتاق‌ها (پر/خالی) مدام عوض بشه
  });

  if (!res.ok) {
    const errorData = await res.text();
    // eslint-disable-next-line no-console
    console.error(`❌ Backend Error (fetching rooms for hotel ${hotelId}):`, errorData);
    throw new Error(`Failed to fetch rooms. Backend says: ${errorData}`);
  }
  return res.json();
}