export interface BookingTokenData {
hotelId:string|number;
  roomId: string;
  checkIn: string;
  checkOut: string;
}

// تابعی که قبلاً نوشتیم
export const encodeBookingData = (data: BookingTokenData): string => {
  const jsonString = JSON.stringify(data);
  return btoa(encodeURIComponent(jsonString));
};

// نسخه خیلی مقاوم decode
export const decodeBookingData = (token: string): BookingTokenData | null => {
  try {
    if (!token) return null;

    // پاک کردن کامل garbage (مهم‌ترین قسمت)
    let cleanToken = token
      .split('?')[0]           // حذف ?cityId=...
      .split('&')[0]           // حذف هر پارامتر اضافی
      .trim();

   

    // اگر هنوز encodeURIComponent شده بود
    if (cleanToken.includes('%')) {
      cleanToken = decodeURIComponent(cleanToken);
    }

    // base64 decode
    const jsonString = decodeURIComponent(atob(cleanToken));
    const data = JSON.parse(jsonString);

    // eslint-disable-next-line no-console
    console.log("✅ Successfully decoded:", data);
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ Invalid booking token after cleaning:", error);
    return null;
  }
};