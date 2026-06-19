"use client";

import { motion } from "framer-motion";
import { Building2, Globe2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Secure & Seamless Booking",
      description: "Experience peace of mind with our state-of-the-art secure payment systems and dedicated 24/7 customer support. We ensure that every step of your reservation process is effortless, transparent, and completely protected.",
      image: "/aboutsecurity (2).png"
    },
    {
      id: 2,
      icon: Building2,
      title: "Curated Premium Stays",
      description: "We meticulously handpick every hotel and accommodation to guarantee an unparalleled experience. From luxurious modern suites to charming traditional Persian guesthouses.",
      image: "/aboutroom.png"
    },
    {
      id: 3,
      icon: Globe2,
      title: "Comprehensive Coverage",
      description: "No matter where your wanderlust takes you in Iran, we are there. Explore the ancient magnificent streets of Isfahan, or the serene poetry of Shiraz, knowing we have the perfect stay waiting for you.",
      image: "/about.png"
    }
  ];

  return (
    // پدینگ‌های اضافی رو برداشتم تا container-main خودش مدیریت فاصله‌ها رو انجام بده
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16 overflow-hidden">
      {/* دقیقاً همون کلاسی که تو هدر (Navigation) استفاده کردی */}
      <div className="container-main">
        
        {/* هدر صفحه */}
        <div className="text-center mb-16 sm:mb-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight">
            Discover the Heart of <span className="text-blue-600">Persia</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-left sm:text-center">
            PersiaStay is your premier gateway to unforgettable journeys across Iran. 
            We blend modern convenience with authentic Persian hospitality to bring you 
            a curated selection of the finest stays and experiences.
          </p>
        </div>

        {/* بخش کارت‌ها */}
        <div className="flex flex-col gap-12 sm:gap-20 mb-20 sm:mb-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            // اگر زوج باشه (کارت 1 و 3) میره سمت چپ، اگر فرد باشه (کارت 2) میره سمت راست
            const alignmentClass = isEven ? "mr-auto" : "ml-auto";

            return (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                // عرض کارت‌ها در دسکتاپ 90 درصد تنظیم شده و با mr-auto/ml-auto جابجا میشن
                className={`w-full lg:w-[90%] ${alignmentClass} bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 flex flex-col ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'} items-center gap-6 sm:gap-8 lg:gap-12`}
              >
                
                {/* بخش تصویر */}
                <div className="w-full sm:w-1/2 relative h-48 sm:h-56 lg:h-[320px] rounded-2xl overflow-hidden group shrink-0">
                  <Image 
                    src={feature.image} 
                    alt={feature.title} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* بخش متن */}
                <div className="w-full sm:w-1/2 flex flex-col justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 mb-4 sm:mb-5 shadow-sm border border-emerald-100">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed text-left sm:text-justify">
                    {feature.description}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* دکمه Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center pb-12 sm:pb-16"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight">
            Ready to start an <span className="text-blue-600">unforgettable</span> journey?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-center px-2">
            The finest hotels and experiences are waiting for you. Let us help you discover the true magic of Persia.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center bg-blue-600 text-white rounded-2xl text-base sm:text-lg font-semibold py-3 px-8 sm:py-4 sm:px-12 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Back to Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
