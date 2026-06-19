import React from 'react';

// 💡 ایمپورت مستقیم از لایه Model (Single Source of Truth)
import { HOTEL_AMENITIES } from '@/entities/hotel/model/constants/amenities';
import { AmenityTag } from '@/shared/ui/AmenityTag';
import { StarRating } from '@/shared/ui/StarRating';

type FiltersState = {
  minPrice: number;
  maxPrice: number;
  stars: number[];
  amenities: string[];
};

interface FilterContentProps {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
}

export default function FilterContent({ filters, onChange }: FilterContentProps) {
  const { minPrice, maxPrice, stars, amenities } = filters;

  const setMinPrice = (value: number) => {
    onChange({ ...filters, minPrice: Math.min(value, maxPrice) });
  };

  const setMaxPrice = (value: number) => {
    onChange({ ...filters, maxPrice: Math.max(value, minPrice) });
  };

  const toggleStar = (s: number) => {
    const exists = stars.includes(s);
    const nextStars = exists ? stars.filter((x) => x !== s) : [...stars, s];
    onChange({ ...filters, stars: nextStars });
  };

  const toggleAmenity = (a: string) => {
    const exists = amenities.includes(a);
    const nextAmenities = exists ? amenities.filter((x) => x !== a) : [...amenities, a];
    onChange({ ...filters, amenities: nextAmenities });
  };

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* 1) Budget per night */}
      <div>
        <h3 className="text-[14px] font-bold text-gray-900 mb-4">Budget per night</h3>
        <div className="px-2">
          <div className="relative h-1 bg-gray-200 rounded-full mt-6 mb-4">
            <div
              className="absolute top-0 h-full bg-blue-600 rounded-full"
              style={{
                left: `${(minPrice / 1000) * 100}%`,
                right: `${100 - (maxPrice / 1000) * 100}%`,
              }}
            />

            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="absolute w-full -top-1.5 h-4 opacity-0 cursor-pointer pointer-events-auto"
              style={{ zIndex: minPrice > 900 ? 5 : 3 }}
            />

            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="absolute w-full -top-1.5 h-4 opacity-0 cursor-pointer pointer-events-auto"
              style={{ zIndex: 4 }}
            />

            <div
              className="absolute top-1/2 w-[14px] h-[14px] bg-white border-2 border-blue-600 rounded-full -translate-y-1/2 pointer-events-none"
              style={{ left: `calc(${(minPrice / 1000) * 100}% - 7px)` }}
            />
            <div
              className="absolute top-1/2 w-[14px] h-[14px] bg-white border-2 border-blue-600 rounded-full -translate-y-1/2 pointer-events-none"
              style={{ left: `calc(${(maxPrice / 1000) * 100}% - 7px)` }}
            />
          </div>

          <div className="flex justify-between text-[13px] text-gray-600 font-medium mb-1">
            <span>${minPrice}</span>
            <span>
              ${maxPrice}
              {maxPrice >= 1000 ? '+' : ''}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 2) Star rating */}
      <div>
        <h3 className="text-[14px] font-bold text-gray-900 mb-4">Star rating</h3>
        <div className="flex flex-col gap-3">
          {[5, 4, 3, 2, 1].map((s) => (
            <label key={s} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={stars.includes(s)}
                onChange={() => toggleStar(s)}
              />
              {/* جایگزین کدهای شلوغ SVG قبلی 👇 */}
              <StarRating rating={s} total={s} className="flex gap-[2px]" />
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 3) Amenities */}
      <div>
        <h3 className="text-[14px] font-bold text-gray-900 mb-4">Amenities</h3>
        <div className="flex flex-col gap-3">
          {/* 💡 حالا فقط داریم روی HOTEL_AMENITIES لوپ می‌زنیم */}
          {HOTEL_AMENITIES.map((name) => (
            <label key={name} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0"
                checked={amenities.includes(name)}
                onChange={() => toggleAmenity(name)}
              />

              <AmenityTag
                name={name}
                className="!bg-transparent !border-none !p-0 !gap-2 text-[14px] text-gray-700 font-medium"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
