export interface GalleryImage {
  id: number;
  name: string;
  path: string; // این همون URL عکسه که لازمش داریم
  type: string;
  mime: string;
  size: number;
  isAttached: boolean;
  uploadedById: number;
  createDate: string;
  updateDate: string;
}
