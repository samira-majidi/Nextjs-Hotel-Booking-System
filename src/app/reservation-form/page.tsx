'use client';

import Link from 'next/link';

import { useBookingStore } from '@/store/useBookingStore';
import BookingSummary from '@/widgets/booking-summery/BookingSummary';
import CheckoutWidget from '@/widgets/booking-summery/CheckoutWidget';

export default function CheckoutPage() {
  const { roomId, checkIn, checkOut, _hasHydrated } = useBookingStore();

  if (!_hasHydrated) {
    return <div className="p-8 text-center text-gray-600">Loading reservation details... ⏳</div>;
  }

  const missingFields: string[] = [];
  if (!roomId) missingFields.push('Room selection');
  if (!checkIn) missingFields.push('Check-in date');
  if (!checkOut) missingFields.push('Check-out date');

  if (missingFields.length > 0) {
    return (
      <div className="p-8 max-w-md mx-auto mt-12 border border-red-200 bg-red-50 rounded-xl shadow-sm text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Incomplete Reservation Details! 🧐</h2>
        <p className="text-gray-700 mb-4">
          Dear user, please provide the following details to proceed with your reservation:
        </p>
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
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* بخش سمت چپ: حالا ویجت ما اینجاست و بین فرم و پرداخت جابجا میشه */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1 bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-2">Guest Details & Checkout</h2>
            <p className="text-gray-500 mb-8">Please enter your details to complete the booking</p>
            
            {/* استفاده از ویجت به جای ReservationForm */}
            <CheckoutWidget />
          </div>

          {/* بخش سمت راست: خلاصه رزرو سر جاش و بدون تغییر باقی می‌مونه */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <BookingSummary />
          </div>

        </div>
      </div>
    </div>
  );
}
