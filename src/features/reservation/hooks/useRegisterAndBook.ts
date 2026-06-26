import { useState } from 'react';

import { createReservationApi } from '@/entities/reservation/reservationApi';
import { useAuthStore } from '@/entities/session/useAuthStore';
import { registerUserApi } from '@/features/auth/api/registerUser';
import { signInApi } from '@/features/auth/api/signIn';

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

      // 1. If the user doesn't have a token, they are a guest and need to register/login
      if (!currentToken) {
        const nameParts = userData.fullName.trim().split(' ');
        const name = nameParts[0] || 'Guest';
        const lastName = nameParts.slice(1).join(' ') || '-';

        try {
          // Attempt to register the user
          const registerResponse = await registerUserApi({
            name,
            lastName,
            email: userData.email,
            password: userData.password,
          });
          currentToken = registerResponse.data?.accesstoken;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (regErr: any) {
          const status = regErr?.response?.status;
          const apiError = regErr?.response?.data?.message;
          const isEmailTaken = status === 409 || (typeof apiError === 'string' && apiError.toLowerCase().includes('exist'));

          // If the error is 409 (Conflict) or indicates the email already exists
          if (isEmailTaken) {
            try {
              // Fallback: Attempt to log in with the provided credentials
              const loginResponse = await signInApi({
                email: userData.email,
                password: userData.password,
              });
              currentToken = loginResponse.data?.accesstoken;
            } catch {
              // If login fails (e.g., wrong password)
              throw new Error('WRONG_PASSWORD');
            }
          } else {
            // Throw any other registration errors to the main catch block
            throw regErr; 
          }
        }

        if (!currentToken) throw new Error('TOKEN_ERROR');
        
        // Save the newly acquired token (from either registration or login)
        setToken(currentToken);
      }

      // 2. Proceed with the reservation using the valid token
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

      return reservationResponse.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiError = err?.response?.data?.message;
      const status = err?.response?.status;
      const isBookingError = err?.response?.config?.url?.includes('reservations');

      // Handle specific error scenarios gracefully
      if (err.message === 'WRONG_PASSWORD') {
        setError('This email is already registered. Please log in with the correct password or use a different email.');
      } else if (err.message === 'TOKEN_ERROR') {
        setError('Account created, but automatic login failed. Please log in manually.');
      } else if (isBookingError && status === 409) {
        setError('This room is already booked for the selected dates.');
      } else {
        // Generic fallback error
        setError(apiError || 'Something went wrong. Please check your information and try again.');
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
