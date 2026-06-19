import { useState } from 'react';

import { createReservationApi } from '@/entities/reservation/reservationApi';
import { useAuthStore } from '@/entities/session/useAuthStore';
import { registerUserApi } from '@/features/auth/api/registerUser';

export const useRegisterAndBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tokenFromStore = useAuthStore((state) => state.accessToken);
  const setToken = useAuthStore((state) => state.setToken);

  const execute = async (
    userData: { fullName: string; email: string; phone: string; password: string },
    bookingData: { hotelId: string; roomId: string; checkIn: string; checkOut: string }
  ) => {
    setLoading(true);
    setError(null);

    try {
      let currentToken = tokenFromStore;

      if (!currentToken) {
        const nameParts = userData.fullName.trim().split(' ');
        const name = nameParts[0] || 'Guest';
        const lastName = nameParts.slice(1).join(' ') || '-';

        const registerResponse = await registerUserApi({
          name,
          lastName,
          email: userData.email,
          password: userData.password,
        });

        currentToken = registerResponse.data?.accesstoken;
        if (!currentToken) throw new Error('TOKEN_ERROR');

        setToken(currentToken);
      }

        const reservationResponse = await createReservationApi(
        {
          roomId: bookingData.roomId,
          guestName: userData.fullName,
          guestPhone: userData.phone,
          checkInDate: bookingData.checkIn,
          checkOutDate: bookingData.checkOut,
          numberOfGuests: 2,
          specialRequests: 'Quick form booking',
        },
        currentToken
      );
      console.log('reservationResponse:', reservationResponse);
console.log('reservationData:', reservationResponse.data);
      return reservationResponse.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiError = err?.response?.data?.message;
      const status = err?.response?.status;
      const isBookingError = err?.response?.config?.url?.includes('reservations');

      if (err.message === 'TOKEN_ERROR') {
        setError('Account created, but we could not log you in. Please log in manually.');
      } else if (
        isBookingError &&
        status === 409
      ) {
        setError('This room is already booked for the selected dates.');
      } else if (
        status === 409 ||
        (apiError && typeof apiError === 'string' && apiError.toLowerCase().includes('exist'))
      ) {
        setError('This email is already registered. Please log in to complete your booking.');
      } else {
        setError(apiError || 'Something went wrong. Please check your details and try again.');
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
