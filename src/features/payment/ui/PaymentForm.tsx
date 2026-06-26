'use client';

import { 
  Calendar, 
  CreditCard, 
  HelpCircle, 
  Loader2, 
  Lock, 
  ShieldCheck, 
  User} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { clearReservationsCache } from '@/shared/services/actions/cache';
import { useBookingStore } from '@/store/useBookingStore'; 

import { confirmReservationPayment } from '../Api/confirmReservationPayment';

interface PaymentCheckoutProps {
  reservationId: string | number;
  onSuccess?: () => void;
}

export default function PaymentCheckout({ reservationId, onSuccess }: PaymentCheckoutProps) {
  const router = useRouter(); 
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const { totalPrice} = useBookingStore(); 

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); 
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim(); 
    if (value.length <= 16) setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      setExpiry(`${value.slice(0, 2)} / ${value.slice(2)}`);
    } else {
      setExpiry(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) setCvv(value);
  };
const handlePayment = async () => {
    setIsProcessing(true);
    try {
       await confirmReservationPayment(reservationId);
    
      // ۱. اول کش سرور رو پاک می‌کنیم
      await clearReservationsCache();
      
      // ۲. این خط رو اضافه کن تا کش کلاینت هم رفرش بشه
      router.refresh(); 
      
      // ۳. هدایت به صفحه موفقیت
      router.push('/success'); 
    } catch (error) {
      console.error("Payment failed:", error);
      alert("An error occurred during payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    
      <div className="w-full max-w-[550px] bg-[#F8FAFC]/80 border border-slate-200 rounded-2xl p-6 shadow-sm">
        
        {/* هدر و لوگوهای پرداخت */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 mb-1">Payment Details</h1>
            <p className="text-sm font-medium text-slate-400">Complete your payment securely</p>
          </div>
          <div className="flex gap-2.5 items-center pt-1.5">
            <span className="text-blue-800 font-bold text-sm italic tracking-tighter">VISA</span>
            <div className="relative w-7 h-5 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full absolute left-0 opacity-90 mix-blend-multiply"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full absolute right-0 opacity-90 mix-blend-multiply"></div>
            </div>
            <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">AMEX</span>
            <span className="font-semibold text-sm flex items-center gap-0.5"><span className="text-lg"></span>Pay</span>
          </div>
        </div>

        <div className="space-y-4">
          
          {/* بخش اطلاعات کارت */}
          <div>
            <label className="block text-[13px] font-bold text-slate-800 mb-2">
              Card Information
            </label>
            <div className="space-y-3">
              
              {/* شماره کارت */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <CreditCard className="w-5 h-5 text-gray-400 stroke-[1.5]" />
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl outline-none focus:border-slate-500 transition-colors text-sm text-slate-700 font-medium placeholder:text-gray-400 shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-gray-400 stroke-[1.5]" />
                </div>
              </div>

              {/* تاریخ انقضا و CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400 stroke-[1.5]" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM / YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl outline-none focus:border-slate-500 transition-colors text-sm text-slate-700 font-medium placeholder:text-gray-400 shadow-sm"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-4 h-4 text-gray-400 stroke-[1.5]" />
                  </div>
                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="CVC"
                    value={cvv}
                    onChange={handleCvvChange}
                    maxLength={4}
                    className="w-full pl-11 pr-12 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl outline-none focus:border-slate-500 transition-colors text-sm text-slate-700 font-medium placeholder:text-gray-400 shadow-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer">
                    <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* نام دارنده کارت */}
          <div>
            <label className="block text-[13px] font-bold text-slate-800 mb-2">
              Cardholder Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400 stroke-[1.5]" />
              </div>
              <input
                type="text"
                placeholder="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 hover:border-gray-300 rounded-xl outline-none focus:border-slate-500 transition-colors text-sm text-slate-700 font-medium placeholder:text-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* باکس امنیت پرداخت */}
          <div className="bg-[#EEF5F0] border border-[#DFF0E6] rounded-2xl p-3 flex items-start gap-3 mt-1">
            <div className="bg-[#D1E6DA] p-2 rounded-full shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#1A4F31] stroke-[2]" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-slate-800 mb-0.5">Your payment is secure</h3>
              <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                We use 256-bit SSL encryption to protect your personal and payment information.
              </p>
            </div>
          </div>

          {/* دکمه پرداخت */}
          <div className="pt-2 pb-2">
            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className={`relative w-full flex justify-center items-center gap-2 text-white font-bold text-base py-3.5 rounded-xl transition-all active:scale-[0.98]
                ${isProcessing 
                  ? 'bg-blue-400 cursor-not-allowed opacity-80' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay €{totalPrice || '0.00'}
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    
  );
}
