'use client';

import { getServiceBySlug } from '@/lib/services-data';
import PackageCard from '@/components/PackageCard';
import { CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ServicePage() {
  const params = useParams();
  const serviceName = params.serviceName as string;
  const service = getServiceBySlug(serviceName);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-400 mb-4">Service not found</p>
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Go back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 lg:pt-12 pb-12 px-4 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 max-w-7xl mx-auto">
        <div
          className={`bg-gradient-to-br ${service.bgGradient} rounded-2xl overflow-hidden shadow-2xl p-8 lg:p-12`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center text-white">
              <p className="text-sm font-semibold text-blue-300 mb-3 uppercase tracking-wide">
                Special Offer
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {service.name}
              </h1>
              <p className="text-lg text-blue-100 mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-300" />
                  <span>High-Quality Real Engagement</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-300" />
                  <span>Fast Delivery Guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-300" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-80">
                <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <p className="text-white/90 text-lg font-semibold">
                      Boost Your {service.name} Presence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Available Packages
          </h2>
          <p className="text-slate-400">
            Choose from {service.packages.length} carefully curated packages
          </p>
        </div>

        {/* Packages Grid */}
        {service.packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                serviceId={service.id}
                serviceName={service.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No packages available for this service
            </p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <section className="mt-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-900/50 to-slate-900/50 border border-blue-500/30 rounded-xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-white mb-6">Why Buy From Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Super Fast Delivery',
                desc: 'See results within 1-3 days',
              },
              {
                icon: '🔒',
                title: 'Completely Safe',
                desc: 'We never ask for your password',
              },
              {
                icon: '💯',
                title: 'Real Engagement',
                desc: 'Genuine followers and interactions',
              },
              {
                icon: '💬',
                title: '24/7 Support',
                desc: 'We are here to help anytime',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
