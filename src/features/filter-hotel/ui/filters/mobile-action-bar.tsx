import FilterSidebar from '@/features/filter-hotel/ui/filters/FilterSideBar';
import SearchForm from '@/features/search-hotel/ui/searchForm';
import { EditDatesBanner } from '@/shared/ui/EditDateBanner';

interface MobileActionBarProps {
  totalCount: number;
}

export default function MobileActionBar({ totalCount }: MobileActionBarProps) {
  return (
    <div className="flex lg:hidden flex-col w-full bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-4 gap-5">
      
       <div className="mt-6 block lg:hidden w-full">
                <EditDatesBanner>
                   <SearchForm />
                </EditDatesBanner>
              </div>
      
      {/* بخش پایین: در موبایل ستونی، در تبلت در یک ردیف */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div className="order-1 sm:order-2 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <FilterSidebar />
          </div>
        </div>

        {/* تعداد پراپرتی‌ها */}
        <div className="order-2 sm:order-1 border-t border-gray-50 sm:border-none pt-3 sm:pt-0 pl-1">
          <h3 className="text-sm sm:text-lg font-bold text-gray-800">
            {totalCount} <span className="font-normal text-gray-500">properties found</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
