import Image from 'next/image';

import { HotelType } from '@/features/hotels/types/hotelcard';

interface HotelCardProps {
  hotel: HotelType;
}

const HotelCard = ({ hotel }: HotelCardProps) => (
  // تغییر اصلی اینجاست: w-[280px] به w-full تبدیل شد
  <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
    {/* Hotel Image & Like Button */}
    <div className="relative h-48 w-full">
      <Image
        src={hotel.imageUrl}
        alt={hotel.name}
        fill
        quality={75}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 280px"
      />
      <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    {/* Hotel Info */}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="font-bold text-gray-900 text-base">{hotel.name}</h3>
      <p className="text-gray-400 text-xs mt-1 mb-4">{hotel.location}</p>
      
      <div className="mt-auto flex justify-between items-end">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-bold text-green-600 text-sm">{hotel.rating}</span>
          <span className="text-gray-400 text-xs">({hotel.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="text-right">
          <span className="font-extrabold text-gray-900 text-lg">${hotel.price}</span>
          <span className="text-gray-400 text-xs block -mt-1">/ night</span>
        </div>
      </div>
    </div>
  </div>
);

export default HotelCard;
