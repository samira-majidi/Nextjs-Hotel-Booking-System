// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

// ارث‌بری از تایپ‌های استاندارد دکمه در HTML تا همه ویژگی‌ها رو ساپورت کنه
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ 
  children, 
  className = "", 
  type = "button", // مقدار پیش‌فرض
  ...props 
}: ButtonProps) {
  return (
    <button
      type={type}
      // استایل‌های ثابت شما اینجا قرار دارن و className جدید هم به تهش اضافه میشه
      className={`bg-green-600 hover:bg-green-700 transition-colors text-white rounded-xl px-8 py-3.5 md:py-4 flex items-center justify-center gap-2 font-semibold w-full md:w-auto h-full shrink-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
