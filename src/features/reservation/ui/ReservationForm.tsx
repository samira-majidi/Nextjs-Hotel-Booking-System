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

interface ReservationFormProps {
  onSuccess?: (reservationId: string | number) => void;
}

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
      setTimeout(() => {
        alert('Invalid booking details! Please try again.');
      }, 0);
      router.back();
    }
  }, [router, setBookingDetails]);

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

    const reservation = await execute(
      { fullName, email, phone: phoneNumber, password },
      currentBookingDetails
    );

    if (reservation?.id) {
       setReservationId(reservation.id);
      if (onSuccess) {
        onSuccess(reservation.id);
      } else {
        router.replace('/success');
      }
    } else if (error) {
      alert(`Booking failed: ${error}`);
    }
  };

  if (!hasHydrated || isValid === null || isPending) {
    return (
      <div className="flex justify-center p-4 text-gray-500 font-medium animate-pulse">
        Preparing reservation form... ⏳
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC]/80 backdrop-blur-xl rounded-[2rem] p-5 sm:p-6 border border-white/50 w-full">
      <div className="mb-3">
        <h2 className="text-2xl font-semibold text-gray-900">Guest Details</h2>
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-1" noValidate>
        {/* Full Name / Guest Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
            {isLoggedIn ? 'Guest Name' : 'Full Name'}
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: undefined }));
            }}
            className={`w-full px-4 py-2 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
              formErrors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
            }`}
            placeholder="John Doe"
          />
          {formErrors.fullName && <p className="text-red-500 text-sm mt-1.5 ml-1">{formErrors.fullName}</p>}
        </div>

        {/* Email (Guest only) */}
        {!isLoggedIn && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formErrors.email) setFormErrors(prev => ({ ...prev, email: undefined }));
              }}
              className={`w-full px-4 py-2 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
                formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
              }`}
              placeholder="john.smith@example.com"
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1.5 ml-1">{formErrors.email}</p>}
          </div>
        )}

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (formErrors.phoneNumber) setFormErrors(prev => ({ ...prev, phoneNumber: undefined }));
            }}
            className={`w-full px-4 py-2 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
              formErrors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1.5 ml-1">{formErrors.phoneNumber}</p>}
        </div>

        {/* Password (Guest only) */}
        {!isLoggedIn && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formErrors.password) setFormErrors(prev => ({ ...prev, password: undefined }));
              }}
              className={`w-full px-4 py-2 rounded-xl border bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow ${
                formErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
              }`}
              placeholder="••••••••••"
            />
            {formErrors.password && <p className="text-red-500 text-sm mt-1.5 ml-1">{formErrors.password}</p>}
          </div>
        )}

        {/* Display hook error */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-2 mt-4">
            <p className="text-sm text-red-700 leading-tight">{error}</p>
          </div>
        )}

        {/* 👇 تغییر رنگ پس‌زمینه و متن‌ها به تناژ سبز (emerald) */}
        {!isLoggedIn && (
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 mt-4">
            <h4 className="text-sm font-semibold text-emerald-900 mb-1">Account Registration Required</h4>
            <p className="text-sm text-emerald-700/80">
              Creating an account is mandatory. It allows you to safely track and manage your reservations.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-5 text-white font-semibold text-lg py-3 rounded-xl transition-all duration-200 active:scale-[0.98] ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed shadow-none' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20'
          }`}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
