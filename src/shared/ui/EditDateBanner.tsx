"use client";

import React, { useState } from 'react';

import FilterBottomSheet from '@/features/filter-hotel/ui/filters/FilterBottomsheet';

interface EditDatesBannerProps {
  dateText?: string;
  className?: string;
  children?: React.ReactNode;
}

export function EditDatesBanner({ 
  dateText, 
  className = "",
  children
}: EditDatesBannerProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(today);
  const displayDate = dateText || `Prices are for today, ${formattedDate}`;

  return (
    <>
      <div className={`bg-emerald-50 border border-emerald-100 px-4 py-4 sm:px-6 sm:py-5 rounded-2xl flex items-center justify-between gap-3 w-full shadow-sm ${className}`}>
        
        <span className="text-sm sm:text-base font-medium text-emerald-900">
          {displayDate}
        </span>

        <button
          onClick={() => setIsSheetOpen(true)}
          className="bg-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          title="Edit Dates"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span className="text-sm sm:text-base font-bold">Edit</span>
        </button>
      </div>

      {/* 🆕 تنظیمات جدید اعمال شد */}
      <FilterBottomSheet 
        isOpen={isSheetOpen} 
        onClose={() => setIsSheetOpen(false)}
        title="Edit Search"  /* تغییر عنوان */
        showFooter={false}   /* مخفی کردن دکمه مزاحم */
      >
        {children}
      </FilterBottomSheet>
    </>
  );
}
