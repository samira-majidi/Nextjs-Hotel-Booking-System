import '@/styles/global.css';

import type { Metadata } from 'next';

import Footer from '@/widgets/layout/ui/Footer';
import Navigation from '@/widgets/layout/ui/Navigation';

import Providers from './provider';

export const metadata: Metadata = {
  title: 'hotelBook',
  description:
    'Comprehensive platform for searching, comparing, and booking hotels online at the best prices',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="flex flex-col min-h-screen">
        {/* ۲. کامپوننت Providers رو دور کل بخش‌ها می‌پیچیم */}
        <Providers>
          <header>
            <Navigation />
          </header>

          <main className="flex-grow">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
