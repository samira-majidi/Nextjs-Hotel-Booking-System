import axios from 'axios';

import { API_URL } from '@/shared/config/env'; // 👈 اضافه کردن این ایمپورت
// این تایپ دقیقاً معادل CreateReservationDto در NestJS است
export interface CreateReservationPayload {
  roomId: string;
  guestName: string;
  guestPhone?: string; // Optional
  checkInDate: string; // ISO 8601 Date String
  checkOutDate: string; // ISO 8601 Date String
  numberOfGuests: number; // Minimum 1
  specialRequests?: string; // Optional
}


export const createReservationApi = async (payload: CreateReservationPayload, token: string) => {
  // ❌ این خط رو کلا پاک کردیم:
  // const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

  const response = await axios.post(
    `${API_URL}/reservations`, // 👈 حالا مستقیم از متغیر گلوبال می‌خونه
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
};
