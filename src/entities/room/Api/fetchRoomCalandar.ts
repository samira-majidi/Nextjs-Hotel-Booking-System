import { API_URL } from '@/shared/config/env';

export interface RoomCalendarDay {
  date: string;
  price: string; 
  basePrice?: number; 
}

export interface BookingPriceCalculation {
  dailyPrices: RoomCalendarDay[];
  totalPrice: number;
}

/**
 * ۱. تابع دریافت قیمت‌های تقویم (برای نمایش در UI تقویم)
 * معمولاً تاریخ اول تا آخر یک ماه پاس داده می‌شود.
 */
export async function fetchMonthCalendarPrices(
  roomId: string | number,
  startDate: string,
  endDate: string
): Promise<RoomCalendarDay[]> {
  const queryParams = new URLSearchParams({ startDate, endDate });
  const targetUrl = `${API_URL}/rooms/${roomId}/calendar?${queryParams.toString()}`;

  const res = await fetch(targetUrl, { cache: 'no-store' });

  if (!res.ok) {
    const errorData = await res.text();
    // eslint-disable-next-line no-console
    console.error(`❌ Backend Error (fetching month calendar for room ${roomId}):`, errorData);
    throw new Error(`Failed to fetch month calendar: ${errorData}`);
  }
  const rawData = await res.json();
  
  return rawData.data || []; 
}

/**
 * ۲. تابع محاسبه قیمت رزرو (برای روزهای انتخاب شده توسط کاربر)
 * تاریخ ورود و خروج پاس داده می‌شود و علاوه بر لیست، جمع کل را هم برمی‌گرداند.
 */
export async function calculateBookingPrice(
  roomId: string | number,
  checkInDate: string,
  checkOutDate: string
): Promise<BookingPriceCalculation> {
  const queryParams = new URLSearchParams({ 
    startDate: checkInDate, 
    endDate: checkOutDate 
  });
  
  const targetUrl = `${API_URL}/rooms/${roomId}/calendar?${queryParams.toString()}`;

  const res = await fetch(targetUrl, { cache: 'no-store' });

  if (!res.ok) {
    const errorData = await res.text();
    // eslint-disable-next-line no-console
    console.error(`❌ Backend Error (calculating price for room ${roomId}):`, errorData);
    throw new Error(`Failed to calculate booking price: ${errorData}`);
  }
  
  // اینجا دیگه API مستقیم آرایه رو برنمی‌گردونه، باید data رو برداریم
  const rawData = await res.json();
  const dailyPrices: RoomCalendarDay[] = rawData.data || [];
  
  // 👇 اینجا هم باید اصلاح بشه تا با price کار کنه و به عدد تبدیلش کنه
  const totalPrice = dailyPrices.reduce((sum, day) => sum + Number(day.price), 0);

  return {
    dailyPrices,
    totalPrice
  };
}
