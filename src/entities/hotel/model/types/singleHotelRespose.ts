import { Hotel } from "./hotelcard";
import { ResponseMeta } from "./response";

// تایپ مخصوص پاسخ یک هتل تک
export interface SingleHotelResponse {
  data: Hotel; // اینجا فقط یک هتل است، نه آرایه
  meta: ResponseMeta;
}
