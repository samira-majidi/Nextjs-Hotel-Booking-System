'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

import { useIsLoggedIn } from '@/features/auth/model/hooks/useIsLoggedIn';
import { decodeBookingData } from '@/shared/lib/bookingToken';
import { useBookingStore } from '@/store/useBookingStore';

import { useRegisterAndBook } from '../hooks/useRegisterAndBook';
// 👇 Adjust the import path based on where you created the validation file
import { FormErrors } from '../modal/validateReservationForm';
import { validateReservationForm } from '../modal/validateReservationForm';

// ✅ اضافه شدن اینترفیس برای دریافت پراپ onSuccess
interface ReservationFormProps {
  onSuccess?: (reservationId: string | number) => void;
}

// ✅ اضافه شدن پراپ به ورودی کامپوننت
export default function ReservationForm({ onSuccess }: ReservationFormProps = {}) {
  const router = useRouter();

  // Getting store methods
  const setBookingDetails = useBookingStore((state) => state.setBookingDetails);
  
  // Extracting variables
  const fullName = useBookingStore((state) => state.fullName);
  const phoneNumber = useBookingStore((state) => state.phoneNumber);
  const setFullName = useBookingStore((state) => state.setFullName);
  const setPhoneNumber = useBookingStore((state) => state.setPhoneNumber);
  const hasHydrated = useBookingStore((state) => state._hasHydrated);
const setReservationId = useBookingStore((state) => state.setReservationId);

  const hotelId = useBookingStore((state) => state.hotelId);
  const roomId = useBookingStore((state) => state.roomId);
  const checkIn = useBookingStore((state) => state.checkIn);
  const checkOut = useBookingStore((state) => state.checkOut);

  // Local states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for managing validation errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [isPending, startTransition] = useTransition();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const isLoggedIn = useIsLoggedIn();
  const { execute, loading, error } = useRegisterAndBook();

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const token = currentUrl.searchParams.get('token');

    if (!token) {
      console.error('Token not found in URL.');
      router.back();
      return;
    }

    const bookingData = decodeBookingData(token);

    if (bookingData) {
      startTransition(() => {
        setBookingDetails({
          hotelId: String(bookingData.hotelId),
          roomId: bookingData.roomId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
        });
        setIsValid(true);
      });
    } else {
      // Using setTimeout to ensure alert is shown after initial render and router.back() doesn't interfere immediately
      setTimeout(() => {
        alert('Invalid booking details! Please try again.');
      }, 0);
      router.back();
    }
  }, [router, setBookingDetails]);
  // Form submit handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateReservationForm({
      fullName,
      phoneNumber,
      email,
      password,
      isLoggedIn,
    });

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!hotelId || !roomId || !checkIn || !checkOut) {
      alert('Booking details are missing. Please try again.');
      return;
    }

    const currentBookingDetails = { hotelId, roomId, checkIn, checkOut };

    // ✅ تغییر نام متغیر success به reservation
    // ✅ فراخوانی execute با اطلاعات درست
    const reservation = await execute(
      { fullName, email, phone: phoneNumber, password },
      currentBookingDetails
    );

    // ✅ بررسی اینکه آیا reservation وجود دارد و آیا id دارد
    if (reservation?.id) {
       setReservationId(reservation.id); // ✅ ذخیره ایدی در استور
      if (onSuccess) {
        // ✅ پاس دادن reservation.id به onSuccess
        onSuccess(reservation.id);
      } else {
       // if (clearBookingDetails) clearBookingDetails();
        router.replace('/success');
      }
    } else if (error) {
      // اگر خطایی از execute برگشت، آن را نمایش بده
      alert(`Booking failed: ${error}`);
    }
    // اگر success نشد و خطا هم نبود (که نباید اتفاق بیفتد)
    //else {
    // alert('Booking failed for an unknown reason.');
    //}
  };

  // Show loading state if store hasn't hydrated, isValid is null, or transition is pending
  if (!hasHydrated || isValid === null || isPending) {
    return (
      <div className="flex justify-center p-4 text-gray-500 font-medium animate-pulse">
        Preparing reservation form... ⏳
      </div>
    );
  }
  // بقیه رندرهای کامپوننت شما (فرم و استایل‌ها) اینجا قرار می‌گیرند.

  return (
    <form onSubmit={handleBookingSubmit} className="space-y-3 w-full" noValidate>
      {/* Full Name / Guest Name */}
      <div>
        <label className="block text-xs font-semibold text-blue-600 mb-1 ml-1">
          {isLoggedIn ? 'Guest Name' : 'Full Name'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              // Clear specific error if the field is being edited
              if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: undefined }));
            }}
            className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              formErrors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="John Smith"
          />
        </div>
        {/* Display error message if fullName validation failed */}
        {formErrors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.fullName}</p>}
      </div>

      {/* Email (Guest only) */}
      {!isLoggedIn && (
        <div>
          <label className="block text-xs font-semibold text-blue-600 mb-1 ml-1">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear specific error if the field is being edited
                if (formErrors.email) setFormErrors(prev => ({ ...prev, email: undefined }));
              }}
              className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="john.smith@example.com"
            />
          </div>
          {/* Display error message if email validation failed */}
          {formErrors.email && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.email}</p>}
        </div>
      )}

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-semibold text-blue-600 mb-1 ml-1">Phone Number</label>
        <div className="relative">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              // Clear specific error if the field is being edited
              if (formErrors.phoneNumber) setFormErrors(prev => ({ ...prev, phoneNumber: undefined }));
            }}
            className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
              formErrors.phoneNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        {/* Display error message if phoneNumber validation failed */}
        {formErrors.phoneNumber && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.phoneNumber}</p>}
      </div>

      {/* Password (Guest only) */}
      {!isLoggedIn && (
        <div>
          <label className="block text-xs font-semibold text-blue-600 mb-1 ml-1">Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // Clear specific error if the field is being edited
                if (formErrors.password) setFormErrors(prev => ({ ...prev, password: undefined }));
              }}
              className={`w-full pl-9 pr-9 py-2.5 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all ${
                formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="•••••••••••"
            />
          </div>
          {/* Display error message if password validation failed */}
          {formErrors.password && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.password}</p>}
        </div>
      )}

      {/* Display hook error */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-2 mt-4 animate-in fade-in">
          <p className="text-[11px] text-red-700 mt-0.5 leading-tight">{error}</p>
        </div>
      )}

      {/* Registration Required Info Box */}
      {!isLoggedIn && (
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start gap-2 mt-4">
          <div>
            <p className="text-xs font-semibold text-blue-900">Account Registration Required</p>
            <p className="text-[11px] text-blue-700 mt-0.5 leading-tight">
              Creating an account is mandatory. It allows you to safely track and manage your reservations.
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] 
            ${loading ? 'bg-blue-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 text-white'}`}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
}