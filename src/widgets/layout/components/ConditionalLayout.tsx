'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
    const hiddenRoutes = ['/reservation-form', '/success','/my-reservations'];

  // چک می‌کنه که آیا مسیر فعلی توی لیست بالا هست یا نه
  const isHiddenPage = hiddenRoutes.some(route => pathname.includes(route));

  // چک میکنه که آیا در مسیر فرم رزرو هستیم یا نه
  
  // اگر تو صفحه پرداخت باشیم، هدر/فوتر اصلی رندر نمیشه
  if (isHiddenPage) {
    return null;
  }

  return <>{children}</>;
}
