'use client';

import 'react-multi-date-picker/styles/layouts/mobile.css';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';

import { fetchCitiesFromApi } from '@/entities/hotel/api/getCities';
import { Button } from '@/shared/ui/Button';
import { useSmartRouter } from '@/shared/utils/useSmartRoter';

interface City {
  id: number | string;
  name: string;
}

export default function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { pushWithParams } = useSmartRouter();

  const today = new DateObject().format('YYYY-MM-DD');
  const tomorrow = new DateObject().add(1, 'days').format('YYYY-MM-DD');

  const [cityId, setCityId] = useState<string>(searchParams.get('cityId') || '');
  const [checkIn, setCheckIn] = useState<string>(searchParams.get('checkIn') || today);
  const [checkOut, setCheckOut] = useState<string>(searchParams.get('checkOut') || tomorrow);
  const [adults, setAdults] = useState<string>(searchParams.get('adults') || '1');

  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(true);
  
  // 🆕 استیت جدید برای مدیریت خطای انتخاب شهر
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setIsLoadingCities(true);
        const data = await fetchCitiesFromApi();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    loadCities();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // 🚨 اعتبارسنجی: اگر شهر انتخاب نشده بود، ارور بده و نرو مرحله بعد!
    if (!cityId) {
      setErrorMsg('Please select a destination first ✈️'); // متن انگلیسی شد
      // بعد از ۳ ثانیه ارور رو پاک کن
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return; // خروج از تابع تا مسیر عوض نشه
    }

    let targetPath = pathname;
    if (pathname === '/' || pathname.startsWith('/hotels/')) {
      targetPath = '/hotels';
    }
    
    pushWithParams(targetPath, {
      cityId: cityId || null,
      checkIn: checkIn || null,
      checkOut: checkOut || null,
      adults: adults || null,
      page: '1'
    });
  };

  return (
    // 🌟 کلاس relative اضافه شد تا بتونیم ارور رو نسبت به فرم تنظیم کنیم
    <form onSubmit={handleSearch} className="relative w-full max-w-[1000px] mx-auto text-left">
      
      {/* 🔔 نمایش ارور مینیمال و مدت‌دار */}
      {errorMsg && (
        // پدینگ‌ها به px-6 py-3 تغییر کرد و top به -top-14 تا فضای بیشتری داشته باشه
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-500 text-sm font-medium px-6 py-3 rounded-full shadow-sm border border-red-100 z-50 animate-bounce whitespace-nowrap">
          {errorMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl p-2 shadow-lg flex flex-col md:flex-row items-center gap-2 relative z-10 w-full">
        {/* City Search */}
        <div className="flex items-center gap-3 px-4 py-2 flex-[1.2] w-full border-b md:border-b-0 md:border-r border-gray-200">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-500 font-medium mb-0.5">Where are you going?</label>
            <select
              value={cityId}
              onChange={(e) => {
                setCityId(e.target.value);
                if (errorMsg) setErrorMsg(null); // اگه ارور بود و کاربر شهر رو انتخاب کرد، همون لحظه ارور پاک بشه
              }}
              disabled={isLoadingCities}
              className="text-sm text-gray-800 font-semibold focus:outline-none w-full bg-transparent cursor-pointer disabled:opacity-50"
            >
              <option value="" disabled>
                {isLoadingCities ? 'Loading cities...' : 'Select City'}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Check-in & Check-out */}
        <div className="flex w-full flex-[1.5] border-b md:border-b-0 md:border-r border-gray-200">
          {/* Check-in */}
          <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 flex-1 border-r border-gray-200 w-1/2">
            <div className="flex flex-col w-full overflow-hidden">
              <label className="text-xs text-gray-500 font-medium mb-0.5">Check-in</label>
              <DatePicker
                value={checkIn}
                onChange={(date: DateObject | null) => setCheckIn(date?.format('YYYY-MM-DD') || '')}
                format="YYYY-MM-DD"
                minDate={new Date()}
                inputClass="text-sm text-gray-800 font-semibold focus:outline-none w-full bg-transparent border-none p-0 cursor-pointer shadow-none"
                containerClassName="w-full"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 flex-1 w-1/2">
            <div className="flex flex-col w-full overflow-hidden">
              <label className="text-xs text-gray-500 font-medium mb-0.5">Check-out</label>
              <DatePicker
                value={checkOut}
                onChange={(date: DateObject | null) => setCheckOut(date?.format('YYYY-MM-DD') || '')}
                format="YYYY-MM-DD"
                minDate={checkIn ? new Date(checkIn) : new Date()}
                inputClass="text-sm text-gray-800 font-semibold focus:outline-none w-full bg-transparent border-none p-0 cursor-pointer shadow-none"
                containerClassName="w-full"
                placeholder="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>

        {/* Adults / Guests */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 flex-[1.2] w-full">
          <div className="flex items-center gap-3">
            <div className="flex flex-col w-full">
              <label className="text-xs text-gray-500 font-medium mb-0.5">Guests</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="text-sm text-gray-800 font-semibold focus:outline-none w-full bg-transparent"
                placeholder="Total Guests"
              />
            </div>
          </div>
        </div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
