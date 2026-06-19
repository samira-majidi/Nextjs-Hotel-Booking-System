import React from 'react';

import { Hotel } from '../../../entities/hotel/model/types/hotelcard';
import HotelCard from '../../../entities/hotel/ui/HotelCard';

interface HotelListProps {
  hotels: Hotel[];
  totalCount: number;
  queryString?: string;
}

export default function HotelList({ hotels, totalCount, queryString }: HotelListProps) {
  return (
   
    <main className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* رندر لیست کارت‌ها */}
      <div className="flex flex-col gap-4 lg:gap-6 lg:py-2">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="w-full" 
          >
        
            <HotelCard 
               hotel={hotel} 
               queryString={queryString} 
               layout="horizontal" 
            />
          </div>
        ))}
      </div>
    </main>
  );
}
