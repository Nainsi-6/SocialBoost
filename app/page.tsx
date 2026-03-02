// import { getAllServices } from '@/lib/services-data';
// import ServiceCard from '@/components/ServiceCard';
// import Banner from '@/components/Banner';
// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';

// export default function Home() {
//   const services = getAllServices();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-6 lg:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
//       {/* Dynamic Banner Carousel Section */}
//       <section className="mb-8 sm:mb-12 lg:mb-16 max-w-7xl mx-auto">
//         <Banner />
//       </section>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto">
//         {/* Section Title */}
//         <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
//           <p className="text-xs sm:text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wide">
//             Explore our services and their plans.
//           </p>
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
//             Choose Your Social Platform
//           </h2>
//         </div>

//         {/* Services Grid - Responsive for all screen sizes */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
//           {services.map((service) => (
//             <div key={service.id} className="h-auto sm:h-48">
//               <ServiceCard service={service} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Trust Section */}
//       <section className="mt-12 sm:mt-16 lg:mt-20 max-w-7xl mx-auto">
//         <div className="bg-gradient-to-r from-blue-900/50 to-slate-900/50 border border-blue-500/30 rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-12">
//           <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
//             Why Choose SocialBoost?
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//             {[
//               {
//                 icon: '⚡',
//                 title: 'Super Fast',
//                 desc: 'Delivery within 24 hours',
//               },
//               {
//                 icon: '✅',
//                 title: 'Safe & Secure',
//                 desc: 'No passwords required',
//               },
//               {
//                 icon: '💰',
//                 title: 'Best Prices',
//                 desc: 'Affordable packages',
//               },
//               {
//                 icon: '🎯',
//                 title: 'Real Engagement',
//                 desc: 'Genuine interactions',
//               },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="text-center p-3 sm:p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all"
//               >
//                 <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</div>
//                 <h4 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
//                 <p className="text-xs sm:text-sm text-slate-400">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


// import { getAllServices } from '@/lib/services-data';
// import ServiceCard from '@/components/ServiceCard';
// import Banner from '@/components/Banner';

// export default function Home() {
//   const services = getAllServices();

//   return (
//     <div className="relative min-h-screen bg-slate-950 overflow-hidden px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

//       {/* Background Glow */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />

//       {/* Banner Section */}
//       <section className="relative mb-12 lg:mb-20 max-w-7xl mx-auto">
//         <Banner />
//       </section>

//       {/* Services Section */}
//       <section className="relative max-w-7xl mx-auto">

//         {/* Section Title */}
//         <div className="mb-12 text-center">
//           <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">
//             Explore Our Services
//           </p>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
//             Choose Your Social Platform
//           </h2>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {services.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>
//       </section>

//       {/* Trust Section */}
//       <section className="relative mt-20 lg:mt-28 max-w-7xl mx-auto">
//         <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-14 shadow-xl">

//           <h3 className="text-2xl lg:text-3xl font-bold text-white mb-12 text-center">
//             Why Choose SocialBoost?
//           </h3>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: '⚡',
//                 title: 'Super Fast',
//                 desc: 'Delivery within 24 hours',
//               },
//               {
//                 icon: '✅',
//                 title: 'Safe & Secure',
//                 desc: 'No passwords required',
//               },
//               {
//                 icon: '💰',
//                 title: 'Best Prices',
//                 desc: 'Affordable packages',
//               },
//               {
//                 icon: '🎯',
//                 title: 'Real Engagement',
//                 desc: 'Genuine interactions',
//               },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="group text-center p-6 rounded-xl bg-slate-900/60 border border-white/10 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300"
//               >
//                 <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
//                   {item.icon}
//                 </div>

//                 <h4 className="font-semibold text-white mb-2">
//                   {item.title}
//                 </h4>

//                 <p className="text-sm text-slate-400">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { Menu } from 'lucide-react';
// import { getAllServices } from '@/lib/services-data';
// import ServiceCard from '@/components/ServiceCard';
// import Banner from '@/components/Banner';
// import Sidebar from '@/components/Sidebar';

// export default function Home() {
//   const services = getAllServices();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-950">

//       {/* ===== TOP HEADER ===== */}
//       <div className="border-b border-slate-800 bg-slate-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

//           {/* Left Logo */}
//           <div className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
//             ✨ SocialBoost
//           </div>

//           {/* Right Controls */}
//           <div className="flex items-center gap-6">

//             {/* ENG Toggle */}
//             <div className="flex items-center gap-2 text-sm text-slate-300">
//               <span>ENG</span>
//               <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
//                 <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
//               </div>
//             </div>

//             {/* Hamburger */}
//             <button
//               onClick={() => setIsOpen(true)}
//               className="p-2 rounded-md hover:bg-slate-800 transition"
//             >
//               <Menu size={22} className="text-white" />
//             </button>

//           </div>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

//       {/* ===== BANNER SECTION ===== */}
//    <div className="mt-8 px-4 sm:px-6 lg:px-8">
//   <Banner />
// </div>

//       {/* ===== SUPPORT BAR (Full Width Look) ===== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//         <div className="bg-green-500/20 border border-green-500/30 rounded-lg py-4 flex items-center justify-center gap-3 text-green-400 font-medium text-sm">
//           📱 24x7 Customer Support →
//         </div>
//       </div>

//       {/* ===== VIDEO BAR ===== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
//         <div className="bg-red-500/20 border border-red-500/30 rounded-lg py-4 flex items-center justify-center gap-3 text-red-400 font-medium text-sm">
//           ▶ Watch Video How To Buy
//         </div>
//       </div>

