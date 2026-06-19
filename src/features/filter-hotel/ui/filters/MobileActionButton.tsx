import React from 'react';

interface MobileActionButtonsProps {
  activeModal: 'filters' | 'sort' | null;
  setActiveModal: (modal: 'filters' | 'sort') => void;
}

export default function MobileActionButtons({ activeModal, setActiveModal }: MobileActionButtonsProps) {
  return (
    <div className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 flex justify-center">
      <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden">
        <button 
          onClick={() => setActiveModal('filters')}
          className={`flex items-center gap-2 px-6 py-2.5 text-[14px] font-medium transition-colors ${
            activeModal === 'filters' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </button>
        
        <div className="w-[1px] h-5 bg-gray-200"></div>
        
        <button 
          onClick={() => setActiveModal('sort')}
          className={`flex items-center gap-2 px-6 py-2.5 text-[14px] font-medium transition-colors ${
            activeModal === 'sort' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          Sort
        </button>
      </div>
    </div>
  );
}
