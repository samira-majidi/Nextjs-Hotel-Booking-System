import { Amenities } from "./amenities";
import { City } from "./city";
import { GalleryImage } from "./galleryImage";

export interface Hotel {
  id: number;
  name: string;
  city: City;
  cityId: number;
  phone: string; 
  minPrice : number;
  address: string;
  stars: number;
  description: string;
  amenities: Amenities[];
 
  ownerId: number;
  galleryImages: GalleryImage[];
}
