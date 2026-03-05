// 'use client';

// import Link from 'next/link';
// import { Service } from '@/lib/types';
// import { ArrowRight } from 'lucide-react';
// import {
//   FaInstagram,
//   FaYoutube,
//   FaFacebook,
//   FaTiktok,
//   FaSpotify,
//   FaXTwitter,
// } from 'react-icons/fa6';

// function getPlatformIcon(slug: string) {
//   const base = "text-base sm:text-xl";

//   switch (slug) {
//     case 'instagram':
//       return <FaInstagram className={`${base} text-pink-600`} />;
//     case 'youtube':
//       return <FaYoutube className={`${base} text-red-600`} />;
//     case 'facebook':
//       return <FaFacebook className={`${base} text-blue-600`} />;
//     case 'tiktok':
//       return <FaTiktok className={`${base} text-gray-800`} />;
//     case 'twitter':
//       return <FaXTwitter className={`${base} text-sky-500`} />;
//     case 'spotify':
//       return <FaSpotify className={`${base} text-green-600`} />;
//     default:
//       return null;
//   }
// }

// export default function ServiceCard({ service }: { service: Service }) {
//   return (
//     <Link href={`/${service.slug}`} className="block group">
//       <div
//         className="
//           flex flex-col items-center justify-center text-center
//           p-3 sm:p-6
//           rounded-xl
//           bg-white
//           border border-gray-200
//           hover:shadow-lg
//           transition-all duration-300
//           hover:-translate-y-1
//         "
//       >
//         {/* ICON */}
//         <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${service.accentBgLight} mb-2 sm:mb-4`}>
//           {getPlatformIcon(service.slug)}
//         </div>

//         {/* TITLE */}
//         <h3 className="text-xs sm:text-lg font-semibold text-gray-800">
//           {service.name}
//         </h3>

//         {/* DESKTOP CONTENT ONLY */}
//         <div className="hidden sm:block">
//           <p className="text-gray-500 text-sm mt-2 mb-4">
//             {service.description}
//           </p>

//           <div className={`flex items-center justify-center gap-2 text-sm font-medium ${service.accentText}`}>
//             <span>View Plans</span>
//             <ArrowRight
//               size={16}
//               className="group-hover:translate-x-1 transition"
//             />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import { Service } from '@/lib/types';
// import { ArrowRight } from 'lucide-react';
// import {
//   FaInstagram,
//   FaYoutube,
//   FaFacebook,
//   FaSpotify,
//   FaXTwitter,
//   FaTelegram,
// } from 'react-icons/fa6';
// import { SiNetflix, SiAmazonprime } from 'react-icons/si';

// function getPlatformIcon(slug: string, size = 'text-xl sm:text-2xl') {
//   switch (slug) {
//     case 'instagram':
//       return <FaInstagram className={`${size} text-pink-500`} />;
//     case 'youtube':
//       return <FaYoutube className={`${size} text-red-500`} />;
//     case 'facebook':
//       return <FaFacebook className={`${size} text-blue-600`} />;
//     case 'twitter':
//       return <FaXTwitter className={`${size} text-slate-800`} />;
//     case 'spotify':
//       return <FaSpotify className={`${size} text-green-500`} />;
//     case 'telegram':
//       return <FaTelegram className={`${size} text-sky-500`} />;
//     case 'netflix':
//       return <SiNetflix className={`${size} text-red-600`} />;
//     case 'amazon-prime':
//       return <SiAmazonprime className={`${size} text-sky-500`} />;
//     default:
//       return <span className={size}>📦</span>;
//   }
// }

// export default function ServiceCard({ service }: { service: Service }) {
//   return (
//     <Link href={`/${service.slug}`} className="block group">
//       {/* ===== MOBILE / TABLET: Horizontal row card (like famewala list) ===== */}
//       <div className="xl:hidden flex items-center gap-3 sm:gap-4 bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-3 sm:py-4 hover:shadow-md hover:border-slate-300 transition-all duration-200">
//         {/* Icon */}
//         <div className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl ${service.accentBgLight} flex items-center justify-center`}>
//           {getPlatformIcon(service.slug)}
//         </div>

//         {/* Text */}
//         <div className="flex-1 min-w-0">
//           <h3 className="text-sm sm:text-base font-semibold text-slate-800 leading-tight">
//             {service.name}
//           </h3>
//           <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
//             {service.description}
//           </p>
//         </div>

//         {/* Plans button */}
//         <div className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r ${service.bgGradient} text-white flex items-center gap-1 group-hover:opacity-90 transition`}>
//           Plans
//           <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
//         </div>
//       </div>

