'use client';

import { CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/shared/ui/Logo';
import { useBookingStore } from '@/store/useBookingStore';
import BookingSummary from '@/widgets/booking-summery/BookingSummary';
import CheckoutWidget from '@/widgets/booking-summery/CheckoutWidget';

// ====================================================================
// کامپوننت‌های کمکی برای هدر
// ====================================================================

// کامپوننت برای هر مرحله در هدر
const Step = ({
  number,
  title,
  active = false,
  done = false,
}: {
  number: number | string;
  title: string;
  active?: boolean;
  done?: boolean;
}) => (
  <div className="flex items-center gap-2.5">
    {done ? (
      // 👇 رنگ آیکون تیک به آبی تغییر کرد
      <CheckCircle className="w-6 h-6 text-blue-600" /> 
    ) : (
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
          // 👇 رنگ پس‌زمینه مرحله فعال به آبی تغییر کرد
          active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
        }`}
      >
        {number}
      </div>
    )}
    <span className={`font-semibold ${active ? 'text-gray-900' : 'text-gray-500'}`}>{title}</span>
  </div>
);

// خط جداکننده بین مراحل
const Separator = () => <div className="w-12 h-px bg-gray-300 mx-4" />;

// ====================================================================
// کامپوننت هدر صفحه
// ====================================================================
const PageHeader = () => {
  return (
    <header className="pt-4 pb-2 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-8"> 
        <div className="flex justify-between items-center h-10">
          {/* بخش چپ: لوگو */}
          <div className="w-36 h-38 pt-4 bg-gray-200/50 rounded-lg"><Logo/></div>
     
          {/* بخش وسط: مراحل پرداخت */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-5">
            <Step number={1} title="Select Hotel" done />
            <Separator />
            <Step number={2} title="Guest Details" done />
            <Separator />
            <Step number={3} title="Payment" active />
          </div>

          {/* بخش راست: وضعیت پرداخت امن */}
          <div className="flex items-center gap-3 text-gray-700 w-45 justify-end animate-pulse">
             {/* 👇 رنگ آیکون سپر امنیتی به آبی تغییر کرد */}
             <ShieldCheck className="w-7 h-7 text-blue-600" />
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">Secure Booking</p>
              <p className="text-xs text-gray-500">256-bit SSL encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ====================================================================
// کامپوننت اصلی صفحه
// ====================================================================
export default function CheckoutPage() {
  const { roomId, checkIn, checkOut, _hasHydrated } = useBookingStore();

  if (!_hasHydrated) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading reservation details... ⏳
      </div>
    );
  }

  const missingFields: string[] = [];
  if (!roomId) missingFields.push('Room selection');
  if (!checkIn) missingFields.push('Check-in date');
  if (!checkOut) missingFields.push('Check-out date');

  if (missingFields.length > 0) {
    return (
      <div className="p-8 max-w-md mx-auto mt-8 border border-red-200 bg-red-50 rounded-xl shadow-sm text-center">
        <ul className="text-red-500 font-semibold mb-8 space-y-2">
          {missingFields.map((field, index) => (
            <li key={index}>❌ {field}</li>
          ))}
        </ul>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 inline-block"
        >
          Return to Home and Select a Room
        </Link>
      </div>
    );
  }

  return (
    // 👇 تغییر اول: اضافه کردن h-screen و overflow-hidden
    <div className="bg-slate-900/5 backdrop-blur-2xl font-sans flex flex-col min-h-screen overflow-hidden">
      <PageHeader />

      <main className="relative z-10 flex-grow pt-3">
        {/* 👇 تغییر دوم: اضافه کردن h-full برای پر کردن ارتفاع والد */}
        <div className="max-w-[1400px] mx-auto px-8 h-full">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 items-start h-full"> 
            
            {/* ستون چپ: خلاصه رزرو */}
            <div className="w-full h-full flex items-center">
               <BookingSummary />
            </div>

            {/* ستون راست: فرم پرداخت */}
            <div className="w-full h-full flex items-center">
              <CheckoutWidget />
            </div>

          </div>
        </div>
      </main>
    </div>
  );

}
