// مسیر فایل مثلا: src/api/reservations.ts
import { ApiResponse, Reservation } from '@/entities/reservation/model/type'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * درخواست دریافت لیست رزروهای کاربر لاگین‌شده با کش Next.js
 */
export const getUserReservationsApi = async (token?: string): Promise<ApiResponse<Reservation[]>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // استفاده از fetch به جای axios برای فعال شدن کش Next.js
  const response = await fetch(`${API_BASE_URL}/reservations/my-reservations`, {
    headers,
    // تنظیمات کش:
    cache: 'force-cache', 
    next: { 
      tags: ['my-reservations'], 
    }
  });

  if (!response.ok) {
    // مدیریت خطا مشابه axios
    throw new Error('Failed to fetch reservations data');
  }

  return response.json(); 
};
