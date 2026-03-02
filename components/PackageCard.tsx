

'use client';

import { Package } from '@/lib/types';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

interface PackageCardProps {
  package: Package;
  serviceId: string;
  serviceName: string;
}

export default function PackageCard({
  package: pkg,
  serviceId,
  serviceName,
}: PackageCardProps) {
  return (
    <div className="
      bg-slate-900 
      border border-slate-800 
      rounded-lg 
      px-4 
      py-3 sm:py-4
      hover:border-pink-500 
      transition-all
    ">

      {/* TITLE */}
      <h3 className="text-sm sm:text-base font-semibold text-white">
        {pkg.quantityLabel}
      </h3>

      <p className="text-xs text-slate-400 mt-1">
        {pkg.description}
      </p>

      {/* QUALITY + DELIVERY */}
      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Check size={13} className="text-green-400" />
          {pkg.quality}
        </div>
        <div className="flex items-center gap-1">
          <Zap size={13} className="text-yellow-400" />
          {pkg.deliveryTime}
        </div>
      </div>

      {/* PRICE + BUTTON */}
      <div className="flex items-center justify-between mt-3">

        <div>
          <div className="text-base sm:text-lg font-bold text-blue-400">
            ₹{pkg.price}
          </div>
          <div className="text-[10px] text-slate-400">
            per order
          </div>
        </div>

        <Link
          href={`/checkout?service=${serviceId}&package=${pkg.id}&serviceName=${serviceName}`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md transition"
        >
          Buy
        </Link>

      </div>

    </div>
  );
}