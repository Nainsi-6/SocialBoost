// 'use client';

// import { useState, useEffect } from 'react';
// import { getServiceBySlug } from '@/lib/services-data';
// import PackageCard from '@/components/PackageCard';
// import { useParams } from 'next/navigation';
// import {
//   FaInstagram,
//   FaYoutube,
//   FaFacebook,
//   FaTiktok,
//   FaSpotify,
//   FaXTwitter,
// } from 'react-icons/fa6';

// type TabType = 'all' | 'followers' | 'likes' | 'comments' | 'views';

// interface SpecialOffer {
//   id: string;
//   serviceSlug: string;
//   title: string;
//   badge: string;
//   active: boolean;
// }

// function getPlatformIcon(slug: string) {
//   switch (slug) {
//     case 'instagram': return <FaInstagram className="text-lg sm:text-xl" />;
//     case 'youtube': return <FaYoutube className="text-lg sm:text-xl" />;
//     case 'facebook': return <FaFacebook className="text-lg sm:text-xl" />;
//     case 'tiktok': return <FaTiktok className="text-lg sm:text-xl" />;
//     case 'twitter': return <FaXTwitter className="text-lg sm:text-xl" />;
//     case 'spotify': return <FaSpotify className="text-lg sm:text-xl" />;
//     default: return <span className="text-lg">📦</span>;
//   }
// }

// export default function ServicePage() {
//   const params = useParams();
//   const serviceName = params.serviceName as string;
//   const service = getServiceBySlug(serviceName);
//   const [activeTab, setActiveTab] = useState<TabType>('all');
//   const [offer, setOffer] = useState<SpecialOffer | null>(null);
//   const [offerLoading, setOfferLoading] = useState(true);

//   // Fetch special offer for this service
//   useEffect(() => {
//     if (!serviceName) return;

//     const fetchOffer = async () => {
//       try {
//         const res = await fetch(`/api/offers?service=${serviceName}`);
//         const data = await res.json();
//         if (data.success && data.data) {
//           setOffer(data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching offer:', err);
//       } finally {
//         setOfferLoading(false);
//       }
//     };

//     fetchOffer();
//   }, [serviceName]);

//   if (!service) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl text-gray-400 mb-4">Service not found</p>
//           <a href="/" className="text-amber-600 hover:text-amber-700 font-semibold">
//             Go back to home
//           </a>
//         </div>
//       </div>
//     );
//   }

//   const hasFollowers = service.packages.some(p => p.quantityLabel.toLowerCase().includes('followers'));
//   const hasLikes = service.packages.some(p => p.quantityLabel.toLowerCase().includes('likes'));
//   const hasComments = service.packages.some(p => p.quantityLabel.toLowerCase().includes('comments'));
//   const hasViews = service.packages.some(p => p.quantityLabel.toLowerCase().includes('views'));

//   const tabs = [
//     { id: 'all' as TabType, label: 'All', count: service.packages.length, show: true },
//     { id: 'followers' as TabType, label: 'Followers', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('followers')).length, show: hasFollowers },
//     { id: 'likes' as TabType, label: 'Likes', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('likes')).length, show: hasLikes },
//     { id: 'comments' as TabType, label: 'Comments', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('comments')).length, show: hasComments },
//     { id: 'views' as TabType, label: 'Views', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('views')).length, show: hasViews },
//   ].filter(t => t.show);

//   const filteredPackages = service.packages.filter((pkg) => {
//     if (activeTab === 'all') return true;
//     return pkg.quantityLabel.toLowerCase().includes(activeTab);
//   });

//   return (
//     <div className="min-h-screen text-gray-900">

//       {/* ===== HERO ===== */}
//       <section className={`w-full bg-gradient-to-r ${service.bgGradient} py-5 sm:py-6 px-4 sm:px-6`}>
//         <div className="max-w-[1400px] mx-auto">

//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
//               {getPlatformIcon(service.slug)}
//             </div>

//             <div>
//               <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70">
//                 {offer ? 'Special Offer' : `${service.name} Service`}
//               </p>
//               <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white">
//                 Discover {service.name} Plans
//               </h1>
//             </div>
//           </div>

