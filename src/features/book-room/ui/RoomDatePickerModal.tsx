"use client";

import 'react-day-picker/dist/style.css'; 

import { differenceInDays, startOfToday } from 'date-fns';
import React, { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';

interface RoomDatePickerModalProps {
  onClose: () => void;
  onApply: (checkIn: Date, checkOut: Date) => void;
  // اضافه کردن مقادیر اولیه برای دریافت از URL یا فرم
  initialCheckIn?: string | null; 
  initialCheckOut?: string | null;
}

export const RoomDatePickerModal: React.FC<RoomDatePickerModalProps> = ({ 
  onClose, 
  onApply,
  initialCheckIn,
  initialCheckOut
}) => {
  // مقداردهی اولیه state با استفاده از تاریخ‌های پاس داده شده
  const [range, setRange] = useState<DateRange | undefined>(() => {
    if (initialCheckIn && initialCheckOut) {
      return {
        from: new Date(initialCheckIn),
        to: new Date(initialCheckOut)
      };
    }
    return undefined;
  });

  // محاسبه تعداد شب
  const nights = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const today = startOfToday();

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div 
        className="fixed inset-0 z-40 hidden sm:block bg-transparent" 
        onClick={onClose} 
      />

      <div className="fixed bottom-0 left-0 right-0 sm:absolute sm:right-auto sm:left-auto sm:bottom-full sm:mb-2 z-50 bg-white sm:border sm:border-gray-100 rounded-t-3xl sm:rounded-[20px] shadow-2xl sm:shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 sm:p-6 w-full sm:w-auto max-w-none sm:max-w-[400px] animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-2 sm:fade-in duration-300">
        
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

        <div className="mb-6 flex justify-center">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            disabled={{ before: today }}
            showOutsideDays
            className="font-sans m-0"
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-4",
              month_caption: "flex justify-center pt-1 relative items-center mb-6",
              caption_label: "text-lg font-semibold text-gray-900",
              nav: "space-x-1 flex items-center",
              nav_button: "h-8 w-8 bg-transparent p-0 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition-colors",
              nav_button_previous: "absolute left-0",
              nav_button_next: "absolute right-0",
              table: "w-full border-collapse space-y-1",
              head_row: "flex mb-2",
              head_cell: "text-gray-500 rounded-md w-10 uppercase tracking-wider text-center",
              row: "flex w-full mt-1",
              cell: "text-center p-0 relative [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20 h-10 w-10 flex items-center justify-center",
              day: "h-10 w-10 p-0 hover:bg-gray-100 rounded-full cursor-pointer transition-colors",
              day_today: "!text-green-600 font-bold !bg-green-50 rounded-full",
              day_outside: "text-gray-300 opacity-50",
              day_disabled: "text-gray-200 opacity-50 cursor-not-allowed hover:bg-transparent",
              day_selected: "!bg-blue-100 !text-blue-700 hover:!bg-blue-200 hover:!text-blue-800 focus:!bg-blue-100 focus:!text-blue-700 rounded-full font-semibold",
              day_range_middle: "aria-selected:!bg-blue-50 aria-selected:!text-blue-900 rounded-none",
              day_hidden: "invisible",
            }}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button 
            onClick={() => setRange(undefined)}
            className="text-blue-500 font-medium hover:text-blue-600 transition-colors text-sm underline-offset-4 hover:underline px-2"
          >
            Clear dates
          </button>

          <button 
            onClick={() => {
              if (range?.from && range?.to) onApply(range.from, range.to);
            }}
            disabled={!range?.from || !range?.to}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-colors text-sm shadow-sm ${
              range?.from && range?.to 
                ? "bg-blue-500 text-white hover:bg-blue-600" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {nights > 0 ? `Apply • ${nights} nights` : "Apply"}
          </button>
        </div>

      </div>
    </>
  );
};
