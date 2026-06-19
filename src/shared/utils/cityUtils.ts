import { popularDestinations } from "@/entities/destination/model/destination";
import { City } from "@/entities/hotel/model/types";

export function mergeCityData(apiCities: City[]) {
  return apiCities.map((city) => {
    // اینجا فقط نام شهرها رو با هم مقایسه می‌کنیم
    const staticData = popularDestinations.find((dest) =>
      dest.name.toLowerCase().includes(city.name.toLowerCase()),
    );

    return {
      id: city.id,
      name: city.name,
      imageUrl:
        city.imageUrl ||
        'https://s3.ir-thr-at1.arvanstorage.ir/hotel-reservation-images/mashhad-1780049289675-9e45d405-0b07-40b6-a8a4-bf3d9bd99450.png',
      subtitle: staticData?.subtitle || 'A Beautiful Destination',
      hotelsCount: staticData?.hotelsCount || '10+',
    };
  });
}