//           {/* Special Offer — skeleton while loading, hidden if no offer */}
//           {offerLoading ? (
//             <div className="mt-3 bg-white/10 border border-white/20 rounded-md px-3 sm:px-4 py-2 flex items-center justify-between animate-pulse">
//               <div className="h-4 w-48 bg-white/20 rounded" />
//               <div className="h-5 w-12 bg-white/30 rounded-full" />
//             </div>
//           ) : offer ? (
//             <div className="mt-3 bg-white/20 border border-white/30 rounded-md px-3 sm:px-4 py-2 flex items-center justify-between text-xs sm:text-sm text-white">
//               <span>{offer.title}</span>
//               <span className="bg-white text-gray-800 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
//                 {offer.badge}
//               </span>
//             </div>
//           ) : null}

//         </div>
//       </section>

//       {/* ===== TABS ===== */}
//       {tabs.length > 1 && (
//         <div className="sticky top-14 z-30 bg-white border-b border-gray-200 shadow-sm">
//           <div className="max-w-[1400px] mx-auto px-3 sm:px-6 flex gap-1 overflow-x-auto scrollbar-hide py-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`
//                   px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all
//                   ${activeTab === tab.id
//                     ? `${service.accentColor} text-white`
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }
//                 `}
//               >
//                 {tab.label}
//                 <span className="ml-1 text-[10px] sm:text-xs opacity-70">({tab.count})</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ===== PACKAGES GRID ===== */}
//       <section className="max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-8">

//         <p className="text-xs sm:text-sm text-gray-500 mb-4">
//           Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
//         </p>

//         {filteredPackages.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//             {filteredPackages.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 package={pkg}
//                 serviceId={service.id}
//                 serviceName={service.name}
//                 accentColor={service.accentColor}
//                 accentText={service.accentText}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-400 text-lg">
//               No packages available for this category
//             </p>
//           </div>
//         )}
//       </section>

//       {/* ===== WHY BUY SECTION ===== */}
//       <section className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-10 sm:pb-12">
//         <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-sm">
//           <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 sm:mb-6">Why Buy From Us?</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//             {[
//               { icon: '⚡', title: 'Super Fast', desc: 'Results within 1-3 days' },
//               { icon: '🔒', title: 'Completely Safe', desc: 'We never ask for your password' },
//               { icon: '💯', title: 'Real Engagement', desc: 'Genuine followers & interactions' },
//               { icon: '💬', title: '24/7 Support', desc: 'We are here to help anytime' },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="p-3 sm:p-4 rounded-lg bg-amber-50/60 border border-amber-100 hover:shadow-md transition-all"
//               >
//                 <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//                 <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">{item.title}</h4>
//                 <p className="text-[10px] sm:text-xs text-gray-500">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { getServiceBySlug } from '@/lib/services-data';
// import PackageCard from '@/components/PackageCard';
// import { useParams } from 'next/navigation';
// import {
//   FaInstagram,
//   FaYoutube,
//   FaFacebook,
//   FaSpotify,
//   FaXTwitter,
//   FaTelegram,
// } from 'react-icons/fa6';
// import { SiNetflix, SiAmazonprime } from 'react-icons/si';

// type TabType = 'all' | 'followers' | 'likes' | 'comments' | 'views' | 'story_views' | 'subscribers' | 'streams' | 'members' | 'subscription';

// interface SpecialOffer {
//   id: string;
//   serviceSlug: string;
//   title: string;
//   badge: string;
//   active: boolean;
// }

// function getPlatformIcon(slug: string) {
//   const cls = 'text-lg sm:text-xl';
//   switch (slug) {
//     case 'instagram': return <FaInstagram className={cls} />;
//     case 'youtube': return <FaYoutube className={cls} />;
//     case 'facebook': return <FaFacebook className={cls} />;
//     case 'twitter': return <FaXTwitter className={cls} />;
//     case 'spotify': return <FaSpotify className={cls} />;
//     case 'telegram': return <FaTelegram className={cls} />;
//     case 'netflix': return <SiNetflix className={cls} />;
//     case 'amazon-prime': return <SiAmazonprime className={cls} />;
//     default: return <span className="text-lg">📦</span>;
//   }
// }

// const TAB_LABELS: Record<string, string> = {
//   all: 'All',
//   followers: 'Followers',
//   likes: 'Likes',
//   comments: 'Comments',
//   views: 'Reel Views',
//   story_views: 'Story Views',
//   subscribers: 'Subscribers',
//   streams: 'Streams',
//   members: 'Members',
//   subscription: 'Plans',
// };

