import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookingState {
  // اطلاعات پایه رزرو
  hotelId: string | null;
  roomId: string | null;
  checkIn: string | null;
  checkOut: string | null;
  totalPrice?: number | null; 
  reservationId: string | number | null;
  
  // 👈 اطلاعات جدید برای صفحه Success
  hotelName: string | null;
  roomName: string | null;
  roomNumber: string | null;

  // اطلاعات فرم کاربر
  fullName: string;
  phoneNumber: string;

  // وضعیت هیدریشن برای Persist
  _hasHydrated: boolean;

  // اکشن‌ها
  setHasHydrated: (state: boolean) => void;
  setBookingDetails: (details: { 
    hotelId: string; 
    roomId: string; 
    checkIn: string; 
    checkOut: string; 
    totalPrice?: number | null;
    hotelName?: string | null;  // 👈 اضافه شد
    roomName?: string | null;   // 👈 اضافه شد
    roomNumber?: string | null; // 👈 اضافه شد
  }) => void;

  setReservationId: (id: string | number) => void;
  setFullName: (name: string) => void;
  setPhoneNumber: (phone: string) => void;
  clearBookingDetails: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      // مقادیر اولیه رزرو
      hotelId: null,
      roomId: null,
      checkIn: null,
      checkOut: null,
      totalPrice: null,
      reservationId: null,
      
      // 👈 مقادیر اولیه فیلدهای جدید
      hotelName: null,
      roomName: null,
      roomNumber: null,

      // مقادیر اولیه فرم کاربر
      fullName: '',
      phoneNumber: '',

      // مقدار اولیه هیدریشن
      _hasHydrated: false,

      // توابع آپدیت‌کننده
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      setBookingDetails: (details) => set((state) => ({
        ...state, // حفظ استیت‌های قبلی
        hotelId: details.hotelId,
        roomId: details.roomId,
        checkIn: details.checkIn,
        checkOut: details.checkOut,
        ...(details.totalPrice !== undefined && { totalPrice: details.totalPrice }),
        ...(details.hotelName !== undefined && { hotelName: details.hotelName }),
        ...(details.roomName !== undefined && { roomName: details.roomName }),
        ...(details.roomNumber !== undefined && { roomNumber: details.roomNumber }),
      })),
      
      setReservationId: (id) => set({ reservationId: id }),
      setFullName: (name) => set({ fullName: name }),
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),

      clearBookingDetails: () => set({
        hotelId: null,
        roomId: null,
        checkIn: null,
        checkOut: null,
        totalPrice: null,
        reservationId: null, 
        hotelName: null,  // 👈 ریست کردن فیلدهای جدید
        roomName: null,   // 👈 ریست کردن فیلدهای جدید
        roomNumber: null, // 👈 ریست کردن فیلدهای جدید
        fullName: '',
        phoneNumber: '',
      }),
    }),
    {
      name: 'booking-storage',
      // وقتی لود کردن اطلاعات از لوکال استوریج تموم میشه، این تابع اجرا میشه
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
