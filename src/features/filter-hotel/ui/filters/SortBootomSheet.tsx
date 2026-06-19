import React from 'react';

interface SortBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SortBottomSheet({ isOpen, onClose }: SortBottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      <div className="relative w-full bg-white rounded-t-3xl shadow-2xl flex flex-col animate-slide-up">
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center px-6 pb-4 pt-2 border-b border-gray-100">
          <h2 className="text-[18px] font-bold text-gray-900">Sort by</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex flex-col p-2">
          {['Recommended', 'Lowest price', 'Highest price', 'Top reviewed'].map((sortOption, idx) => (
            <label key={idx} className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 rounded-xl transition-colors mx-2">
              <span className="text-[15px] font-medium text-gray-700">{sortOption}</span>
              <input type="radio" name="sortMobile" className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-600" defaultChecked={idx === 0} />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