// export default function ServicePage() {
//   const params = useParams();
//   const serviceName = params.serviceName as string;
//   const service = getServiceBySlug(serviceName);
//   const [activeTab, setActiveTab] = useState<TabType>('all');
//   const [offer, setOffer] = useState<SpecialOffer | null>(null);
//   const [offerLoading, setOfferLoading] = useState(true);

//   useEffect(() => {
//     if (!serviceName) return;
//     const fetchOffer = async () => {
//       try {
//         const res = await fetch(`/api/offers?service=${serviceName}`);
//         const data = await res.json();
//         if (data.success && data.data) setOffer(data.data);
//       } catch (err) {
//         console.error('Error fetching offer:', err);
//       } finally {
//         setOfferLoading(false);
//       }
//     };
//     fetchOffer();
//   }, [serviceName]);

//   if (!service) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl text-gray-400 mb-4">Service not found</p>
//           <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
//             ← Go back to home
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // Dynamically figure out available categories from packages
//   const categories = Array.from(
//     new Set(service.packages.map((p) => (p as any).serviceCategory).filter(Boolean))
//   ) as string[];

//   const tabs = [
//     { id: 'all' as TabType, label: 'All', count: service.packages.length },
//     ...categories.map((cat) => ({
//       id: cat as TabType,
//       label: TAB_LABELS[cat] ?? cat,
//       count: service.packages.filter((p) => (p as any).serviceCategory === cat).length,
//     })),
//   ];

//   const filteredPackages = service.packages.filter((pkg) => {
//     if (activeTab === 'all') return true;
//     return (pkg as any).serviceCategory === activeTab;
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 text-gray-900">

//       {/* ===== HERO ===== */}
//       <section className={`w-full bg-gradient-to-r ${service.bgGradient} pt-5 pb-6 sm:pt-6 sm:pb-8 px-4 sm:px-6`}>
//         <div className="max-w-[1400px] mx-auto">

//           {/* Platform identity */}
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
//               {getPlatformIcon(service.slug)}
//             </div>
//             <div>
//               <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 font-semibold">
//                 {service.name} Service
//               </p>
//               <h1 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
//                 Discover {service.name} Plans
//               </h1>
//             </div>
//           </div>

//           {/* Offer strip */}
//           {offerLoading ? (
//             <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 flex items-center justify-between animate-pulse">
//               <div className="h-3.5 w-40 bg-white/20 rounded-full" />
//               <div className="h-5 w-14 bg-white/30 rounded-full" />
//             </div>
//           ) : offer ? (
//             <div className="bg-white/20 border border-white/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-white backdrop-blur-sm">
//               <span className="font-medium">{offer.title}</span>
//               <span className="bg-white text-gray-800 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
//                 {offer.badge}
//               </span>
//             </div>
//           ) : null}

//         </div>
//       </section>

//       {/* ===== TABS ===== */}
//       {tabs.length > 1 && (
//         <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
//           <div className="max-w-[1400px] mx-auto px-3 sm:px-6 flex gap-1.5 overflow-x-auto scrollbar-hide py-2.5">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`
//                   px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all
//                   ${activeTab === tab.id
//                     ? 'bg-indigo-600 text-white shadow-sm'
//                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                   }
//                 `}
//               >
//                 {tab.label}
//                 <span className={`ml-1 text-[10px] ${activeTab === tab.id ? 'opacity-70' : 'text-slate-400'}`}>
//                   ({tab.count})
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ===== PACKAGES GRID ===== */}
//       <section className="max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-7">

//         <div className="flex items-center justify-between mb-4">
//           <p className="text-xs sm:text-sm text-slate-500 font-medium">
//             Showing <span className="font-bold text-slate-700">{filteredPackages.length}</span> package{filteredPackages.length !== 1 ? 's' : ''}
//           </p>
//         </div>

//         {filteredPackages.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//             {filteredPackages.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 package={pkg}
//                 serviceId={service.id}
//                 serviceName={service.name}
//                 accentColor={service.accentColor}
//                 accentText={service.accentText}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
//             <p className="text-slate-400 text-base">No packages in this category</p>
//           </div>
//         )}
//       </section>

