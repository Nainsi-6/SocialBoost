'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import { getServiceBySlug } from '@/lib/services-data';
import { createOrder } from '@/lib/order-manager';
import { Service, Package as PackageType } from '@/lib/types';
import { CheckCircle, ArrowLeft, Loader } from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profileLink, setProfileLink] = useState('');
  const [error, setError] = useState('');

  const serviceId = searchParams.get('service');
  const packageId = searchParams.get('package');
  const serviceName = searchParams.get('serviceName');

  const [service, setService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);

  useEffect(() => {
    if (serviceId) {
      const svc = getServiceBySlug(serviceId);
      if (svc) {
        setService(svc);
        if (packageId) {
          const pkg = svc.packages.find((p) => p.id === packageId);
          if (pkg) {
            setSelectedPackage(pkg);
          }
        }
      }
    }
  }, [serviceId, packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!profileLink.trim()) {
      setError('Please enter your profile link');
      return;
    }

    if (!service || !selectedPackage) {
      setError('Invalid service or package');
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const order = createOrder(
        service.id,
        service.name,
        selectedPackage.id,
        selectedPackage.quantityLabel,
        selectedPackage.quantity,
        selectedPackage.price,
        profileLink
      );

      // Redirect to my orders with success message
      router.push(
        `/my-orders?success=true&orderId=${order.orderId}`
      );
    } catch (err) {
      setError('Failed to create order. Please try again.');
      setIsLoading(false);
    }
  };

  if (!service || !selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-400 mb-4">
            Invalid package selected
          </p>
          <button
            onClick={() => router.push('/')}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={20} />
            Go back to home
          </button>
        </div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-6 sm:pt-8 lg:pt-12 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl lg:max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Checkout
        </h1>

        <p className="text-slate-400 mt-1 sm:mt-2 text-sm sm:text-base">
          Complete your purchase and watch your engagement grow
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

        {/* LEFT - FORM */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">

          {/* Order Summary */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-slate-300 text-sm sm:text-base">
              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span>Service</span>
                <span className="font-semibold text-white">
                  {service.name}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-700">
                <span>Package</span>
                <span className="font-semibold text-white">
                  {selectedPackage.quantityLabel}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Quality</span>
                <span className="font-semibold text-blue-400">
                  {selectedPackage.quality}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Delivery Time</span>
                <span className="font-semibold text-white">
                  {selectedPackage.deliveryTime}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Input */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Enter Your Profile Link
            </h2>

            <label className="block text-xs sm:text-sm text-slate-300 mb-2">
              {service.name} Profile URL
            </label>

            <input
              type="url"
              placeholder={`https://${service.name.toLowerCase()}.com/yourprofile`}
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />

            <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 mt-3">
              <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
              <span>
                We never ask for your password or sensitive information
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/30 rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              What You Get
            </h2>

            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              {[
                "High-Quality Real Engagement",
                "Fast Delivery Guaranteed",
                "100% Satisfaction Guarantee",
                "24/7 Customer Support",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 sm:p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              'Complete Purchase'
            )}
          </button>

        </div>

        {/* RIGHT - PRICE (Not sticky on phone) */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 sm:p-6 text-white shadow-xl mt-6 lg:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              Total Cost
            </h3>

            <div className="flex justify-between items-center text-blue-100 mb-4 text-sm sm:text-base">
              <span>{selectedPackage.quantityLabel}</span>
              <span className="font-semibold">
                ₹{selectedPackage.price}
              </span>
            </div>

            <div className="border-t border-blue-500/30 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-xl sm:text-2xl">
                  ₹{selectedPackage.price}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={40} className="animate-spin text-blue-400" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
