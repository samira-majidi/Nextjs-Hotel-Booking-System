import Image from 'next/image';

import { fetchCitiesFromApi } from '@/entities/hotel/api/getCities';
// 👇 مسیر این ایمپورت رو بر اساس فایلی که ساختی تنظیم کن
import { fetchFeaturedHotels } from '@/entities/hotel/api/getFeaturedHotel';
import SearchForm from '@/features/search-hotel/ui/searchForm';
import { mergeCityData } from '@/shared/utils/cityUtils';
import FAQSection from '@/widgets/home-section/ui/FAQsection';
import MostBookedHotels from '@/widgets/home-section/ui/MostBookedHotel';
import PopularDestinations from '@/widgets/home-section/ui/Populardestination';
import WhyChooseUs from '@/widgets/home-section/ui/WhyChooseUs';

export default async function Page() {
  // ⚡ اجرای همزمان هر دو درخواست برای پرفورمنس بهتر
  const [apiCities, featuredHotels] = await Promise.all([
    fetchCitiesFromApi(),
    fetchFeaturedHotels(),
  ]);

console.log("خروجی API هتل‌های ویژه:", featuredHotels); // 👈 این خط رو اضافه کن

  const finalDestinations = mergeCityData(apiCities);

  return (
    <main>
      {/* 1. overflow-hidden حذف شد */}
      {/* 2. z-50 اضافه شد تا این سکشن همیشه روی بقیه باشه */}
      <section className="relative z-50 w-full flex flex-col items-center justify-center px-4">

        {/* تصویر پس‌زمینه */}
        <Image
          src="/hero1.png"
          alt="Luxury hotel lobby - Hero Image"
          fill
          className="object-cover object-center"
          priority
          quality={90}
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
            <SearchForm />
          </div>
        </div>
      </section>

      <PopularDestinations destinations={finalDestinations} />
      
      {/* 👇 دیتای دریافت شده به کامپوننت پاس داده شد */}
      <MostBookedHotels hotels={featuredHotels} />
      
      <WhyChooseUs />
      <FAQSection />
    </main>
  );
}
