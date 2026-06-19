'use client';

import { useRouter } from 'next/navigation'; // اضافه شدن روتر
import { useState } from 'react';

// آدرس‌ها رو بر اساس پروژه‌ات تنظیم کن
import PaymentCheckout from '@/features/payment/ui/PaymentForm';
import ReservationForm from '@/features/reservation/ui/ReservationForm';

type CheckoutStep = 'details' | 'payment';

export default function CheckoutWidget() {
  const router = useRouter(); // تعریف روتر
  const [step, setStep] = useState<CheckoutStep>('details');
  const [reservationId, setReservationId] = useState<string | number | null>(null);

  // فرم اطلاعات کاربر
  if (step === 'details') {
    return (
      <ReservationForm 
        onSuccess={(id) => {
          setReservationId(id);
          setStep('payment'); // با موفقیت در رزرو، میریم به مرحله پرداخت
        }} 
      />
    );
  }

  // فرم پرداخت
  if (step === 'payment' && reservationId) {
    return (
      <PaymentCheckout 
        reservationId={reservationId} 
        onSuccess={() => {
          // وقتی پرداخت موفق بود، برو به صفحه موفقیت 🎉
          router.replace('/success');
        }} 
      />
    );
  }

  return null;
}
