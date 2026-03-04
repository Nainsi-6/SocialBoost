'use client';

import { useState } from 'react';
import { getAllServices } from '@/lib/services-data';
import ServiceCard from '@/components/ServiceCard';
import Banner from '@/components/Banner';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const services = getAllServices();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-900">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ===== BANNER ===== */}
      <div className="mt-3 sm:mt-4 px-3 sm:px-4">
        <Banner />
      </div>

      {/* ===== QUICK LINKS ===== */}
      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 px-3 sm:px-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg py-2 sm:py-3 text-center text-xs sm:text-sm text-emerald-700 font-medium hover:bg-emerald-100 transition cursor-pointer">
          📱 24x7 Customer Support →
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg py-2 sm:py-3 text-center text-xs sm:text-sm text-amber-700 font-medium hover:bg-amber-100 transition cursor-pointer">
          ▶ Watch Video — How To Buy
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <section className="mt-10 sm:mt-14 px-3 sm:px-6 md:px-10 lg:px-16">

        <div className="text-center mb-6 sm:mb-10">
          <p className="text-[10px] sm:text-xs tracking-widest text-amber-600 mb-2 font-semibold">
            EXPLORE OUR SERVICES
          </p>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">
            Choose Your Social Platform
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </section>

      {/* ===== TRUST SECTION ===== */}
      <div className="mt-10 sm:mt-12 px-3 sm:px-4 pb-10 sm:pb-12">

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">

          <h3 className="text-base sm:text-lg font-bold text-center mb-4 sm:mb-6 text-gray-800">
            Why Choose SocialBoost?
          </h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              { icon: '⚡', title: 'Super Fast', desc: 'Delivery within 24 hours' },
              { icon: '✅', title: 'Safe & Secure', desc: 'No passwords required' },
              { icon: '💰', title: 'Best Prices', desc: 'Affordable packages' },
              { icon: '🎯', title: 'Real Engagement', desc: 'Genuine interactions' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-3 sm:p-4 rounded-lg bg-amber-50/60 border border-amber-100 hover:shadow-md transition"
              >
                <div className="text-lg sm:text-2xl mb-1 sm:mb-2">
                  {item.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-semibold mb-1 text-gray-800">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}