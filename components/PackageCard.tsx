'use client';

import { Package } from '@/lib/types';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

interface PackageCardProps {
  package: Package;
  serviceId: string;
  serviceName: string;
  /** Tailwind button classes e.g. "bg-pink-500 hover:bg-pink-600" */
  accentColor: string;
  /** Tailwind text color e.g. "text-pink-600" */
  accentText: string;
}

export default function PackageCard({
  package: pkg,
  serviceId,
  serviceName,
  accentColor,
  accentText,
}: PackageCardProps) {
  return (
    <div className="
      bg-white
      border border-gray-200
      rounded-lg
      px-4
      py-3 sm:py-4
      hover:shadow-md
      transition-all
    ">

      {/* TITLE */}
      <h3 className="text-sm sm:text-base font-semibold text-gray-800">
        {pkg.quantityLabel}
      </h3>

      <p className="text-xs text-gray-500 mt-1">
        {pkg.description}
      </p>

      {/* QUALITY + DELIVERY */}
      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Check size={13} className="text-emerald-500" />
          {pkg.quality}
        </div>
        <div className="flex items-center gap-1">
          <Zap size={13} className="text-amber-500" />
          {pkg.deliveryTime}
        </div>
      </div>

      {/* PRICE + BUTTON */}
      <div className="flex items-center justify-between mt-3">

        <div>
          <div className={`text-base sm:text-lg font-bold ${accentText}`}>
            ₹{pkg.price}
          </div>
          <div className="text-[10px] text-gray-400">
            per order
          </div>
        </div>

        <Link
          href={`/checkout?service=${serviceId}&package=${pkg.id}&serviceName=${serviceName}`}
          className={`${accentColor} text-white text-xs font-semibold px-3 py-1.5 rounded-md transition`}
        >
          Buy Now
        </Link>

      </div>

    </div>
  );
}