//       {/* ===== DESKTOP XL: Compact vertical grid card ===== */}
//       <div className="hidden xl:flex flex-col items-center justify-center text-center bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200">
//         <div className={`w-11 h-11 rounded-xl ${service.accentBgLight} flex items-center justify-center mb-2.5`}>
//           {getPlatformIcon(service.slug, 'text-xl')}
//         </div>
//         <h3 className="text-sm font-semibold text-slate-800 mb-0.5">{service.name}</h3>
//         <p className="text-[10px] text-slate-400 mb-3 leading-tight line-clamp-2">{service.description}</p>
//         <div className={`text-[10px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${service.bgGradient} text-white flex items-center gap-1`}>
//           View Plans
//           <ArrowRight size={10} />
//         </div>
//       </div>
//     </Link>
//   );
// }


'use client';

import Link from 'next/link';
import { Service } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaSpotify,
  FaXTwitter,
  FaTelegram,
} from 'react-icons/fa6';
import { SiNetflix } from 'react-icons/si';

// Custom Amazon Prime icon (SiAmazonprime is barely visible — using custom SVG)
function AmazonPrimeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#00A8E1" />
      <text x="20" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="Arial, sans-serif">a</text>
    </svg>
  );
}

function getPlatformIcon(slug: string, size = 22) {
  switch (slug) {
    case 'instagram':   return <FaInstagram size={size} className="text-pink-500" />;
    case 'youtube':     return <FaYoutube size={size} className="text-red-500" />;
    case 'facebook':    return <FaFacebook size={size} className="text-blue-600" />;
    case 'twitter':     return <FaXTwitter size={size} className="text-slate-800" />;
    case 'spotify':     return <FaSpotify size={size} className="text-green-500" />;
    case 'telegram':    return <FaTelegram size={size} className="text-sky-500" />;
    case 'netflix':     return <SiNetflix size={size} className="text-red-600" />;
    case 'amazon-prime': return <AmazonPrimeIcon size={size} />;
    default:            return <span style={{ fontSize: size }}>📦</span>;
  }
}

function getBtnGradient(slug: string) {
  const map: Record<string, string> = {
    instagram:      'from-pink-500 to-purple-600',
    youtube:        'from-red-500 to-red-700',
    facebook:       'from-blue-500 to-blue-700',
    twitter:        'from-slate-600 to-slate-800',
    spotify:        'from-green-500 to-green-700',
    telegram:       'from-sky-400 to-cyan-600',
    netflix:        'from-red-600 to-red-900',
    'amazon-prime': 'from-sky-400 to-blue-600',
  };
  return map[slug] ?? 'from-indigo-500 to-indigo-700';
}

export default function ServiceCard({ service }: { service: Service }) {
  const btnGradient = getBtnGradient(service.slug);

  return (
    <Link href={`/${service.slug}`} className="block group">

      {/* ====== MOBILE / TABLET: full horizontal row ====== */}
      <div className="xl:hidden flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-3.5 sm:px-4 py-3 sm:py-3.5 hover:shadow-md hover:border-slate-300 transition-all duration-200 active:scale-[0.98]">

        {/* Icon */}
        <div className={`w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl ${service.accentBgLight} flex items-center justify-center`}>
          {getPlatformIcon(service.slug, 22)}
        </div>

        {/* Name + desc */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-[15px] font-bold text-slate-800 leading-snug">
            {service.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5 leading-tight">
            {service.description}
          </p>
        </div>

        {/* Plans button — ALWAYS fully visible */}
        <div className={`flex-shrink-0 bg-gradient-to-r ${btnGradient} text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition group-hover:opacity-90`}>
          Plans
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* ====== DESKTOP XL: compact vertical grid card ====== */}
      <div className="hidden xl:flex flex-col items-center justify-center text-center bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200">
        <div className={`w-12 h-12 rounded-xl ${service.accentBgLight} flex items-center justify-center mb-3`}>
          {getPlatformIcon(service.slug, 22)}
        </div>
        <h3 className="text-sm font-bold text-slate-800 mb-0.5">{service.name}</h3>
        <p className="text-[10px] text-slate-400 mb-3.5 leading-tight line-clamp-2 px-1">{service.description}</p>
        <div className={`text-[10px] font-bold px-3.5 py-1.5 rounded-full bg-gradient-to-r ${btnGradient} text-white flex items-center gap-1 shadow-sm`}>
          View Plans
          <ArrowRight size={10} />
        </div>
      </div>

    </Link>
  );
}
