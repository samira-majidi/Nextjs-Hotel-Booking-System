'use client';

import { CreditCard, Lock } from 'lucide-react';
import React, { useState } from 'react';

// 👈 استور رو اینجا ایمپورت کنید
import { useBookingStore } from '@/store/useBookingStore'; 

import { confirmReservationPayment } from '../Api/confirmReservationPayment';

interface PaymentCheckoutProps {
  reservationId: string | number;
  onSuccess?: () => void;
}

export default function PaymentCheckout({ reservationId, onSuccess }: PaymentCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 👈 هر اطلاعاتی که از استور نیاز دارید رو اینجا استخراج کنید
  const { totalPrice, hotelName, roomName } = useBookingStore(); 

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await confirmReservationPayment(reservationId);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("مشکلی در پرداخت به وجود آمد. لطفا دوباره تلاش کنید.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* Payment Form */}
        <div className="md:col-span-7 lg:col-span-8 bg-white rounded-2xl shadow-[0_4px_24px_rgb(0,0,0,0.03)] p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <Lock className="w-6 h-6 text-gray-600" strokeWidth={2.5} />
              <h2 className="text-2xl font-bold text-gray-800">
                Complete Your Payment
              </h2>
            </div>

            <div className="flex items-center gap-1.5 ml-9">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-sm text-gray-400 font-medium">
                Secure Payment
              </span>
            </div>
            
            {/* 👈 نمونه استفاده از اطلاعات استور در UI */}
            {(hotelName || totalPrice) && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
                در حال پرداخت برای <strong>{roomName}</strong> در <strong>{hotelName}</strong>
              </div>
            )}
          </div>

          {/* Card Fields */}
          <div className="space-y-4">
            {/* ... بقیه کدهای مربوط به فیلدهای کارت (بدون تغییر) ... */}
            
            {/* Card Number */}
            <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
              <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">
                  Card number
                </span>
              </div>
              <div className="px-4 py-3 bg-white">
                <input
                  type="text"
                  defaultValue="4242 4242 4242 4242"
                  className="w-full outline-none text-lg text-gray-700 tracking-[0.15em] font-medium"
                />
              </div>
            </div>

            {/* Expiry + CVC */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all">
              <div className="w-1/2 border-r border-gray-200 p-4 bg-white">
                <label className="block text-sm text-gray-500 font-medium mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  defaultValue="MM / YY"
                  className="w-full outline-none text-gray-700 text-base"
                />
              </div>
              <div className="w-1/2 p-4 bg-white relative">
                <label className="block text-sm text-gray-500 font-medium mb-1">
                  CVC
                </label>
                <input
                  type="password"
                  defaultValue="123"
                  className="w-full outline-none text-gray-700 text-base tracking-widest"
                />
                <CreditCard className="w-5 h-5 text-gray-400 absolute right-4 bottom-4" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6">
            <p className="text-xs text-gray-400 font-medium mb-4">
              Powered by <span className="font-bold text-gray-600 text-sm">stripe</span>
            </p>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full text-white font-semibold text-lg py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]
                ${isProcessing 
                  ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-[#2563EB] to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-500/30'
                }`}
            >
              {/* 👈 حالا می‌تونید مبلغ رو هم روی دکمه نشون بدید */}
              {isProcessing 
                ? 'Processing... ⏳' 
                : `Pay Now ${totalPrice ? `(€${totalPrice})` : ''}`
              }
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
