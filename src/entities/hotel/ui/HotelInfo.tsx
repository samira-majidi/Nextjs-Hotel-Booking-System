import { AmenityTag } from '@/shared/ui/AmenityTag';
import { StarRating } from '@/shared/ui/StarRating';

import { Amenities } from '../model/types';

interface HotelInfoProps {
  name: string;
  stars: number;
  amenities: Amenities[];
}

export function HotelInfo({ name, stars, amenities = [] }: HotelInfoProps) {
  const topAmenities = amenities?.slice(0, 4) || [];

  return (
    <div className="flex flex-col gap-2.5">
     
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
    
        {/* اضافه کردن پدینگ راست (pr-5) برای فاصله گرفتن از امکانات */}
        <div className="flex items-center gap-1.5 pr-5">
        
          <StarRating
            rating={stars || 0} // تعداد ستاره‌های زرد بر اساس دیتای هتل (اگر نبود $0$)
            total={5} // تعداد کل ستاره‌ها همیشه روی $5$ قفل شد
            className="flex items-center gap-[2px]"
            // سایز ستاره‌ها بزرگ‌تر شد (از w-4 h-4 به w-5 h-5)
            starSize="w-5 h-5" 
          />
        </div>

        {/* بخش امکانات هتل */}
        {topAmenities.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            {topAmenities.map((amenity, index) => {
              let amenityName: string;

              if (typeof amenity === 'string') {
                amenityName = amenity;
              } else if (amenity?.name) {
                amenityName = amenity.name;
              } else if (amenity?.type) {
                amenityName = amenity.type;
              } else {
                amenityName = String(amenity);
              }

              if (!amenityName || amenityName.trim() === '') return null;

              return (
                <AmenityTag
                  key={amenity?.id || index}
                  name={amenityName}
                  className="!border-none !shadow-none !bg-transparent !p-0 !text-gray-700 !font-medium gap-1.5 [&>svg]:text-green-500 [&>i]:text-green-500"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
