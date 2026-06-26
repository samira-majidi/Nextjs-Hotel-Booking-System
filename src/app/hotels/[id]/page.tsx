import { fetchHotelById } from '@/entities/hotel/api/getHotelById';
import { HotelAbout } from '@/entities/hotel/ui/HotelAbout';
import { HotelAmenities } from '@/entities/hotel/ui/HotelAmenity';
import { HotelGallery } from '@/entities/hotel/ui/HotelGallery';
import { HotelInfo } from '@/entities/hotel/ui/HotelInfo';
import { HotelPolicies } from '@/entities/hotel/ui/HotelPolicy';
import { HotelTabs } from '@/entities/hotel/ui/HotelTabs';
import { fetchRoomsByHotelId } from '@/entities/room/Api/fetchRoomsByHotel';
import SearchForm from '@/features/search-hotel/ui/searchForm';
import { EditDatesBanner } from '@/shared/ui/EditDateBanner';
import HotelMap from '@/shared/ui/HotelMap';
import { HotelRoomsList } from '@/widgets/hotel-rooms/ui/HotelroomList';

interface HotelPageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelDetailsPage({ params }: HotelPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [hotelData, roomsData] = await Promise.all([
    fetchHotelById(id),
    fetchRoomsByHotelId(id),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 pb-20 relative">
      <HotelGallery images={hotelData.data.galleryImages || []} />
      
      {/* بخش اول: اطلاعات بالای صفحه */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <HotelInfo
          name={hotelData.data.name}
          stars={hotelData.data.stars}
          amenities={hotelData.data.amenities || []}
        />
      </div>

      {/* 💻 نوار جستجو - دسکتاپ */}
      <div className="my-6 hidden lg:block w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <SearchForm />
        </div>
      </div>

      {/* 📱 فرم جستجو - موبایل */}
      <div className="my-6 block lg:hidden w-full px-4">
        <EditDatesBanner>
           <SearchForm />
        </EditDatesBanner>
      </div>

      <HotelTabs />

      {/* بقیه محتوای صفحه */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ستون سمت چپ (محتوای اصلی) */}
          <div className="lg:col-span-2 space-y-12">
            
            <section id="about" className="scroll-mt-32">
              <HotelAbout description={hotelData.data.description} /> 
            </section>
            
            <section id="amenities" className="scroll-mt-32">
              <HotelAmenities amenities={hotelData.data.amenities} />
            </section>

            <section id="rooms" className="scroll-mt-32">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Available Rooms</h2>
              </div>
              <HotelRoomsList rooms={roomsData.data.data}/>
            </section>
          
          </div>
   {/* ستون سمت راست */}
          <div className="lg:col-span-1">
            {/* 🌟 تغییر: space-y-6 تبدیل شد به space-y-12 تا فاصله‌ی بین قوانین و نقشه بیشتر بشه */}
            <div className="space-y-12 pb-32">
              
              <section id="rules" className="scroll-mt-32">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
                  <HotelPolicies />
                </div>
              </section>

              <section id="location" className="scroll-mt-32">
                <HotelMap 
                  address={hotelData.data.address || 'آدرس ثبت نشده'} 
                  city={hotelData.data.city?.name || 'تهران'} 
                />
              </section>
              
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
