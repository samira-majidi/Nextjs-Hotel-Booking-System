'use client';

import { useRouter } from 'next/navigation';

import PaymentCheckout from '@/features/payment/ui/PaymentForm';
import ReservationForm from '@/features/reservation/ui/ReservationForm';
// استور خودت رو ایمپورت کن
import { useBookingStore } from '@/store/useBookingStore';

export default function CheckoutWidget() {
  const router = useRouter();
  
 
  const reservationId = useBookingStore((state) => state.reservationId);
  const setReservationId = useBookingStore((state) => state.setReservationId);

// اگر آیدی رزرو تو استور باشه، یعنی قبلا فرم رو پر کرده و باید پول بده! 💸
  if (reservationId) {
    return (
      <PaymentCheckout 
        reservationId={reservationId} 
        onSuccess={() => {
          // بعد از موفقیت هم می‌تونی آیدی رو از استور پاک کنی هم بری صفحه موفقیت
          router.replace('/success');
        }} 
      />
    );
  }

  return (
    <ReservationForm 
      onSuccess={(id) => {
        // به جای استیت لوکال، می‌فرستیم تو قلب استور!
        setReservationId(id);
      }} 
    />
  );
}
