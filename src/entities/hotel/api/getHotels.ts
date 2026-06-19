import { API_URL } from '@/shared/config/env';

export async function fetchHotels(params: Record<string, string | string[] | undefined>) {
  // یک کپی از پارامترها می‌گیریم تا بتونیم تغییرش بدیم
  const apiParams = { ...params };


  if (apiParams.adults) {
    apiParams.guests= apiParams.adults; 
    delete apiParams.adults; // حذف adults تا بک‌اند ارور نده
  }

  const queryString = new URLSearchParams();

  // فیلتر کردن مقادیر خالی و اضافه کردن درست آرایه‌ها به URL
  Object.entries(apiParams).forEach(([key, value]) => {
    if (value != null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => queryString.append(key, v));
      } else if (typeof value === 'string' && value.includes(',')) {
        value.split(',').forEach((v) => queryString.append(key, v));
      } else {
        queryString.append(key, String(value));
      }
    }
  });

  const targetUrl = `${API_URL}/hotels/search?${queryString.toString()}`;

  const res = await fetch(targetUrl, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to fetch hotels. Backend says: ${errorData}`);
  }

  return res.json();
}