//       {/* ===== WHY BUY SECTION ===== */}
//       <section className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-10 sm:pb-14">
//         <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm">
//           <h3 className="text-sm sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">Why Buy From Us?</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
//             {[
//               { icon: '⚡', title: 'Super Fast', desc: 'Results within 1-3 days', bg: 'bg-amber-50', border: 'border-amber-100' },
//               { icon: '🔒', title: 'Completely Safe', desc: 'We never ask for your password', bg: 'bg-indigo-50', border: 'border-indigo-100' },
//               { icon: '💯', title: 'Real Engagement', desc: 'Genuine followers & interactions', bg: 'bg-emerald-50', border: 'border-emerald-100' },
//               { icon: '💬', title: '24/7 Support', desc: 'We are here to help anytime', bg: 'bg-rose-50', border: 'border-rose-100' },
//             ].map((item, idx) => (
//               <div
//                 key={idx}
//                 className={`p-3 sm:p-4 rounded-xl ${item.bg} border ${item.border} hover:shadow-md transition-all`}
//               >
//                 <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
//                 <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">{item.title}</h4>
//                 <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { getServiceBySlug, getAllServices } from '@/lib/services-data';
// import PackageCard from '@/components/PackageCard';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import {
//   FaInstagram,
//   FaYoutube,
//   FaFacebook,
//   FaSpotify,
//   FaXTwitter,
//   FaTelegram,
// } from 'react-icons/fa6';
// import { SiNetflix } from 'react-icons/si';

// type TabType = 'all' | 'followers' | 'likes' | 'comments' | 'views' | 'story_views' | 'subscribers' | 'streams' | 'members' | 'subscription';

// interface SpecialOffer {
//   id: string;
//   serviceSlug: string;
//   title: string;
//   badge: string;
//   active: boolean;
// }

// function AmazonPrimeIcon({ size = 20 }: { size?: number }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect width="40" height="40" rx="8" fill="#00A8E1" />
//       <text x="20" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="Arial, sans-serif">a</text>
//     </svg>
//   );
// }

// function getPlatformIcon(slug: string, size = 24) {
//   switch (slug) {
//     case 'instagram':    return <FaInstagram size={size} />;
//     case 'youtube':      return <FaYoutube size={size} />;
//     case 'facebook':     return <FaFacebook size={size} />;
//     case 'twitter':      return <FaXTwitter size={size} />;
//     case 'spotify':      return <FaSpotify size={size} />;
//     case 'telegram':     return <FaTelegram size={size} />;
//     case 'netflix':      return <SiNetflix size={size} />;
//     case 'amazon-prime': return <AmazonPrimeIcon size={size} />;
//     default:             return <span style={{ fontSize: size }}>📦</span>;
//   }
// }

// function getSmallPlatformIcon(slug: string, size = 18) {
//   switch (slug) {
//     case 'instagram':    return <FaInstagram size={size} className="text-pink-500" />;
//     case 'youtube':      return <FaYoutube size={size} className="text-red-500" />;
//     case 'facebook':     return <FaFacebook size={size} className="text-blue-600" />;
//     case 'twitter':      return <FaXTwitter size={size} className="text-slate-700" />;
//     case 'spotify':      return <FaSpotify size={size} className="text-green-500" />;
//     case 'telegram':     return <FaTelegram size={size} className="text-sky-500" />;
//     case 'netflix':      return <SiNetflix size={size} className="text-red-600" />;
//     case 'amazon-prime': return <AmazonPrimeIcon size={size} />;
//     default:             return <span style={{ fontSize: size }}>📦</span>;
//   }
// }

// const TAB_LABELS: Record<string, string> = {
//   all: 'All',
//   followers: 'Followers',
//   likes: 'Likes',
//   comments: 'Comments',
//   views: 'Reel Views',
//   story_views: 'Story Views',
//   subscribers: 'Subscribers',
//   streams: 'Streams',
//   members: 'Members',
//   subscription: 'Plans',
// };

// function getBtnGradient(slug: string) {
//   const map: Record<string, string> = {
//     instagram: 'from-pink-500 to-purple-600',
//     youtube: 'from-red-500 to-red-700',
//     facebook: 'from-blue-500 to-blue-700',
//     twitter: 'from-slate-600 to-slate-800',
//     spotify: 'from-green-500 to-green-700',
//     telegram: 'from-sky-400 to-cyan-600',
//     netflix: 'from-red-600 to-red-900',
//     'amazon-prime': 'from-sky-400 to-blue-600',
//   };
//   return map[slug] ?? 'from-indigo-500 to-indigo-700';
// }

