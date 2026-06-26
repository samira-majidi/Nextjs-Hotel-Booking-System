import '@/styles/global.css';

//import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// آدرس زیر رو بر اساس محلی که فایل رو ساختی تغییر بده
import ConditionalLayout from '@/widgets/layout/components/ConditionalLayout';
import Footer from '@/widgets/layout/ui/Footer';
import Navigation from '@/widgets/layout/ui/Navigation';

import Providers from './provider';

export const metadata: Metadata = {
  title: 'hotelBook',
  description:
    'Comprehensive platform for searching, comparing, and booking hotels online at the best prices',
};
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // این خیلی مهمه!
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="flex flex-col min-h-screen">
        {/* ۲. کامپوننت Providers رو دور کل بخش‌ها می‌پیچیم */}
        <Providers>
          {/* هدر رو با لایه شرطی می‌پوشونیم */}
          <ConditionalLayout>
            <header>
              <Navigation />
            </header>
          </ConditionalLayout>

          <main className="flex-grow">{children}</main>

          {/* فوتر رو هم با لایه شرطی می‌پوشونیم */}
          <ConditionalLayout>
            <Footer />
          </ConditionalLayout>
        </Providers>

      </body>
    </html>
  );
}
