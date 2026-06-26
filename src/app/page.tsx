
import Image from 'next/image';
import { Suspense } from 'react';

import { fetchCitiesFromApi } from '@/entities/hotel/api/getCities';
import { fetchFeaturedHotels } from '@/entities/hotel/api/getFeaturedHotel';
import SearchForm from '@/features/search-hotel/ui/searchForm';
import { mergeCityData } from '@/shared/utils/cityUtils';
import FAQSection from '@/widgets/home-section/ui/FAQsection';
import MostBookedHotels from '@/widgets/home-section/ui/MostBookedHotel';
import PopularDestinations from '@/widgets/home-section/ui/Populardestination';
import WhyChooseUs from '@/widgets/home-section/ui/WhyChooseUs';

// 1️⃣ کامپوننت کمکی برای لود مقاصد پرطرفدار (آسنکرون)
async function PopularDestinationsWrapper() {
  const apiCities = await fetchCitiesFromApi();
  const finalDestinations = mergeCityData(apiCities);
  return <PopularDestinations destinations={finalDestinations} />;
}

// 2️⃣ کامپوننت کمکی برای لود هتل‌های ویژه (آسنکرون)
async function MostBookedHotelsWrapper() {
  const featuredHotels = await fetchFeaturedHotels();
  // eslint-disable-next-line no-console
  console.log("خروجی API هتل‌های ویژه:", featuredHotels);
  return <MostBookedHotels hotels={featuredHotels} />;
}

export default function Page() {
  // ⚡ دیگر هیچ await بلاک‌کننده‌ای اینجا وجود ندارد! صفحه فوراً رندر می‌شود.

  return (
    <main>
      {/* z-50 اضافه شد. همچنین min-h-[600px] md:min-h-[700px] برای رفع CLS اضافه شد */}
      <section className="relative z-50 w-full min-h-[600px] md:min-h-[700px] flex flex-col items-center justify-center px-4">

        {/* تصویر پس‌زمینه */}
        <Image
          src="/hero1.webp"
          alt="Luxury hotel lobby - Hero Image"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover object-center"
          priority
          quality={75}
        />

        {/* لایه تیره روی تصویر */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-[1]"></div>

        {/* محتوای اصلی - ساختار یکپارچه و پایدار */}
        <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center mt-8 md:mt-0">
          {/* بج شیشه‌ای */}
          <div className=" mt-4 md:mt-8 mb-7 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm md:text-base font-medium tracking-wide">
            Explore. Dream. Stay.
          </div>

          {/* عنوان اصلی */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
            Find Your Perfect Stay
          </h1>

          {/* زیرنویس */}
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-1 drop-shadow-md font-medium">
            Search deals on hotels, homes and much more...
          </p>

          {/* کامپوننت فرم جستجو */}
          <div className="w-full flex justify-center pb-12 md:pb-20 mt-4">
            <Suspense 
              fallback={
                <div className="w-full max-w-4xl h-16 bg-white/20 backdrop-blur-md animate-pulse rounded-xl border border-white/30" />
              }
            >
              <SearchForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* بخش مقاصد با Suspense */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center">در حال بارگذاری مقاصد...</div>}>
        <PopularDestinationsWrapper />
      </Suspense>
      
      {/* بخش هتل‌ها با Suspense */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center">در حال بارگذاری هتل‌ها...</div>}>
        <MostBookedHotelsWrapper />
      </Suspense>
      
      <WhyChooseUs />
      <FAQSection />
    </main>
  );
}
