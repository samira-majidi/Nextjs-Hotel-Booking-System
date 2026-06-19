// --- shared/api/types.ts (یا هر جا که تایپ‌های عمومی رو میذاری) ---
export interface ApiMeta {
  timestamp: string;
  path: string;
  version: string;
}

export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta;
}

// --- entities/booking/model/types.ts ---

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  // معمولاً پسورد رو تو فرانت‌اند استفاده نمی‌کنیم، ولی چون بک‌اند فرستاده اینجا تعریفش می‌کنیم
  password?: string; 
}

export interface GalleryImage {
  id: number;
  name: string;
  path: string;
  type: string;
  mime: string;
  size: number;
  isAttached: boolean;
  uploadedById: number;
  createDate: string;
  updateDate: string;
}

export interface Hotel {
  id: number;
  name: string;
  cityId: number;
  phone: string;
  address: string;
  stars: number;
  description: string;
  owner: User;
  ownerId: number;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: 'SINGLE' | 'DOUBLE' | 'SUITE' | string; // می‌تونی تایپ‌های دقیق‌تر خودت رو بذاری
  basePrice: string;
  capacity: number;
  floor: number;
  status: 'AVAILABLE' | 'UNAVAILABLE' | string;
  description: string;
  galleryImages: GalleryImage[];
  createdAt: string;
  updatedAt: string;
  hotel: Hotel;
  hotelId: number;
}

export interface Reservation {
  id: string;
  room: Room;
  roomId: string;
  guestName: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED';
  expiresAt: string;
  paidAt: string | null;
  paymentId: string | null;
  specialRequests: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

// تایپ نهایی برای خروجی API
export type ReservationResponse = ApiResponse<Reservation>;
