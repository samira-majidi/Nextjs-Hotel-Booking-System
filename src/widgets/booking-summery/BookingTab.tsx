'use client';

import { useState } from 'react';

import { Reservation } from '@/entities/reservation/model/type';
import ReservationCard from '@/entities/reservation/ui/ReservationCard';

interface BookingsTabsProps {
  upcomingReservations: Reservation[];
  pastReservations: Reservation[];
}

export default function BookingsTabs({ upcomingReservations, pastReservations }: BookingsTabsProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex space-x-4 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
            activeTab === 'upcoming'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upcoming Trips
          {activeTab === 'upcoming' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-t-md" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`pb-4 px-2 text-lg font-medium transition-colors relative ${
            activeTab === 'past'
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Past Trips
          {activeTab === 'past' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-t-md" />
          )}
        </button>
      </div>

      {/* Tabs Content */}
      <div className="min-h-[300px]">
        {activeTab === 'upcoming' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {upcomingReservations.length > 0 ? (
              <div className="flex flex-col gap-6">
                {upcomingReservations.map((res) => (
                  <ReservationCard key={res.id} reservation={res} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p>You have no upcoming trips.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {pastReservations.length > 0 ? (
              <div className="flex flex-col gap-6 opacity-80 hover:opacity-100 transition-opacity">
                {pastReservations.map((res) => (
                  <ReservationCard key={res.id} reservation={res} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p>No past trips history.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
