import React from 'react';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // 🆕 اضافه شدن عنوان دلخواه
  showFooter?: boolean; // 🆕 اضافه شدن شرط برای نمایش دکمه پایین
}

export default function FilterBottomSheet({ 
  isOpen, 
  onClose, 
  children,
  title = "Filters", // مقدار پیش‌فرض
  showFooter = true  // مقدار پیش‌فرض
}: FilterBottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col animate-slide-up">
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="flex justify-between items-center px-6 pb-4 pt-2 border-b border-gray-100">
          {/* 🆕 استفاده از تایتل داینامیک */}
          <h2 className="text-[18px] font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        
        {/* 🆕 شرطی کردن بخش فوتر (دکمه پایین) */}
        {showFooter && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <button onClick={onClose} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold rounded-xl transition-colors">
              Show results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
