export default function SearchForm() {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-8 text-left">
      <div className="bg-white rounded-2xl p-2 shadow-lg flex flex-col md:flex-row items-center gap-2 relative z-10 w-full">
        
        {/* جستجوی شهر */}
        <div className="flex items-center gap-3 px-4 py-2 flex-[1.2] w-full border-b md:border-b-0 md:border-r border-gray-200">
          <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <div className="flex flex-col w-full">
            <label className="text-xs text-gray-500 font-medium mb-0.5">Where are you going?</label>
            <input type="text" placeholder="Search city or hotel" className="text-sm text-gray-800 font-semibold focus:outline-none placeholder-gray-400 w-full bg-transparent" />
          </div>
        </div>

        {/* 🌟 بخش تاریخ‌ها (چک‌این و چک‌اوت کنار هم) 🌟 */}
        <div className="flex w-full flex-[1.5] border-b md:border-b-0 md:border-r border-gray-200">
          
          {/* Check-in */}
          <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 flex-1 border-r border-gray-200 w-1/2">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <div className="flex flex-col w-full overflow-hidden">
              <label className="text-xs text-gray-500 font-medium mb-0.5">Check-in</label>
              <input type="text" placeholder="May 24" className="text-sm text-gray-800 font-semibold focus:outline-none placeholder-gray-800 w-full bg-transparent truncate" />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 flex-1 w-1/2">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <div className="flex flex-col w-full overflow-hidden">
              <label className="text-xs text-gray-500 font-medium mb-0.5">Check-out</label>
              <input type="text" placeholder="May 26" className="text-sm text-gray-800 font-semibold focus:outline-none placeholder-gray-800 w-full bg-transparent truncate" />
            </div>
          </div>

        </div>

   
        <div className="flex items-center justify-between gap-3 px-4 py-2 flex-[1.2] w-full cursor-pointer group">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium mb-0.5">Guests</span>
              <span className="text-sm text-gray-800 font-semibold">2 Adults, 1 Room</span>
            </div>
          </div>
          <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

   
        <button className="bg-green-600 hover:bg-green-700 transition-colors text-white rounded-xl px-8 py-3.5 md:py-4 flex items-center justify-center gap-2 font-semibold w-full md:w-auto h-full shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search
        </button>
      </div>

      
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-5 text-sm font-medium text-white/90">
        <div className="flex items-center gap-1.5">
          {/* رنگ آیکون به text-green-400 تغییر کرد */}
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Best Price Guarantee
        </div>
        <div className="flex items-center gap-1.5">
          {/* رنگ آیکون به text-green-400 تغییر کرد */}
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Free Cancellation
        </div>
        <div className="flex items-center gap-1.5">
          {/* رنگ آیکون به text-green-400 تغییر کرد */}
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          Secure Booking
        </div>
      </div>
    </div>
  );
}
