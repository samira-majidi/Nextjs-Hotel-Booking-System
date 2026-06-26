import { useQuery } from '@tanstack/react-query';

import { BookingPriceCalculation, calculateBookingPrice,fetchMonthCalendarPrices, RoomCalendarDay } from '@/entities/room/Api/fetchRoomCalandar';


// کلیدهای استاندارد برای مدیریت کش
export const pricingQueryKeys = {
  all: ['pricing'] as const,
  calendar: (roomId: string | number, start: string, end: string) => 
    [...pricingQueryKeys.all, 'calendar', roomId, start, end] as const,
  booking: (roomId: string | number, checkIn: string | null, checkOut: string | null) => 
    [...pricingQueryKeys.all, 'booking', roomId, checkIn, checkOut] as const,
};

/**
 * هوک دریافت قیمت‌های تقویم یک ماه
 */
export const useMonthCalendarPrices = (
  roomId: string | number,
  startDate: string,
  endDate: string
) => {
  return useQuery<RoomCalendarDay[], Error>({
    queryKey: pricingQueryKeys.calendar(roomId, startDate, endDate),
    queryFn: () => fetchMonthCalendarPrices(roomId, startDate, endDate),
    // فقط در صورتی ریکوئست زده میشه که هر ۳ پارامتر وجود داشته باشن
    enabled: !!roomId && !!startDate && !!endDate,
    // قیمت‌ها معمولاً خیلی سریع عوض نمیشن، مثلا ۵ دقیقه کش رو تازه نگه می‌داریم
    staleTime: 5 * 60 * 1000, 
  });
};

/**
 * هوک محاسبه قیمت رزرو (روزهای انتخابی)
 */
export const useBookingPrice = (
  roomId: string | number,
  checkInDate: string | null,
  checkOutDate: string | null
) => {
  return useQuery<BookingPriceCalculation, Error>({
    queryKey: pricingQueryKeys.booking(roomId, checkInDate, checkOutDate),
    queryFn: () => {
      // چون enabled چک می‌کنه که null نباشن، اینجا با خیال راحت ! می‌ذاریم
      return calculateBookingPrice(roomId, checkInDate!, checkOutDate!);
    },
    // این ریکوئست فقط زمانی اجرا میشه که کاربر تاریخ ورود و خروج رو کامل انتخاب کرده باشه
    enabled: !!roomId && !!checkInDate && !!checkOutDate,
    // برای محاسبه قیمت نهایی رزرو، بهتره دیتا همیشه بروز باشه (بدون staleTime یا مقدار خیلی کم)
    staleTime: 0,
  });
};
