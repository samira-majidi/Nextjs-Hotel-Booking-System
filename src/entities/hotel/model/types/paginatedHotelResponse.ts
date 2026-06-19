import { Hotel } from "./hotelcard";
import { PaginationMeta } from "./paginationMeta";
import { ResponseMeta } from "./response";

export interface PaginatedHotelResponse {
  data: {
    data: Hotel[];
    meta: PaginationMeta;
  };
  meta: ResponseMeta
}