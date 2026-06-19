import { useQuery } from '@tanstack/react-query';

import { hotelKeys } from '../model/hotel.key';
import { Hotel } from '../model/types'; 
import { fetchHotelById } from './getHotelById';
import { fetchHotels } from './getHotels';

// تایپ پارامترهای فیلتر (شهر، تعداد نفرات و ...)
type UseHotelsParams = Record<string, string | string[] | undefined>;

export function useHotels(params: UseHotelsParams) {
  return useQuery({
    queryKey: hotelKeys.list(params), 
    
   
    queryFn: async (): Promise<Hotel[]> => {
      const data = await fetchHotels(params);
      
      return data as Hotel[]; 
    },

    staleTime: 5 * 60 * 1000, 
    retry: 2, 
    refetchOnWindowFocus: false, 
  });
}


export function useHotel(id: string | number) {
  return useQuery({

    queryKey: hotelKeys.detail(id), 

    queryFn: () => fetchHotelById(id),
    enabled: !!id, 
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
}
