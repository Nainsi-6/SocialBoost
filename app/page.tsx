// 'use client';

// import { useState } from 'react';
// import { getAllServices } from '@/lib/services-data';
// import ServiceCard from '@/components/ServiceCard';
// import Banner from '@/components/Banner';
// import Sidebar from '@/components/Sidebar';

// export default function Home() {
//   const services = getAllServices();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen text-gray-900">

//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

//       {/* ===== BANNER ===== */}
//       <div className="mt-3 sm:mt-4 px-3 sm:px-4">
//         <Banner />
//       </div>

//       {/* ===== QUICK LINKS ===== */}
//       <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 px-3 sm:px-4">
//         <div className="bg-emerald-50 border border-emerald-200 rounded-lg py-2 sm:py-3 text-center text-xs sm:text-sm text-emerald-700 font-medium hover:bg-emerald-100 transition cursor-pointer">
//           📱 24x7 Customer Support →
//         </div>
//         <div className="bg-amber-50 border border-amber-200 rounded-lg py-2 sm:py-3 text-center text-xs sm:text-sm text-amber-700 font-medium hover:bg-amber-100 transition cursor-pointer">
//           ▶ Watch Video — How To Buy
//         </div>
//       </div>

//       {/* ===== SERVICES ===== */}
//       <section className="mt-10 sm:mt-14 px-3 sm:px-6 md:px-10 lg:px-16">

//         <div className="text-center mb-6 sm:mb-10">
//           <p className="text-[10px] sm:text-xs tracking-widest text-amber-600 mb-2 font-semibold">
//             EXPLORE OUR SERVICES
//           </p>
//           <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">
//             Choose Your Social Platform
//           </h2>
//         </div>

//         <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
//           {services.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>

//       </section>

//       {/* ===== TRUST SECTION ===== */}
//       <div className="mt-10 sm:mt-12 px-3 sm:px-4 pb-10 sm:pb-12">

//         <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">

//           <h3 className="text-base sm:text-lg font-bold text-center mb-4 sm:mb-6 text-gray-800">
//             Why Choose SocialBoost?
//           </h3>

//           <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
//             {[
//               { icon: '⚡', title: 'Super Fast', desc: 'Delivery within 24 hours' },
//               { icon: '✅', title: 'Safe & Secure', desc: 'No passwords required' },
//               { icon: '💰', title: 'Best Prices', desc: 'Affordable packages' },
//               { icon: '🎯', title: 'Real Engagement', desc: 'Genuine interactions' },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="text-center p-3 sm:p-4 rounded-lg bg-amber-50/60 border border-amber-100 hover:shadow-md transition"
//               >
//                 <div className="text-lg sm:text-2xl mb-1 sm:mb-2">
//                   {item.icon}
//                 </div>
//                 <h4 className="text-xs sm:text-sm font-semibold mb-1 text-gray-800">
//                   {item.title}
//                 </h4>
//                 <p className="text-[10px] sm:text-xs text-gray-500">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { getAllServices } from '@/lib/services-data';
// import ServiceCard from '@/components/ServiceCard';
// import Banner from '@/components/Banner';
// import Sidebar from '@/components/Sidebar';

// export default function Home() {
//   const services = getAllServices();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-50 text-gray-900">
//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

//       {/* ===== HERO BANNER ===== */}
//       <div className="px-4 sm:px-6 pt-4 sm:pt-5">
//         <Banner />
//       </div>

//       {/* ===== QUICK ACTION STRIPS ===== */}
//       <div className="mt-3 px-4 sm:px-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
//         <div className="flex-1 bg-emerald-500/10 border border-emerald-200 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-700 font-semibold hover:bg-emerald-100 transition cursor-pointer">
//           <span>💬</span>
//           <span>24x7 Customer Support</span>
//           <span className="ml-auto text-emerald-500">→</span>
//         </div>
//         <div className="flex-1 bg-amber-500/10 border border-amber-200 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-700 font-semibold hover:bg-amber-100 transition cursor-pointer">
//           <span>▶</span>
//           <span>How To Buy — Watch Video</span>
//           <span className="ml-auto text-amber-500">→</span>
//         </div>
//       </div>

//       {/* ===== STATS STRIP ===== */}
//       <div className="mt-5 mx-4 sm:mx-6 bg-white border border-slate-200 rounded-2xl shadow-sm px-4 sm:px-8 py-4 grid grid-cols-3 divide-x divide-slate-100">
//         {[
//           { value: '50K+', label: 'Happy Customers' },
//           { value: '99%', label: 'Delivery Rate' },
//           { value: '24/7', label: 'Live Support' },
//         ].map((stat, i) => (
//           <div key={i} className="text-center px-2 sm:px-4">
//             <div className="text-lg sm:text-2xl font-bold text-indigo-600">{stat.value}</div>
//             <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* ===== SERVICES SECTION ===== */}
//       <section className="mt-8 sm:mt-10 px-4 sm:px-6">
//         <div className="flex items-center justify-between mb-4 sm:mb-6">
//           <div>
//             <p className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">
//               Our Services
//             </p>
//             <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-800">
//               Choose Your Platform
//             </h2>
//           </div>
//           <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
//             {services.length} platforms live
//           </div>
//         </div>

//         {/* Mobile: 2-col, Tablet: 3-col, Desktop: 4-col */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-4">
//           {services.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>
//       </section>

