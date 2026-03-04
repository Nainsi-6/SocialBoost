'use client';

import { useState, useEffect } from 'react';
import { getServiceBySlug } from '@/lib/services-data';
import PackageCard from '@/components/PackageCard';
import { useParams } from 'next/navigation';
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaSpotify,
  FaXTwitter,
} from 'react-icons/fa6';

type TabType = 'all' | 'followers' | 'likes' | 'comments' | 'views';

interface SpecialOffer {
  id: string;
  serviceSlug: string;
  title: string;
  badge: string;
  active: boolean;
}

function getPlatformIcon(slug: string) {
  switch (slug) {
    case 'instagram': return <FaInstagram className="text-lg sm:text-xl" />;
    case 'youtube': return <FaYoutube className="text-lg sm:text-xl" />;
    case 'facebook': return <FaFacebook className="text-lg sm:text-xl" />;
    case 'tiktok': return <FaTiktok className="text-lg sm:text-xl" />;
    case 'twitter': return <FaXTwitter className="text-lg sm:text-xl" />;
    case 'spotify': return <FaSpotify className="text-lg sm:text-xl" />;
    default: return <span className="text-lg">📦</span>;
  }
}

export default function ServicePage() {
  const params = useParams();
  const serviceName = params.serviceName as string;
  const service = getServiceBySlug(serviceName);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [offerLoading, setOfferLoading] = useState(true);

  // Fetch special offer for this service
  useEffect(() => {
    if (!serviceName) return;

    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/offers?service=${serviceName}`);
        const data = await res.json();
        if (data.success && data.data) {
          setOffer(data.data);
        }
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">Service not found</p>
          <a href="/" className="text-amber-600 hover:text-amber-700 font-semibold">
            Go back to home
          </a>
        </div>
      </div>
    );
  }

  const hasFollowers = service.packages.some(p => p.quantityLabel.toLowerCase().includes('followers'));
  const hasLikes = service.packages.some(p => p.quantityLabel.toLowerCase().includes('likes'));
  const hasComments = service.packages.some(p => p.quantityLabel.toLowerCase().includes('comments'));
  const hasViews = service.packages.some(p => p.quantityLabel.toLowerCase().includes('views'));

  const tabs = [
    { id: 'all' as TabType, label: 'All', count: service.packages.length, show: true },
    { id: 'followers' as TabType, label: 'Followers', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('followers')).length, show: hasFollowers },
    { id: 'likes' as TabType, label: 'Likes', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('likes')).length, show: hasLikes },
    { id: 'comments' as TabType, label: 'Comments', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('comments')).length, show: hasComments },
    { id: 'views' as TabType, label: 'Views', count: service.packages.filter(p => p.quantityLabel.toLowerCase().includes('views')).length, show: hasViews },
  ].filter(t => t.show);

  const filteredPackages = service.packages.filter((pkg) => {
    if (activeTab === 'all') return true;
    return pkg.quantityLabel.toLowerCase().includes(activeTab);
  });

  return (
    <div className="min-h-screen text-gray-900">

      {/* ===== HERO ===== */}
      <section className={`w-full bg-gradient-to-r ${service.bgGradient} py-5 sm:py-6 px-4 sm:px-6`}>
        <div className="max-w-[1400px] mx-auto">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
              {getPlatformIcon(service.slug)}
            </div>

            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70">
                {offer ? 'Special Offer' : `${service.name} Service`}
              </p>
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white">
                Discover {service.name} Plans
              </h1>
            </div>
          </div>

          {/* Special Offer — skeleton while loading, hidden if no offer */}
          {offerLoading ? (
            <div className="mt-3 bg-white/10 border border-white/20 rounded-md px-3 sm:px-4 py-2 flex items-center justify-between animate-pulse">
              <div className="h-4 w-48 bg-white/20 rounded" />
              <div className="h-5 w-12 bg-white/30 rounded-full" />
            </div>
          ) : offer ? (
            <div className="mt-3 bg-white/20 border border-white/30 rounded-md px-3 sm:px-4 py-2 flex items-center justify-between text-xs sm:text-sm text-white">
              <span>{offer.title}</span>
              <span className="bg-white text-gray-800 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                {offer.badge}
              </span>
            </div>
          ) : null}

        </div>
      </section>

      {/* ===== TABS ===== */}
      {tabs.length > 1 && (
        <div className="sticky top-14 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-6 flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all
                  ${activeTab === tab.id
                    ? `${service.accentColor} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {tab.label}
                <span className="ml-1 text-[10px] sm:text-xs opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== PACKAGES GRID ===== */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 py-6 sm:py-8">

        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
        </p>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No packages available for this category
            </p>
          </div>
        )}
      </section>

      {/* ===== WHY BUY SECTION ===== */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-6 pb-10 sm:pb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8 shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 sm:mb-6">Why Buy From Us?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: '⚡', title: 'Super Fast', desc: 'Results within 1-3 days' },
              { icon: '🔒', title: 'Completely Safe', desc: 'We never ask for your password' },
              { icon: '💯', title: 'Real Engagement', desc: 'Genuine followers & interactions' },
              { icon: '💬', title: '24/7 Support', desc: 'We are here to help anytime' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-4 rounded-lg bg-amber-50/60 border border-amber-100 hover:shadow-md transition-all"
              >
                <div className="text-2xl sm:text-3xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">{item.title}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
