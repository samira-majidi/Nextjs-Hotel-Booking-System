import '@/styles/global.css';

import type { Metadata } from 'next';

import Footer from '@/components/section/layout/Footer';
import Navigation from '@/components/section/layout/Navigation';

export const metadata: Metadata = {
  title: 'hotelBook',
  description:
    'Comprehensive platform for searching, comparing, and booking hotels online at the best prices',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
     
      <body className="flex flex-col min-h-screen">
        <header>
          <Navigation />
        </header>

      
        <main className="flex-grow">
          {children}
        </main>

      
        <Footer />
      </body>
    </html>
  );
}
