export interface Owner {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password?: string; // ⚠️ هشدار امنیتی: پایین‌تر توضیح دادم
  role: string;
}
