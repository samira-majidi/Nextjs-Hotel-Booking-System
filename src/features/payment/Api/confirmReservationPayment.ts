import type { Reservation } from '@/entities/reservation/model/type';
import type { ApiResponse } from '@/entities/reservation/model/type';
import { API_URL } from '@/shared/config/env';

// تایپ خروجی حالا دقیقاً همون چیزیه که بک‌اند برمی‌گردونه:
// یک ApiResponse که داخل فیلد data اون، آبجکت Reservation قرار داره.
export async function confirmReservationPayment(id: string | number): Promise<ApiResponse<Reservation>> {
  const targetUrl = `${API_URL}/reservations/${id}/confirm-payment`;

  const res = await fetch(targetUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.text();
    // eslint-disable-next-line no-console
    console.error(`❌ Backend Error (confirming payment for reservation ${id}):`, errorData);
    throw new Error(`Failed to confirm payment. Backend says: ${errorData}`);
  }

  return res.json();
}
