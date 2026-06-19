'use client';

import { useState } from 'react';

import DestinationCard from '../../../entities/destination/ui/DestinationCard';

interface DestinationProps {
  id: number;
  name: string;
  imageUrl: string;
  subtitle: string;
  hotelsCount: string;
}

interface PopularDestinationsProps {
  destinations: DestinationProps[];
}

export default function PopularDestinations({ destinations }: PopularDestinationsProps) {
  const [showAll, setShowAll] = useState(false);

  // حالا به جای دیتای استاتیک، از دیتایی که به عنوان prop اومده استفاده می‌کنیم
  const displayedDestinations = showAll ? destinations : destinations.slice(0, 4);

  return (
    <section className="w-full py-12 bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Popular Destinations
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-semibold text-blue-600"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
          <div className="hidden md:block md:w-1/4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Popular Destinations
            </h2>
            <h3 className="text-3xl font-bold text-gray-900 leading-snug mb-4">
              Explore Top <br /> Destinations in Iran
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Discover amazing places and find the perfect stay for your next trip.
            </p>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all"
            >
              {showAll ? 'Show Less' : 'View All Destinations'} <span>&gt;</span>
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-3/4 md:flex-row md:gap-6 md:overflow-x-auto md:pb-4 md:hide-scrollbar">
            {displayedDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
