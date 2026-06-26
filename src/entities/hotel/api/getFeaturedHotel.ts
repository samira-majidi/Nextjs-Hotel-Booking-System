import { API_URL } from '@/shared/config/env';

import { Hotel } from "../model/types";

export async function fetchFeaturedHotels(): Promise<Hotel[]> {
  const targetUrl = `${API_URL}/hotels/random/featured`;

  const res = await fetch(targetUrl, {
    // کش کردن دیتا برای ۳ روز ($259200$ ثانیه) + تگ برای Revalidation دستی 🚀
    next: { tags: ['featured-hotels'], revalidate: 259200 },
  });

  if (!res.ok) {
    const errorData = await res.text();
    // eslint-disable-next-line no-console
    console.error(`❌ Backend Error (fetching featured hotels):`, errorData);
    throw new Error(`Failed to fetch featured hotels. Backend says: ${errorData}`);
  }

  const json = await res.json();
  
  // فقط آرایه هتل‌ها رو برمی‌گردونیم
  return json.data; 
}
