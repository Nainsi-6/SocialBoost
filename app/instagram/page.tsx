
// 'use client';

// import { useState } from 'react';
// import { getServiceBySlug } from '@/lib/services-data';
// import PackageCard from '@/components/PackageCard';
// import { CheckCircle } from 'lucide-react';
// import { FaInstagram } from 'react-icons/fa';

// type TabType = 'all' | 'followers' | 'likes' | 'comments' | 'views';

// export default function InstagramPage() {
//   const [activeTab, setActiveTab] = useState<TabType>('all');
//   const service = getServiceBySlug('instagram');

//   if (!service) return null;

//   const filteredPackages = service.packages.filter((pkg) => {
//     if (activeTab === 'all') return true;
//     return pkg.quantityLabel.toLowerCase().includes(activeTab);
//   });

//   const tabs = [
//     { id: 'all', label: 'All', count: service.packages.length },
//     { id: 'followers', label: 'Followers', count: service.packages.filter(p => p.quantityLabel.includes('Followers')).length },
//     { id: 'likes', label: 'Likes', count: service.packages.filter(p => p.quantityLabel.includes('Likes')).length },
//     { id: 'comments', label: 'Comments', count: service.packages.filter(p => p.quantityLabel.includes('Comments')).length },
//     { id: 'views', label: 'Views', count: service.packages.filter(p => p.quantityLabel.includes('Views')).length },
//   ];

// return (
//   <div className="min-h-screen bg-slate-950 text-white">

//     {/* ===== FULL WIDTH HERO ===== */}
//    <section className="w-full bg-gradient-to-r from-[#7f1d9c] via-[#be185d] to-[#1e3a8a] py-6 px-5 md:px-10">

//   <div className="max-w-7xl mx-auto">

//     <div className="flex items-center gap-3">

//       <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center text-white text-xl">
//         <FaInstagram />
//       </div>

//       <div>
//         <p className="text-[10px] uppercase tracking-widest text-white/60">
//           {service.isOfferActive ? "Ramadan Special" : "Instagram Service"}
//         </p>

//         <h1 className="text-lg md:text-xl font-semibold">
//           Discover Instagram Plans
//         </h1>
//       </div>

//     </div>

//     {service.isOfferActive && (
//       <div className="mt-4 bg-black/40 border border-white/20 rounded-md px-4 py-2 flex items-center justify-between text-sm">
//         <span>🎉 Get Extra 10% Bonus Followers</span>
//         <span className="bg-pink-600 px-2 py-0.5 rounded-full text-xs">
//           LIVE
//         </span>
//       </div>
//     )}

//   </div>
// </section>
//     {/* ===== MAIN CONTENT CONTAINER ===== */}
//    <div className="max-w-[1400px] mx-auto px-8 py-10">

//       {/* ===== TABS ===== */}
//       <div className="flex gap-3 mb-8 border-b border-slate-800 pb-3 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id as TabType)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//               activeTab === tab.id
//                 ? "bg-pink-600 text-white"
//                 : "bg-slate-800 text-slate-300 hover:bg-slate-700"
//             }`}
//           >
//             {tab.label}
//             <span className="ml-2 text-xs bg-black/30 px-2 py-0.5 rounded-full">
//               {tab.count}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* ===== PACKAGES ===== */}
//       {filteredPackages.length > 0 ? (
//        <div className="flex flex-col gap-4">
//           {filteredPackages.map((pkg) => (
//             <PackageCard
//               key={pkg.id}
//               package={pkg}
//               serviceId={service.id}
//               serviceName={service.name}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20 text-slate-400">
//           No packages available
//         </div>
//       )}

//       {/* ===== HOW IT WORKS ===== */}
//       <section className="mt-16">
//         <h3 className="text-2xl font-semibold mb-8 text-center">
//           How It Works
//         </h3>

//         <div className="grid md:grid-cols-3 gap-6">
//           {[
//             { step: "1", title: "Choose Package", desc: "Select the package that suits your growth goals." },
//             { step: "2", title: "Provide Profile", desc: "Enter your Instagram profile link safely." },
//             { step: "3", title: "Get Results", desc: "Watch your engagement grow quickly." },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-slate-900 rounded-xl p-6 text-center border border-slate-800 hover:border-pink-500 transition"
//             >
//               <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-pink-600 flex items-center justify-center font-bold text-sm">
//                 {item.step}
//               </div>
//               <h4 className="text-base font-semibold mb-2">
//                 {item.title}
//               </h4>
//               <p className="text-slate-400 text-sm">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   </div>
// );
// }

'use client';

import { useState } from 'react';
import { getServiceBySlug } from '@/lib/services-data';
import PackageCard from '@/components/PackageCard';
import { FaInstagram } from 'react-icons/fa';

type TabType = 'all' | 'followers' | 'likes' | 'comments' | 'views';

export default function InstagramPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const service = getServiceBySlug('instagram');

  if (!service) return null;

  const filteredPackages = service.packages.filter((pkg) => {
    if (activeTab === 'all') return true;
    return pkg.quantityLabel.toLowerCase().includes(activeTab);
  });

  const tabs = [
    { id: 'all', label: 'All', count: service.packages.length },
    { id: 'followers', label: 'Followers', count: service.packages.filter(p => p.quantityLabel.includes('Followers')).length },
    { id: 'likes', label: 'Likes', count: service.packages.filter(p => p.quantityLabel.includes('Likes')).length },
    { id: 'comments', label: 'Comments', count: service.packages.filter(p => p.quantityLabel.includes('Comments')).length },
    { id: 'views', label: 'Views', count: service.packages.filter(p => p.quantityLabel.includes('Views')).length },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ===== HERO ===== */}
      <section className="w-full bg-gradient-to-r from-[#7f1d9c] via-[#be185d] to-[#1e3a8a] py-5 sm:py-6 px-4 sm:px-6">

        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black/30 flex items-center justify-center text-white text-lg sm:text-xl">
              <FaInstagram />
            </div>

            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60">
                {service.isOfferActive ? "Ramadan Special" : "Instagram Service"}
              </p>

              <h1 className="text-base sm:text-lg md:text-xl font-semibold">
                Discover Instagram Plans
              </h1>
            </div>
          </div>

          {service.isOfferActive && (
            <div className="mt-3 bg-black/40 border border-white/20 rounded-md px-3 sm:px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
              <span>🎉 Get Extra 10% Bonus Followers</span>
              <span className="bg-blue-600 px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                LIVE
              </span>
            </div>
          )}

        </div>
      </section>

      {/* ===== MAIN ===== */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ===== TABS ===== */}
        <div className="flex gap-2 sm:gap-3 mb-6 border-b border-slate-800 pb-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-[10px] sm:text-xs bg-black/30 px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ===== PACKAGES ===== */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              serviceId={service.id}
              serviceName={service.name}
            />
          ))}
        </div>

        {/* ===== HOW IT WORKS ===== */}
        <section className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">
            How It Works
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { step: "1", title: "Choose Package", desc: "Select the package that suits your growth goals." },
              { step: "2", title: "Provide Profile", desc: "Enter your Instagram profile link safely." },
              { step: "3", title: "Get Results", desc: "Watch your engagement grow quickly." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-xl p-5 sm:p-6 text-center border border-slate-800 hover:border-blue-500 transition"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-3 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs sm:text-sm">
                  {item.step}
                </div>
                <h4 className="text-sm sm:text-base font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
