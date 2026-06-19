'use client';

import { useState } from 'react';

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'rules', label: 'Rules' },
  { id: 'location', label: 'Location' },
];

export function HotelTabs() {
  const [activeTab, setActiveTab] = useState('about');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🌟 تغییرات: 
            1. space-x-6 برای موبایل و md:space-x-12 برای دسکتاپ/تبلت
            2. اضافه کردن کلاس‌های مخفی‌کننده اسکرول‌بار برای مرورگرهای مختلف
        */}
        <nav 
          className="flex space-x-6 md:space-x-12 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" 
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
