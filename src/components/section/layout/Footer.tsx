import { Mail, MapPin, Phone } from 'lucide-react'; 
import React from 'react';

import Logo from '../home/Logo';
import FooterFAQButton from './FooterFAQbutton';

const Footer = () => {
  return (
    // کاهش پدینگ بالا و پایین برای کم شدن ارتفاع کل فوتر
    <footer className="bg-[#111827] text-white pt-6 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* تغییر به 4 ستون در دسکتاپ و کاهش فاصله بین ستون‌ها */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          
          {/* ستون اول: لوگو و دکمه FAQ */}
          <div className="flex flex-col space-y-3">
            <div className="scale-75 md:scale-90 origin-left -ml-2">
              <Logo />
            </div>
          </div>

          {/* ستون دوم: متن توضیحات و شبکه‌های اجتماعی (در موبایل مخفی) */}
          <div className="hidden md:flex flex-col space-y-3">
             <div>
              <FooterFAQButton />
            </div>
           
            <div className="flex flex-wrap gap-2">
              <a href="#" aria-label="صفحه فیسبوک hotelBook" className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-gray-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="صفحه اینستاگرام hotelBook" className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-gray-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="صفحه توییتر hotelBook" className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-gray-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="کانال یوتیوب hotelBook" className="p-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-gray-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
             <p className="text-gray-400 text-xs leading-relaxed">
              Find your perfect stay with the best deals on hotels, homes, and unforgettable experiences around the world.
            </p>
            
          </div>

          {/* ستون سوم: لینک‌های سریع (در موبایل مخفی) */}
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold mb-3">QUICK LINKS</h3>
            <ul className="space-y-1.5">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs">Hotels</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs">Offers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs">Contact</a></li>
            </ul>
          </div>

          {/* ستون چهارم: تماس با ما */}
          <div>
            <h3 className="text-sm font-semibold mb-3">CONTACT</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-gray-400 text-xs">
                <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                <span>125 Travel St, Tehran<br/>Tehran, Iran</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <Phone size={14} className="text-gray-400 shrink-0" />
                <span dir="ltr">+98 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <Mail size={14} className="text-gray-400 shrink-0" />
                <span className="truncate">info@hotelbook.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* بخش کپی‌رایت و پرداخت */}
        <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © 2026 hotelBook. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <span className="text-gray-400 font-bold italic">VISA</span>
            <span className="text-gray-400 font-bold">mastercard</span>
            <span className="text-gray-400 font-bold italic">PayPal</span>
            <span className="text-gray-400 font-bold"> Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
