import { SingleHotelResponse } from '@/entities/hotel/model/types/singleHotelRespose';
import { API_URL } from '@/shared/config/env';

// تایپ دقیق خروجی بک‌اند رو اینجا تعریف می‌کنیم

export async function fetchHotelById(id: string | number): Promise<SingleHotelResponse> {
  const targetUrl = `${API_URL}/hotels/${id}`;

  const res = await fetch(targetUrl, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.text();
    // eslint-disable-next-line no-console
    console.error(`❌ Backend Error (fetching hotel $${id}$):`, errorData);
    throw new Error(`Failed to fetch hotel details. Backend says: ${errorData}`);
  }

  return res.json();
}
