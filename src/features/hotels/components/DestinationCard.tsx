import Image from 'next/image';

import { Destination } from '../types/destination';

interface Props {
  destination: Destination;
}

export default function DestinationCard({ destination }: Props) {
  return (
    <div className="group relative flex w-full cursor-pointer items-center rounded-2xl bg-white p-3 shadow-sm transition-all hover:shadow-md md:block md:h-[280px] md:w-[220px] md:flex-shrink-0 md:overflow-hidden md:p-0 md:shadow-none">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl md:absolute md:inset-0 md:h-full md:w-full md:rounded-none">
        <Image
          src={destination.imageSrc}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/20 to-transparent md:block" />
      </div>

      <div className="ml-4 flex flex-1 items-center justify-between md:absolute md:bottom-0 md:left-0 md:ml-0 md:w-full md:p-5">
        <div>
          <h3 className="text-base font-bold text-gray-900 md:text-lg md:text-white">
            {destination.name}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 md:text-sm md:text-gray-300">
            {destination.subtitle}
          </p>
        </div>

        <div className="text-right">
          <span className="hidden text-xs font-medium text-white md:block">
            {destination.hotelsCount} Hotels
          </span>
          <span className="text-gray-400 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
