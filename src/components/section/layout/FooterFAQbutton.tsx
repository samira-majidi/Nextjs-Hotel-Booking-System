'use client';

import { HelpCircle } from 'lucide-react'; // ایمپورت آیکون علامت سوال
import { useState } from 'react';

import FAQmodal from '@/components/ui/FAQmodal';

export default function FooterFAQButton() {
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <>
      {/* دکمه‌ای که در دسکتاپ نمایش داده می‌شود (آبی رنگ با آیکون) */}
      <button 
        onClick={() => setIsFaqOpen(true)}
        className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        <HelpCircle size={18} strokeWidth={2.5} />
        FAQ
      </button>

      {/* مودال که با کلیک روی دکمه باز می‌شود */}
      <FAQmodal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </>
  );
}
