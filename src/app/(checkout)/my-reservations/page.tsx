export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import Link from 'next/link';

import { getUserReservationsApi } from '@/entities/reservation/api/getUserReservationResponse';
import { Reservation } from '@/entities/reservation/model/type';
import BookingsTabs from '@/widgets/booking-summery/BookingTab'; // مسیر کامپوننت تب‌ها را اینجا تنظیم کن

export default async function MyBookingsPage() {
  let reservations: Reservation[] = []; 
  let error: string | null = null;

  try {
    const cookieStore = cookies();
    const authCookie = (await cookieStore).get('auth-storage')?.value;
    let token = null;

    if (authCookie) {
      try {
        const parsedData = JSON.parse(authCookie);
        token = parsedData.state?.accessToken;
      } catch (parseError) {
        console.error('Error parsing auth cookie:', parseError);
      }
    }
    
    if (token) {
      const response = await getUserReservationsApi(token);
      reservations = response.data; 
    } else {
      error = 'You are not logged in.';
    }
  } catch (err) {
    console.error('Error fetching reservations:', err);
    error = 'An error occurred while fetching data.';
  }

  // اضافه کردن منطق فیلتر تاریخ‌ها
  const now = new Date();
  const upcomingReservations = reservations.filter(
    (res) => new Date(res.checkOutDate) >= now
  );
  const pastReservations = reservations.filter(
    (res) => new Date(res.checkOutDate) < now
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
     {/* دکمه بازگشت: با این کلاس‌ها می‌چسبونیمش بالایِ صفحه */}
   <div className="absolute top-4 left-4 md:left-1/2 md:-ml-[460px]"> 
  <Link 
    href="/" 
    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-lg font-semibold pl-6"
  >
    <span>←</span> <span>Back to Home</span>
  </Link>
</div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Reservations
        </h1>

        {error ? (
          <div className="bg-red-50 text-red-500 rounded-3xl p-8 text-center shadow-sm">
            <p>{error}</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-4">You have no reservations yet.</p>
            <Link 
              href="/" 
              className="inline-block bg-[#00A651] hover:bg-[#008c44] text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Explore Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
             {/* جایگزینی مپ کردن لیست با کامپوننت تب‌ها */}
            <BookingsTabs 
              upcomingReservations={upcomingReservations} 
              pastReservations={pastReservations} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
