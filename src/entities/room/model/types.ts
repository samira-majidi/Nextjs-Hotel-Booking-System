// به جای GalleryImage اسمش رو میذاریم GalleryImageDto
export interface GalleryImageDto {
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
export interface SimpleHotelDto {
  id: number;
  name: string;
  // اگر فیلدهای دیگه‌ای هم از هتل نیاز داری اینجا بنویس
}
// به جای Room اسمش رو میذاریم RoomDto
export interface RoomDto {
  id: string;
  roomNumber: string;
  type: string; // یا همون RoomType اگر ایمپورتش کنید
  basePrice: string; // چون بک‌اند استرینگ میده
  capacity: number;
  floor: number;
  status: string;
  description: string;
  galleryImages: GalleryImageDto[];
  createdAt: string;
  updatedAt: string;
  hotelId: number;
  hotel?: SimpleHotelDto; 
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiMeta {
  timestamp: string;
  path: string;
  version: string;
}

// تایپ نهایی
export interface PaginatedRoomsResponse {
  data: {
    data: RoomDto[];
    meta: PaginationMeta;
  };
  meta: ApiMeta;
}
