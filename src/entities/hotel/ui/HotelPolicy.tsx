import { Ban, Clock, CreditCard, PawPrint } from 'lucide-react';
import React from 'react';

export function HotelPolicies() {
  const policies = [
    {
      id: 1,
      icon: <Clock className="w-5 h-5 text-emerald-500" />,
      title: "Check-in / Check-out",
      description: "Check-in from 14:00. Check-out until 12:00.",
    },
    {
      id: 2,
      icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
      title: "Cancellation",
      description: "Free cancellation up to 24 hours before check-in.",
    },
    {
      id: 3,
      icon: <Ban className="w-5 h-5 text-emerald-500" />,
      title: "Smoking Policy",
      description: "Strictly non-smoking in all rooms and indoor areas.",
    },
    {
      id: 4,
      icon: <PawPrint className="w-5 h-5 text-emerald-500" />,
      title: "Pets",
      description: "Pets are not allowed, sorry for the inconvenience.",
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">
        Hotel Policies
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
        {policies.map((policy) => (
          <div key={policy.id} className="flex items-start gap-4">
            <div className="mt-1 shrink-0">
              {policy.icon}
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-900">
                {policy.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {policy.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
