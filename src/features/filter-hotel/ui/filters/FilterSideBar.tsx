'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import FilterBottomSheet from './FilterBottomsheet';
import FilterContent from './FilterContent';
import MobileActionButtons from './MobileActionButton';
import SortBottomSheet from './SortBootomSheet';

export type FiltersState = {
  minPrice: number;
  maxPrice: number;
  stars: number[];
  amenities: string[];
};

export default function SidebarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState<FiltersState>({
    minPrice: Number(searchParams.get('minPrice')) || 20,
    maxPrice: Number(searchParams.get('maxPrice')) || 500,
    stars: searchParams.get('stars') ? searchParams.get('stars')!.split(',').map(Number) : [],
    amenities: searchParams.get('amenities') ? searchParams.get('amenities')!.split(',') : [],
  });

  const [activeModal, setActiveModal] = useState<'filters' | 'sort' | null>(null);

  // بستن مودال‌ها
  const closeModal = () => setActiveModal(null);

  // مدیریت تغییرات فیلتر و آپدیت URL
  const handleFilterChange = (newFilters: Partial<FiltersState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const params = new URLSearchParams(searchParams.toString());
    
    if (updatedFilters.minPrice !== 20) params.set('minPrice', updatedFilters.minPrice.toString());
    else params.delete('minPrice');
    
    if (updatedFilters.maxPrice !== 500) params.set('maxPrice', updatedFilters.maxPrice.toString());
    else params.delete('maxPrice');
    
    if (updatedFilters.stars.length > 0) params.set('stars', updatedFilters.stars.join(','));
    else params.delete('stars');
    
    if (updatedFilters.amenities.length > 0) params.set('amenities', updatedFilters.amenities.join(','));
    else params.delete('amenities');

    router.push(`${pathname}?${params.toString()}` ,  { scroll: false });
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // یک کلین‌آپ هم اضافه کردم که وقتی کامپوننت بسته میشه، اسکرول قفل نمونه
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  return (
    <div className="w-full lg:w-auto">
      {/* دکمه‌های موبایل رو داخل یک کانتینر w-full گذاشتیم */}
      <div className="w-full lg:hidden">
        <MobileActionButtons activeModal={activeModal} setActiveModal={setActiveModal} />
      </div>

      {/* ✅ سایدبار دسکتاپ: با w-[286px] */}
      <aside className="hidden lg:flex w-[286px] shrink-0 flex-col gap-8 bg-white p-3 rounded-lg">
        <FilterContent 
          filters={filters} 
          onChange={handleFilterChange} 
        />
      </aside>

      {/* باتم‌شیت‌ها */}
      <FilterBottomSheet isOpen={activeModal === 'filters'} onClose={closeModal}>
        <FilterContent 
          filters={filters} 
          onChange={handleFilterChange} 
        />
      </FilterBottomSheet>

      <SortBottomSheet isOpen={activeModal === 'sort'} onClose={closeModal} />
    </div>
  );
}