// export default function ServicePage() {
//   const params = useParams();
//   const serviceName = params.serviceName as string;
//   const service = getServiceBySlug(serviceName);
//   const allServices = getAllServices();
//   const otherServices = allServices.filter((s) => s.slug !== serviceName);

//   const [activeTab, setActiveTab] = useState<TabType>('all');
//   const [offer, setOffer] = useState<SpecialOffer | null>(null);
//   const [offerLoading, setOfferLoading] = useState(true);

//   useEffect(() => {
//     if (!serviceName) return;
//     const fetchOffer = async () => {
//       try {
//         const res = await fetch(`/api/offers?service=${serviceName}`);
//         const data = await res.json();
//         if (data.success && data.data) setOffer(data.data);
//       } catch (err) {
//         console.error('Error fetching offer:', err);
//       } finally {
//         setOfferLoading(false);
//       }
//     };
//     fetchOffer();
//   }, [serviceName]);

//   if (!service) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl text-gray-400 mb-4">Service not found</p>
//           <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
//             ← Go back to home
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // Build tabs from serviceCategory field
//   const categories = Array.from(
//     new Set(service.packages.map((p) => (p as any).serviceCategory).filter(Boolean))
//   ) as string[];

//   const tabs = [
//     { id: 'all' as TabType, label: 'All', count: service.packages.length },
//     ...categories.map((cat) => ({
//       id: cat as TabType,
//       label: TAB_LABELS[cat] ?? cat,
//       count: service.packages.filter((p) => (p as any).serviceCategory === cat).length,
//     })),
//   ];

//   const filteredPackages = service.packages.filter((pkg) => {
//     if (activeTab === 'all') return true;
//     return (pkg as any).serviceCategory === activeTab;
//   });

//   return (
//     <div className="min-h-screen bg-slate-50 text-gray-900">

//       {/* ===== HERO — bigger on mobile ===== */}
//       <section className={`w-full bg-gradient-to-br ${service.bgGradient} px-4 sm:px-6 pt-6 pb-8 sm:pt-8 sm:pb-10`}>
//         <div className="max-w-[1400px] mx-auto">

//           {/* Icon + identity */}
//           <div className="flex items-center gap-4 mb-4 sm:mb-5">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
//               {getPlatformIcon(service.slug, 28)}
//             </div>
//             <div>
//               <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 font-semibold mb-0.5">
//                 {service.name} Service
//               </p>
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
//                 {service.name} Plans
//               </h1>
//               <p className="text-white/70 text-xs sm:text-sm mt-0.5">
//                 {service.description}
//               </p>
//             </div>
//           </div>

//           {/* Stats row */}
//           <div className="flex items-center gap-3 sm:gap-5 mb-4 flex-wrap">
//             <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
//               {service.packages.length} packages available
//             </div>
//             <div className="text-white/60 text-xs sm:text-sm">• Fast delivery</div>
//             <div className="text-white/60 text-xs sm:text-sm">• No password needed</div>
//           </div>

//           {/* Offer strip */}
//           {offerLoading ? (
//             <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between animate-pulse">
//               <div className="h-3.5 w-40 bg-white/20 rounded-full" />
//               <div className="h-5 w-14 bg-white/30 rounded-full" />
//             </div>
//           ) : offer ? (
//             <div className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm text-white backdrop-blur-sm">
//               <span className="font-semibold">{offer.title}</span>
//               <span className="bg-white text-gray-800 px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
//                 {offer.badge}
//               </span>
//             </div>
//           ) : null}

//         </div>
//       </section>

//       {/* ===== TABS ===== */}
//       {tabs.length > 1 && (
//         <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
//           <div className="max-w-[1400px] mx-auto px-3 sm:px-6 flex gap-1.5 overflow-x-auto scrollbar-hide py-2.5">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`
//                   px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all
//                   ${activeTab === tab.id
//                     ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
//                     : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
//                   }
//                 `}
//               >
//                 {tab.label}
//                 <span className={`ml-1 text-[10px] ${activeTab === tab.id ? 'opacity-70' : 'text-slate-400'}`}>
//                   ({tab.count})
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ===== PACKAGES GRID ===== */}
//       <section className="max-w-[1400px] mx-auto px-3 sm:px-6 py-5 sm:py-7">
//         <div className="flex items-center justify-between mb-4">
//           <p className="text-xs sm:text-sm text-slate-500 font-medium">
//             Showing <span className="font-bold text-slate-700">{filteredPackages.length}</span> package{filteredPackages.length !== 1 ? 's' : ''}
//           </p>
//         </div>