//       {/* ===== WHY CHOOSE US ===== */}
//       <section className="mt-8 sm:mt-10 px-4 sm:px-6 pb-10 sm:pb-14">
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-8">
//           <div className="text-center mb-5 sm:mb-7">
//             <p className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">
//               Why Us
//             </p>
//             <h3 className="text-base sm:text-xl font-bold text-slate-800">
//               Trusted by Thousands
//             </h3>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//             {[
//               { icon: '⚡', title: 'Super Fast', desc: 'Delivery within 24 hours', color: 'text-amber-500', bg: 'bg-amber-50' },
//               { icon: '🔒', title: 'Completely Safe', desc: 'No password required', color: 'text-indigo-500', bg: 'bg-indigo-50' },
//               { icon: '💯', title: 'Real Engagement', desc: 'Genuine interactions only', color: 'text-emerald-500', bg: 'bg-emerald-50' },
//               { icon: '💬', title: '24/7 Support', desc: 'Always here for you', color: 'text-rose-500', bg: 'bg-rose-50' },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="p-3 sm:p-5 rounded-xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all bg-slate-50/50"
//               >
//                 <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${item.bg} flex items-center justify-center text-xl sm:text-2xl mb-2 sm:mb-3`}>
//                   {item.icon}
//                 </div>
//                 <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-0.5">{item.title}</h4>
//                 <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { getAllServices } from '@/lib/services-data';
import ServiceCard from '@/components/ServiceCard';
import Banner from '@/components/Banner';
import Sidebar from '@/components/Sidebar';
import { Zap, ShieldCheck, BadgeCheck, Headphones } from "lucide-react";
export default function Home() {
  const services = getAllServices();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ===== HERO BANNER ===== */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-5">
        <Banner />
      </div>

      {/* ===== QUICK ACTION STRIPS ===== */}
      <div className="mt-3 px-4 sm:px-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="flex-1 bg-emerald-500/10 border border-emerald-200 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-700 font-semibold hover:bg-emerald-100 transition cursor-pointer">
          <span>💬</span>
          <span>24x7 Customer Support</span>
          <span className="ml-auto text-emerald-500">→</span>
        </div>
        <div className="flex-1 bg-amber-500/10 border border-amber-200 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-700 font-semibold hover:bg-amber-100 transition cursor-pointer">
          <span>▶</span>
          <span>How To Buy — Watch Video</span>
          <span className="ml-auto text-amber-500">→</span>
        </div>
      </div>

      {/* ===== STATS STRIP ===== */}
      <div className="mt-5 mx-4 sm:mx-6 bg-white border border-slate-200 rounded-2xl shadow-sm px-4 sm:px-8 py-4 grid grid-cols-3 divide-x divide-slate-100">
        {[
          { value: '50K+', label: 'Happy Customers' },
          { value: '99%', label: 'Delivery Rate' },
          { value: '24/7', label: 'Live Support' },
        ].map((stat, i) => (
          <div key={i} className="text-center px-2 sm:px-4">
            <div className="text-lg sm:text-2xl font-bold text-indigo-600">{stat.value}</div>
            <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <section className="mt-8 sm:mt-10 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">
              Our Services
            </p>
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-slate-800">
              Choose Your Platform
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            {services.length} platforms live
          </div>
        </div>

        {/* Mobile/Tablet: 1-col list, Desktop: grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
{/* ===== WHY CHOOSE US ===== */}
{/* ===== WHY CHOOSE US ===== */}
<section className="mt-10 sm:mt-20 px-4 sm:px-6 pb-10 sm:pb-14">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-6 sm:mb-12">
      <p className="text-[15px] sm:text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-1">
        Why Choose Us
      </p>
{/* 
      <h3 className="text-base sm:text-xl font-bold text-slate-800">
        Trusted by Thousands
      </h3> */}

      <p className="hidden sm:block text-sm text-slate-500 mt-2 max-w-xl mx-auto">
        Fast delivery, secure services and real engagement for your social growth.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">

      {[
        {
          icon: Zap,
          title: "Fast Delivery",
          desc: "Orders start instantly and deliver quickly",
          bg: "bg-amber-50",
          color: "text-amber-500"
        },
        {
          icon: ShieldCheck,
          title: "100% Safe",
          desc: "No password required for any service",
          bg: "bg-indigo-50",
          color: "text-indigo-500"
        },
        {
          icon: BadgeCheck,
          title: "Real Engagement",
          desc: "High quality genuine interactions",
          bg: "bg-emerald-50",
          color: "text-emerald-500"
        },
        {
          icon: Headphones,
          title: "24/7 Support",
          desc: "Our support team is always ready",
          bg: "bg-rose-50",
          color: "text-rose-500"
        },
      ].map((item, idx) => {
        const Icon = item.icon;

        return (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-6 text-center hover:shadow-md transition-all duration-300"
          >
            <div className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 flex items-center justify-center rounded-md sm:rounded-lg ${item.bg}`}>
              <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${item.color}`} />
            </div>

            <h4 className="font-semibold text-slate-800 text-xs sm:text-base">
              {item.title}
            </h4>

            {/* hide long text on mobile */}
            <p className="hidden sm:block text-sm text-slate-500 mt-1">
              {item.desc}
            </p>

          </div>
        );
      })}

    </div>

  </div>
</section>

{/* ===== FOOTER ===== */}
<footer className="border-t border-slate-200 bg-white py-4 sm:py-6">
  <div className="text-center text-xs sm:text-sm text-slate-500">
    © {new Date().getFullYear()} SocialBoost. All rights reserved.
  </div>
</footer>
   
    </div>
  );
}
