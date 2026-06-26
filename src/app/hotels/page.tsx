import Image from 'next/image';
import { Suspense } from 'react';

import { fetchCitiesFromApi } from '@/entities/hotel/api/getCities';
import SearchForm from '@/features/search-hotel/ui/searchForm';
import HotelListWrapper from '@/widgets/hotel-list/ui/HotelListWrapper'; // 👈 مسیر ایمپورت رو متناسب با پروژه تنظیم کن

interface HotelsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getCityImagePath(cityName?: string) {
  if (!cityName) return '/tehran.webp';
  const name = cityName.toLowerCase();
  if (name.includes('shiraz')) return '/shirazHero.webp';
  if (name.includes('isfahan') || name.includes('esfahan')) return '/isfahan.webp';
  if (name.includes('kish')) return '/kish.webp';
  if (name.includes('mashhad') || name.includes('mashad')) return '/mashad.webp';
  if (name.includes('tabriz')) return '/tabriz.webp';
  return '/tehran.webp';
}

export default async function HotelsPage({ searchParams }: HotelsPageProps) {
  const params = await searchParams;
  const cityId = params.cityId as string;
  const checkIn = params.checkIn as string;
  const checkOut = params.checkOut as string;
  const adults = params.adults as string;

  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string') urlParams.append(key, value);
    else if (Array.isArray(value)) value.forEach((v) => urlParams.append(key, v));
  });
  const queryString = urlParams.toString();

  let selectedCityName = '';
  try {
    // گرفتن اسم شهر خیلی سریع انجام میشه و SSR رو بلاک نمیکنه
    const cities = await fetchCitiesFromApi();
    const selectedCity = cities.find((c: any) => String(c.id) === String(cityId));
    if (selectedCity) {
      selectedCityName = selectedCity.name;
    }
  } catch (error) {
    console.error('Failed to fetch cities for hero image', error);
  }

  const heroImageSrc = getCityImagePath(selectedCityName);
  const hasSearchParams = checkIn || checkOut || adults;

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 -mt-16">
      <section className="relative w-full h-[260px] lg:h-[380px] shadow-sm">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageSrc}
            alt={selectedCityName ? `${selectedCityName} Hero` : 'City Hero'}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gray-50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-6 lg:py-10">
          <div className="flex flex-col gap-2 mt-auto lg:mt-12 mb-4 lg:mb-0">
            {selectedCityName && (
              <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-wider uppercase">
                {selectedCityName}
              </h1>
            )}

            {hasSearchParams && (
              <div className="flex flex-col gap-1.5 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-sm text-xs md:text-sm text-white/90 w-fit font-light tracking-wide">
                {checkIn && <div className="flex items-center gap-2"><span className="opacity-70 w-12">In:</span><span className="font-medium">{checkIn}</span></div>}
                {checkOut && <div className="flex items-center gap-2"><span className="opacity-70 w-12">Out:</span><span className="font-medium">{checkOut}</span></div>}
                {adults && <div className="flex items-center gap-2"><span className="opacity-70 w-12">Guests:</span><span className="font-medium">{adults}</span></div>}
              </div>
            )}
          </div>

          <div className="hidden lg:flex w-full mb-2">
            <SearchForm />
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col mt-4 lg:mt-8">
        {/* مودال موبایل رو دست نزدم */}
        <input type="checkbox" id="mobile-search-modal" className="peer hidden" />
        <div className="fixed inset-0 z-[100] hidden peer-checked:flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <label htmlFor="mobile-search-modal" className="absolute inset-0 cursor-pointer"></label>
          <div className="relative z-10 w-full max-w-md bg-white sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden p-4 pb-8 sm:pb-4 animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Edit Search</h3>
              <label htmlFor="mobile-search-modal" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">&times;</label>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              <SearchForm />
            </div>
          </div>
        </div>

        <main className="flex flex-col w-full pb-6">
          {!cityId ? (
            <div className="flex flex-col items-center justify-center w-full py-10 text-gray-500 bg-white rounded-3xl shadow-sm border border-gray-100">
              <span className="text-5xl mb-3">🏙️</span>
              <h2 className="text-xl font-bold text-gray-700 mb-2">No Destination Selected</h2>
            </div>
          ) : (
            // 🌟 این همون جادویی هست که LCP رو نجات میده! 🌟
            <Suspense fallback={
              <div className="flex items-center justify-center w-full h-[400px] bg-gray-100/50 rounded-2xl animate-pulse">
                <span className="text-gray-500 font-medium">در حال جستجوی بهترین هتل‌ها...</span>
              </div>
            }>
              <HotelListWrapper params={params} queryString={queryString} />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}