//         {filteredPackages.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//             {filteredPackages.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 package={pkg}
//                 serviceId={service.id}
//                 serviceName={service.name}
//                 accentColor={service.accentColor}
//                 accentText={service.accentText}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
//             <p className="text-slate-400 text-base">No packages in this category</p>
//           </div>
//         )}
//       </section>

      // {/* ===== EXPLORE OTHER SERVICES ===== */}
      // <section className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-6 sm:pb-8">
      //   <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
      //     <p className="text-center text-xs sm:text-sm font-semibold text-indigo-500 mb-4 sm:mb-5 tracking-wide">
      //       Explore our services and their plans.
      //     </p>

      //     <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      //       {otherServices.map((s) => (
      //         <Link
      //           key={s.id}
      //           href={`/${s.slug}`}
      //           className="flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all bg-slate-50 hover:bg-white w-[72px] sm:w-20 active:scale-95"
      //         >
      //           <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${s.accentBgLight} flex items-center justify-center`}>
      //             {getSmallPlatformIcon(s.slug, 20)}
      //           </div>
      //           <span className="text-[10px] sm:text-xs font-semibold text-slate-700 text-center leading-tight">
      //             {s.name}
      //           </span>
      //         </Link>
      //       ))}
      //     </div>
      //   </div>
      // </section>

//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { getServiceBySlug, getAllServices } from '@/lib/services-data';
import PackageCard from '@/components/PackageCard';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaSpotify,
  FaXTwitter,
  FaTelegram,
} from 'react-icons/fa6';
import { SiNetflix } from 'react-icons/si';

type TabType = 'all' | 'followers' | 'likes' | 'comments' | 'views' | 'story_views' | 'subscribers' | 'streams' | 'members' | 'subscription';

interface SpecialOffer {
  id: string;
  serviceSlug: string;
  title: string;
  badge: string;
  active: boolean;
}

function AmazonPrimeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#00A8E1" />
      <text x="20" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="Arial, sans-serif">a</text>
    </svg>
  );
}

function getPlatformIcon(slug: string, size = 24) {
  switch (slug) {
    case 'instagram':    return <FaInstagram size={size} />;
    case 'youtube':      return <FaYoutube size={size} />;
    case 'facebook':     return <FaFacebook size={size} />;
    case 'twitter':      return <FaXTwitter size={size} />;
    case 'spotify':      return <FaSpotify size={size} />;
    case 'telegram':     return <FaTelegram size={size} />;
    case 'netflix':      return <SiNetflix size={size} />;
    case 'amazon-prime': return <AmazonPrimeIcon size={size} />;
    default:             return <span style={{ fontSize: size }}>📦</span>;
  }
}

function getColoredIcon(slug: string, size = 18) {
  switch (slug) {
    case 'instagram':    return <FaInstagram size={size} className="text-pink-500" />;
    case 'youtube':      return <FaYoutube size={size} className="text-red-500" />;
    case 'facebook':     return <FaFacebook size={size} className="text-blue-600" />;
    case 'twitter':      return <FaXTwitter size={size} className="text-slate-700" />;
    case 'spotify':      return <FaSpotify size={size} className="text-green-500" />;
    case 'telegram':     return <FaTelegram size={size} className="text-sky-500" />;
    case 'netflix':      return <SiNetflix size={size} className="text-red-600" />;
    case 'amazon-prime': return <AmazonPrimeIcon size={size} />;
    default:             return <span style={{ fontSize: size }}>📦</span>;
  }
}

const TAB_LABELS: Record<string, string> = {
  all: 'All',
  followers: 'Followers',
  likes: 'Likes',
  comments: 'Comments',
  views: 'Reel Views',
  story_views: 'Story Views',
  subscribers: 'Subscribers',
  streams: 'Streams',
  members: 'Members',
  subscription: 'Plans',
};

