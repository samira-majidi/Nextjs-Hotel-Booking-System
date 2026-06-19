import axios from 'axios';

const api = axios.create({
  // آدرس پایه رو از فایلی که تو قدم دوم ساختیم می‌خونه
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // این خط برای ارسال کوکی‌ها و توکن‌های احراز هویت واجبه
  withCredentials: true, 
});

export default api;
