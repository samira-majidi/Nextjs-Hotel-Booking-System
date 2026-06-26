import { API_URL } from '@/shared/config/env';

export const fetchCitiesFromApi = async () => {
  const res = await fetch(`${API_URL}/city`, { 
    // کش ۲۴ ساعته ($86400$ ثانیه) + تگ برای Revalidation دستی 🚀
    next: { tags: ['cities-collection'], revalidate: 86400 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch cities');
  }

  const responseData = await res.json();

  if (!responseData || !Array.isArray(responseData.data)) {
    throw new Error('Invalid data structure received from API');
  }

  return responseData.data;
};
