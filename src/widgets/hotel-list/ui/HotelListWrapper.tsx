import { fetchHotels } from '@/entities/hotel/api/getHotels';
import FilterSidebar from '@/features/filter-hotel/ui/filters/FilterSideBar';
import MobileActionBar from '@/features/filter-hotel/ui/filters/mobile-action-bar';
import HotelList from '@/widgets/hotel-list/ui/HotelList';

interface HotelListWrapperProps {
  params: any;
  queryString: string;
}

export default async function HotelListWrapper({ params, queryString }: HotelListWrapperProps) {
  let hotels = [];
  let totalCount = 0;

  try {
    const response = await fetchHotels(params);
    hotels = response?.data?.data || [];
    totalCount = response?.data?.meta?.total || 0;
  } catch (error) {
    console.error('Failed to fetch hotels:', error);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
      {/* 🌟 اکشن‌بار موبایل 🌟 */}
      <MobileActionBar totalCount={totalCount} />

      {/* سایدبار دسکتاپ */}
      <div className="hidden lg:flex lg:flex-col lg:items-start w-full lg:w-[286px] shrink-0">
        <FilterSidebar />
      </div>

      {/* لیست هتل‌ها */}
      <div className="flex-1 min-w-0 lg:pr-10">
        <h3 className="hidden lg:block text-xl font-bold text-gray-800 mb-4">
          {totalCount} properties found
        </h3>

        <HotelList
          key={queryString}
          hotels={hotels}
          totalCount={totalCount}
          queryString={queryString}
        />
      </div>
    </div>
  );
}
