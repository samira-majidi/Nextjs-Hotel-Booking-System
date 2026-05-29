'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// دیتای سوالات متداول
const faqData = [
  { question: "What is your cancellation policy?", answer: "Cancellation policies vary by property. Most bookings offer free cancellation up to 24-48 hours before check-in." },
  { question: "How do I change or modify my booking?", answer: "You can modify your booking through your account dashboard or by contacting our support team directly." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards including Visa, Mastercard, and American Express, as well as PayPal and Apple Pay." },
  { question: "Is breakfast included in the room rate?", answer: "Breakfast inclusion depends on the specific hotel and room type you select. This will be clearly stated during the booking process." },
  { question: "Are pets allowed in the hotels?", answer: "Pet policies vary by property. You can filter your search results to show only pet-friendly accommodations." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // با اضافه کردن md:hidden این بخش در دسکتاپ کاملاً مخفی می‌شود
    <section className="md:hidden w-full max-w-5xl mx-auto px-4 my-16">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                isOpen ? 'border-blue-100 bg-blue-50/30 shadow-sm' : 'border-gray-200 bg-white'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className={`font-medium pr-4 text-sm ${isOpen ? 'text-blue-600' : 'text-gray-700'}`}>
                  {item.question}
                </span>
                {isOpen ? (
                  <ChevronUp size={18} className="text-blue-600 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 shrink-0" />
                )}
              </button>
              <div className={`px-4 pb-4 text-gray-600 text-sm leading-relaxed ${isOpen ? 'block' : 'hidden'}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