export default function ServicePage() {
  const params = useParams();
  const serviceName = params.serviceName as string;
  const service = getServiceBySlug(serviceName);
  const allServices = getAllServices();
  const otherServices = allServices.filter((s) => s.slug !== serviceName);

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [offerLoading, setOfferLoading] = useState(true);

  useEffect(() => {
    if (!serviceName) return;
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/offers?service=${serviceName}`);
        const data = await res.json();
        if (data.success && data.data) setOffer(data.data);
      } catch (err) {
        console.error('Error fetching offer:', err);
      } finally {
        setOfferLoading(false);
      }
    };
    fetchOffer();
  }, [serviceName]);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">Service not found</p>
          <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">← Go back to home</a>
        </div>
      </div>
    );
  }

  const categories = Array.from(
    new Set(service.packages.map((p) => (p as any).serviceCategory).filter(Boolean))
  ) as string[];

  const tabs = [
    { id: 'all' as TabType, label: 'All', count: service.packages.length },
    ...categories.map((cat) => ({
      id: cat as TabType,
      label: TAB_LABELS[cat] ?? cat,
      count: service.packages.filter((p) => (p as any).serviceCategory === cat).length,
    })),
  ];

  const filteredPackages = service.packages.filter((pkg) => {
    if (activeTab === 'all') return true;
    return (pkg as any).serviceCategory === activeTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">

      {/* ===== HERO ===== */}
      <section className={`w-full bg-gradient-to-br ${service.bgGradient} px-4 sm:px-6 pt-4 pb-6 sm:pt-6 sm:pb-8`}>
        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-14 h-11 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
              {getPlatformIcon(service.slug, 22)}
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-0.5">
                {service.name} Service
              </p>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                {service.name} Plans
              </h1>
              <p className="text-white/70 text-[11px] sm:text-sm mt-0.5">{service.description}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 mb-3.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-white/80 text-[11px] sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {service.packages.length} packages available
            </div>
            <span className="text-white/50 text-[11px]">• Fast delivery</span>
            <span className="text-white/50 text-[11px]">• No password needed</span>
          </div>

          {/* Offer strip */}
          {offerLoading ? (
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between animate-pulse">
              <div className="h-3 w-36 bg-white/20 rounded-full" />
              <div className="h-5 w-12 bg-white/30 rounded-full" />
            </div>
          ) : offer ? (
            <div className="bg-white/20 border border-white/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-white backdrop-blur-sm">
              <span className="font-semibold">{offer.title}</span>
              <span className="bg-white text-gray-800 px-3 py-0.5 rounded-full text-[10px] font-bold shadow-sm">
                {offer.badge}
              </span>
            </div>
          ) : null}

        </div>
      </section>

      {/* ===== TABS ===== */}
      {tabs.length > 1 && (
        <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-6 flex gap-1.5 overflow-x-auto scrollbar-hide py-2.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all
                  ${activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}
              >
                {tab.label}
                <span className={`ml-1 text-[9px] sm:text-[10px] ${activeTab === tab.id ? 'opacity-60' : 'text-slate-400'}`}>
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== PACKAGES ===== */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <p className="text-[11px] sm:text-sm text-slate-500 font-medium mb-3 sm:mb-4">
          Showing <span className="font-bold text-slate-700">{filteredPackages.length}</span> package{filteredPackages.length !== 1 ? 's' : ''}
        </p>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                serviceId={service.id}
                serviceName={service.name}
                accentColor={service.accentColor}
                accentText={service.accentText}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-400">No packages in this category</p>
          </div>
        )}
      </section>

      {/* ===== EXPLORE OTHER SERVICES ===== */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-10 sm:pb-14">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">

          <p className="text-center text-[11px] sm:text-sm font-semibold text-indigo-500 mb-4 sm:mb-5 tracking-wide">
            Explore our services and their plans.
          </p>

          {/* Scrollable row on mobile, centered wrap on desktop */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto sm:flex-wrap sm:justify-center scrollbar-hide pb-1">
            {otherServices.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}`}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 p-2.5 sm:p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all bg-slate-50 hover:bg-white w-[68px] sm:w-[80px] active:scale-95"
              >
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${s.accentBgLight} flex items-center justify-center`}>
                  {getColoredIcon(s.slug, 20)}
                </div>
                <span className="text-[9px] sm:text-[10px] font-semibold text-slate-700 text-center leading-tight line-clamp-2">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
