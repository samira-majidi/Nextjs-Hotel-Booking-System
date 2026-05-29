'use client'; // چون از State استفاده می‌کنیم، در Next.js باید Client Component باشد

import { ChevronDown, ChevronUp,X } from 'lucide-react';
import React, { useState } from 'react';

// تعریف تایپ برای پراپ‌های مودال
interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// دیتای سوالات متداول (دقیقاً مطابق عکس)
const faqData = [
  {
    question: "What is your cancellation policy?",
    answer: "Cancellation policies vary by property. Most bookings offer free cancellation up to 24-48 hours before check-in. Please check the specific cancellation policy on the booking details page before confirming your reservation."
  },
  {
    question: "How do I change or modify my booking?",
    answer: "You can modify your booking through your account dashboard or by contacting our support team directly."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards including Visa, Mastercard, and American Express, as well as PayPal and Apple Pay."
  },
  {
    question: "Is breakfast included in the room rate?",
    answer: "Breakfast inclusion depends on the specific hotel and room type you select. This will be clearly stated during the booking process."
  },
  {
    question: "Are pets allowed in the hotels?",
    answer: "Pet policies vary by property. You can filter your search results to show only pet-friendly accommodations."
  }
];

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  // استیت برای مدیریت اینکه کدام سوال باز است (پیش‌فرض اولی باز است)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // اگر مودال بسته است، هیچی رندر نشود
  if (!isOpen) return null;

  // تابع تغییر وضعیت آکاردئون
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // بک‌گراند تاریک مودال
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* بدنه اصلی مودال */}
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* هدر مودال */}
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* لیست آکاردئون‌ها (محتوای مودال که اسکرول می‌خوره اگر طولانی بشه) */}
        <div className="p-6 pt-0 overflow-y-auto space-y-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? 'border-blue-100 bg-white shadow-sm' : 'border-gray-200 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                >
                  <span 
                    className={`font-medium pr-4 ${
                      isOpen ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={20} className="text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400 shrink-0" />
                  )}
                </button>
                
                {/* بخش جواب (با انیمیشن باز و بسته شدن) */}
                <div 
                  className={`px-4 pb-4 text-gray-500 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default FAQModal;