//       {/* ===== SERVICES SECTION ===== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

//         <div className="text-center mb-10">
//           <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-2">
//             Explore Our Services
//           </p>

//           <h2 className="text-3xl sm:text-4xl font-bold text-white">
//             Choose Your Social Platform
//           </h2>
//         </div>

//         {/* Compact Grid Like FameWala */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {services.map((service) => (
//             <ServiceCard key={service.id} service={service} />
//           ))}
//         </div>

//       </div>

//       {/* ===== TRUST SECTION ===== */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
//         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

//           <h3 className="text-2xl font-bold text-white mb-10 text-center">
//             Why Choose SocialBoost?
//           </h3>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: '⚡', title: 'Super Fast', desc: 'Delivery within 24 hours' },
//               { icon: '✅', title: 'Safe & Secure', desc: 'No passwords required' },
//               { icon: '💰', title: 'Best Prices', desc: 'Affordable packages' },
//               { icon: '🎯', title: 'Real Engagement', desc: 'Genuine interactions' },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="text-center p-5 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
//               >
//                 <div className="text-3xl mb-3">{item.icon}</div>
//                 <h4 className="text-lg font-semibold text-white mb-1">
//                   {item.title}
//                 </h4>
//                 <p className="text-sm text-slate-400">
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
// import { Menu } from 'lucide-react';
// import { getAllServices } from '@/lib/services-data';
// import ServiceCard from '@/components/ServiceCard';
// import Banner from '@/components/Banner';
// import Sidebar from '@/components/Sidebar';

// export default function Home() {
//   const services = getAllServices();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">

//       {/* ===== HEADER ===== */}
      

//       <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

//       {/* ===== BANNER (FULL WIDTH, LESS SPACE) ===== */}
//       <div className="mt-4 px-4">
//         <Banner />
//       </div>

//       {/* ===== SUPPORT + VIDEO (FULL WIDTH, SMALL HEIGHT) ===== */}
//       <div className="mt-4 space-y-3 px-4">

//         <div className="bg-green-600/15 border border-green-500/30 rounded-md py-3 text-center text-sm text-green-400 hover:bg-green-600/25 transition cursor-pointer">
//           📱 24x7 Customer Support →
//         </div>

//         <div className="bg-red-600/15 border border-red-500/30 rounded-md py-3 text-center text-sm text-red-400 hover:bg-red-600/25 transition cursor-pointer">
//           ▶ Watch Video How To Buy
//         </div>

//       </div>

//       {/* ===== SERVICES ===== */}
//       {/* ===== SERVICES ===== */}
// <section className="mt-14 px-6 md:px-10 lg:px-16">

//   {/* Section Header */}
//   <div className="text-center mb-10">
//     <p className="text-xs tracking-widest text-blue-400 mb-2">
//       EXPLORE OUR SERVICES
//     </p>

//     <h2 className="text-2xl md:text-3xl font-semibold">
//       Choose Your Social Platform
//     </h2>
//   </div>

//   {/* Grid */}
//   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     {services.map((service) => (
//       <ServiceCard key={service.id} service={service} />
//     ))}
//   </div>

// </section>

//       {/* ===== TRUST SECTION (COMPACT) ===== */}
//       <div className="mt-12 px-4 pb-12">

//         <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

//           <h3 className="text-lg font-semibold text-center mb-6">
//             Why Choose SocialBoost?
//           </h3>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { icon: '⚡', title: 'Super Fast', desc: 'Delivery within 24 hours' },
//               { icon: '✅', title: 'Safe & Secure', desc: 'No passwords required' },
//               { icon: '💰', title: 'Best Prices', desc: 'Affordable packages' },
//               { icon: '🎯', title: 'Real Engagement', desc: 'Genuine interactions' },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="text-center p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
//               >
//                 <div className="text-2xl mb-2">{item.icon}</div>
//                 <h4 className="text-sm font-semibold mb-1">
//                   {item.title}
//                 </h4>
//                 <p className="text-xs text-slate-400">
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
    <div className="min-h-screen bg-slate-950 text-white">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* ===== BANNER ===== */}
      <div className="mt-3 sm:mt-4 px-3 sm:px-4">
        <Banner />
      </div>

      {/* ===== SUPPORT + VIDEO ===== */}
      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 px-3 sm:px-4">

        <div className="bg-green-600/15 border border-green-500/30 rounded-md py-2 sm:py-3 text-center text-xs sm:text-sm text-green-400 hover:bg-green-600/25 transition cursor-pointer">
          📱 24x7 Customer Support →
        </div>

        <div className="bg-red-600/15 border border-red-500/30 rounded-md py-2 sm:py-3 text-center text-xs sm:text-sm text-red-400 hover:bg-red-600/25 transition cursor-pointer">
          ▶ Watch Video How To Buy
        </div>

      </div>

      {/* ===== SERVICES ===== */}
      <section className="mt-10 sm:mt-14 px-3 sm:px-6 md:px-10 lg:px-16">

        <div className="text-center mb-6 sm:mb-10">
          <p className="text-[10px] sm:text-xs tracking-widest text-blue-400 mb-2">
            EXPLORE OUR SERVICES
          </p>

          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold">
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

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6">

          <h3 className="text-base sm:text-lg font-semibold text-center mb-4 sm:mb-6">
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
                className="text-center p-3 sm:p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              >
                <div className="text-lg sm:text-2xl mb-1 sm:mb-2">
                  {item.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-semibold mb-1">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400">
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