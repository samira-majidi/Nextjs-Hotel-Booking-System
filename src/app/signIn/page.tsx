import Image from 'next/image';

import { SignInForm } from '@/features/auth/ui/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* بخش تصویر (سمت چپ) - فقط در مانیتورهای بزرگ نمایش داده می‌شود */}
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="/herroSignIn.webp"
          alt="Luxury Hotel Room"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* بخش فرم (سمت راست) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* لوگوی بالای فرم - می‌توانید از کامپوننت Logo خودتان استفاده کنید */}
          <div className="flex justify-center mb-8">
             <h1 className="text-2xl font-bold tracking-wider text-gray-800">
               LUXORA <span className="block text-xs font-normal text-gray-500 tracking-widest text-center mt-1">HOTEL COLLECTION</span>
             </h1>
          </div>
          
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
