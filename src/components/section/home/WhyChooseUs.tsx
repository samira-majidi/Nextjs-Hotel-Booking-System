import { 
  BadgeDollarSign, 
  HeadphonesIcon, 
  LockKeyhole, 
  ShieldCheck, 
  Tags, 
  Zap
} from 'lucide-react';
import React from 'react';

// 1. تعریف تایپ برای دیتای کارت‌ها
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// 2. دیتای استاتیک بخش ویژگی‌ها
const features: Feature[] = [
  {
    id: 1,
    title: 'Best Price Guaranteed',
    description: "We guarantee the best prices. Find a lower rate elsewhere? We'll match it.",
    icon: <BadgeDollarSign className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: 'Secure Payment',
    description: 'Your payment information is protected with bank-level security and encryption.',
    icon: <LockKeyhole className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: 'Instant Booking',
    description: 'Book your perfect stay in seconds with our fast and easy booking process.',
    icon: <Zap className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist you.',
    icon: <HeadphonesIcon className="w-8 h-8 text-blue-500" strokeWidth={1.5} />,
  },
  {
    id: 5,
    title: 'Verified Reviews',
    description: 'Read authentic reviews from verified guests to make informed decisions.',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />,
  },
  {
    id: 6,
    title: 'Special Deals',
    description: 'Access exclusive deals and discounts available only on Stayora.',
    icon: <Tags className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className=" hidden md:block py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* هدر بخش */}
      <div className="text-center mb-12">
        <h4 className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2">
          Why Choose Us?
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Perfect Stay, Guaranteed
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
          Experience the best in hospitality with our premium services and unbeatable value.
        </p>
      </div>

      {/* گرید کارت‌ها */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className="bg-white py-6 px-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
          >
            <div className="bg-gray-50/50 p-3 rounded-xl mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
