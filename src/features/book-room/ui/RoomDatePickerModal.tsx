"use client";
import { clsx } from 'clsx';
import { differenceInDays, endOfMonth, format, startOfMonth, startOfToday } from 'date-fns';
import React, { useState } from 'react';
//import type { ClassNames } from "react-day-picker";
import { DateRange, DayPicker } from 'react-day-picker';

import { useBookingPrice, useMonthCalendarPrices } from '../hooks/useRoomPricing';

interface RoomDatePickerModalProps {
  roomId: string;
  onClose: () => void;
  onApply: (checkIn: Date, checkOut: Date, totalPrice?: number) => void;
  initialCheckIn?: string | null; 
  initialCheckOut?: string | null;
}

export const RoomDatePickerModal: React.FC<RoomDatePickerModalProps> = ({ 
  roomId,
  onClose,
  onApply,
  initialCheckIn,
  initialCheckOut
}) => {
  const [range, setRange] = useState<DateRange | undefined>(() => {
    if (initialCheckIn && initialCheckOut) {
      return {
        from: new Date(initialCheckIn),
        to: new Date(initialCheckOut)
      };
    }
    return undefined;
  });

  const [currentMonth, setCurrentMonth] = useState<Date>(() => range?.from || new Date());

  const monthStartStr = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const monthEndStr = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  const checkInStr = range?.from ? format(range.from, 'yyyy-MM-dd') : null;
  const checkOutStr = range?.to ? format(range.to, 'yyyy-MM-dd') : null;

  const { data: bookingPriceData, isLoading: isCalculatingPrice } = useBookingPrice(
    roomId,
    checkInStr,
    checkOutStr
  );

  const { data: monthPrices, isLoading: isMonthPricesLoading } = useMonthCalendarPrices(roomId, monthStartStr, monthEndStr);
  
  const nights = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const today = startOfToday();

  // 👇 کامپوننت سفارشی مینیمال با تِم آبی شیک 👇
  const CustomDayButton = (props: any) => {
    const { day, modifiers, ...buttonProps } = props;
    const date = day.date;
    const currentDateStr = format(date, 'yyyy-MM-dd');
    const safePrices = Array.isArray(monthPrices) ? monthPrices : [];
    const dayPrice = safePrices.find((p: any) => p.date.split('T')[0] === currentDateStr);

    const isSelected = modifiers.selected;
    const isRangeStart = modifiers.range_start;
    const isRangeEnd = modifiers.range_end;
    const isRangeMiddle = modifiers.range_middle;
    const isToday = modifiers.today;
    const isOutside = modifiers.outside;
    const isDisabled = modifiers.disabled;

    return (
      <button
        {...buttonProps}
        className={clsx(
          "relative flex flex-col items-center justify-center w-11 h-12 transition-all outline-none rounded-xl",
          // استایل پایه: بدون بک‌گراند، فقط در هاور کمی تیره میشه
          "hover:bg-gray-100",
          // بازه میانی: یک آبی بسیار ملایم
          isRangeMiddle && "bg-blue-50 text-blue-900 rounded-none hover:bg-blue-100",
          // روزهای انتخاب شده (شروع و پایان): آبی شیک
          isSelected && (isRangeStart || isRangeEnd) && "bg-blue-600 text-white hover:bg-blue-700",
          isRangeStart && "rounded-l-xl rounded-r-none",
          isRangeEnd && "rounded-r-xl rounded-l-none",
          // استایل وقتی فقط یک روز انتخاب شده (نه بازه)
          isSelected && !isRangeStart && !isRangeEnd && !isRangeMiddle && "bg-blue-600 text-white rounded-xl",
          // استایل امروز: متن آبی و بولدتر با بک‌گراند خیلی محو
          isToday && !isSelected && "text-blue-600 font-extrabold bg-blue-50/80",
          // استایل روزهای خارج از ماه یا غیرفعال
          (isOutside || isDisabled) && "opacity-30 cursor-not-allowed hover:bg-transparent"
        )}
      >
        <span className="text-[15px] font-medium leading-none">{date.getDate()}</span>
        
        {/* نمایش قیمت‌های روزانه */}
        {isMonthPricesLoading ? (
          <span className="text-[10px] text-gray-300 mt-1">...</span>
        ) : dayPrice && !isOutside && !isDisabled ? (
          <span className={clsx(
            "text-[10px] mt-1 font-medium tracking-tighter",
            isSelected && (isRangeStart || isRangeEnd) ? "text-blue-200" : "text-gray-400"
          )}>
            ${Math.round(Number(dayPrice.price))}
          </span>
        ) : null}
      </button>
    );
  };
  return (
    // نگهدارنده اصلی که کل صفحه رو می‌گیره و محتوا رو وسط‌چین می‌کنه
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* 🌟 پس‌زمینه: بدون رنگ (شفاف) اما با افکت تار شدن (Blur) */}
      <div 
        className="absolute inset-0 bg-white/5 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* 🌟 بدنه مدال: کاملا وسط صفحه با انیمیشن زوم جذاب */}
      <div className="relative z-10 bg-white border border-gray-200/60 rounded-[32px] sm:rounded-[24px] shadow-2xl p-6 w-full sm:w-[420px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        
        {/* خط کشویی موبایل */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-8 sm:hidden" />

        <div className="mb-6 flex justify-center overflow-hidden">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            disabled={{ before: today }}
            showOutsideDays
            components={{
              DayButton: CustomDayButton
            }}classNames={{
  months: "w-full",
  month: "w-full space-y-4",
  month_caption: "flex justify-center pt-1 relative items-center mb-6",
  nav: "flex items-center",
  // 👇 فلش‌های آبی رنگ و بولد
   button_previous: "absolute left-2 h-9 w-9 bg-transparent text-blue-700 fill-blue-700 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer [&_svg]:fill-blue-700 [&_svg]:w-5 [&_svg]:h-5",
  button_next: "absolute right-2 h-9 w-9 bg-transparent text-blue-700 fill-blue-700 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer [&_svg]:fill-blue-700 [&_svg]:w-5 [&_svg]:h-5",
 month_grid: "w-full border-collapse",
  weekdays: "flex w-full justify-between mb-4",
  weekday: "text-gray-400 font-medium text-[12px] w-11 text-center uppercase tracking-wider",
  week: "flex w-full justify-between mt-1",
}}

          />
        </div>

        {/* بخش فوتر و دکمه‌ها */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-2">
         {/* 👑 دکمه پاک کردن با رنگ آبی سلطنتی */}
        <button 
          onClick={() => setRange(undefined)}
               className="text-blue-700 font-bold hover:text-blue-900 text-sm underline-offset-4 hover:underline transition-all"
                >
                   Clear
                </button>
          <button 
            onClick={() => {
              if (range?.from && range?.to) {
                onApply(range.from, range.to, bookingPriceData?.totalPrice);
              }
            }}
            disabled={!range?.from || !range?.to || isCalculatingPrice}
            className={clsx(
              "px-8 py-3 rounded-2xl font-semibold transition-all text-sm tracking-wide",
              range?.from && range?.to && !isCalculatingPrice
                ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-600/20"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {isCalculatingPrice 
              ? "Calculating..." 
              : nights > 0 
                ? `Book ${nights} ${nights === 1 ? 'night' : 'nights'}` 
                : "Select Dates"}
          </button>
        </div>
      </div>
    </div>
  );

};
