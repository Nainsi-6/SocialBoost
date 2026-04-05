'use client';

import { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import PackageCard from '@/components/PackageCard';
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
  description?: string | null;
  serviceId?: number | null;
  quantity?: number | null;
  price?: number | null;
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
    case 'instagram': return <FaInstagram size={size} />;
    case 'youtube': return <FaYoutube size={size} />;
    case 'facebook': return <FaFacebook size={size} />;
    case 'twitter': return <FaXTwitter size={size} />;
    case 'spotify': return <FaSpotify size={size} />;
    case 'telegram': return <FaTelegram size={size} />;
    case 'netflix': return <SiNetflix size={size} />;
    case 'amazon-prime': return <AmazonPrimeIcon size={size} />;
    default: return <span style={{ fontSize: size }}>📦</span>;
  }
}

function getColoredIcon(slug: string, size = 18) {
  switch (slug) {
    case 'instagram': return <FaInstagram size={size} className="text-pink-500" />;
    case 'youtube': return <FaYoutube size={size} className="text-red-500" />;
    case 'facebook': return <FaFacebook size={size} className="text-blue-600" />;
    case 'twitter': return <FaXTwitter size={size} className="text-slate-700" />;
    case 'spotify': return <FaSpotify size={size} className="text-green-500" />;
    case 'telegram': return <FaTelegram size={size} className="text-sky-500" />;
    case 'netflix': return <SiNetflix size={size} className="text-red-600" />;
    case 'amazon-prime': return <AmazonPrimeIcon size={size} />;
    default: return <span style={{ fontSize: size }}>📦</span>;
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

export default function ServicePageClient({
  service,
  otherServices,
}: {
  service: Service;
  otherServices: Service[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [offerLoading, setOfferLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/offers?service=${service.slug}`);
        const data = await res.json();
        if (data.success && data.data) setOffer(data.data);
      } catch (err) {
        console.error('Error fetching offer:', err);
      } finally {
        setOfferLoading(false);
      }
    };
    fetchOffer();
  }, [service.slug]);

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

          <div className="flex items-center gap-3 mb-3.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-white/80 text-[11px] sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {service.packages.length} packages available
            </div>
            <span className="text-white/50 text-[11px]">• Fast delivery</span>
            <span className="text-white/50 text-[11px]">• No password needed</span>
          </div>

          {offerLoading ? (
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between animate-pulse">
              <div className="h-3 w-36 bg-white/20 rounded-full" />
              <div className="h-5 w-12 bg-white/30 rounded-full" />
            </div>
          ) : offer ? (
            <div className="bg-white/20 border border-white/30 rounded-xl px-3 py-2.5 flex items-center justify-between gap-3 text-white backdrop-blur-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="bg-white text-gray-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm flex-shrink-0">
                  {offer.badge}
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-xs sm:text-sm block truncate">{offer.title}</span>
                  {offer.description && (
                    <span className="text-white/70 text-[10px] block truncate">{offer.description}</span>
                  )}
                </div>
              </div>
              {offer.price != null && offer.serviceId != null && offer.quantity != null ? (
                <a
                  href={`/checkout?service=${service.slug}&package=offer-${offer.id}&offerId=${offer.id}&serviceId=${offer.serviceId}&quantity=${offer.quantity}&price=${offer.price}`}
                  className="flex-shrink-0 bg-white text-gray-800 hover:bg-white/90 font-bold text-[11px] sm:text-xs px-3 py-1.5 rounded-lg transition-all active:scale-95 whitespace-nowrap"
                >
                  ₹{offer.price} Buy Now
                </a>
              ) : null}
            </div>
          ) : null}

        </div>
      </section>

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

      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-10 sm:pb-14">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <p className="text-center text-[11px] sm:text-sm font-semibold text-indigo-500 mb-4 sm:mb-5 tracking-wide">
            Explore our services and their plans.
          </p>
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
