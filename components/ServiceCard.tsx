'use client';

import Link from 'next/link';
import { Service } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaSpotify,
  FaXTwitter,
} from 'react-icons/fa6';

function getPlatformIcon(slug: string) {
  const base = "text-base sm:text-xl";

  switch (slug) {
    case 'instagram':
      return <FaInstagram className={`${base} text-pink-600`} />;
    case 'youtube':
      return <FaYoutube className={`${base} text-red-600`} />;
    case 'facebook':
      return <FaFacebook className={`${base} text-blue-600`} />;
    case 'tiktok':
      return <FaTiktok className={`${base} text-gray-800`} />;
    case 'twitter':
      return <FaXTwitter className={`${base} text-sky-500`} />;
    case 'spotify':
      return <FaSpotify className={`${base} text-green-600`} />;
    default:
      return null;
  }
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/${service.slug}`} className="block group">
      <div
        className="
          flex flex-col items-center justify-center text-center
          p-3 sm:p-6
          rounded-xl
          bg-white
          border border-gray-200
          hover:shadow-lg
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {/* ICON */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg ${service.accentBgLight} mb-2 sm:mb-4`}>
          {getPlatformIcon(service.slug)}
        </div>

        {/* TITLE */}
        <h3 className="text-xs sm:text-lg font-semibold text-gray-800">
          {service.name}
        </h3>

        {/* DESKTOP CONTENT ONLY */}
        <div className="hidden sm:block">
          <p className="text-gray-500 text-sm mt-2 mb-4">
            {service.description}
          </p>

          <div className={`flex items-center justify-center gap-2 text-sm font-medium ${service.accentText}`}>
            <span>View Plans</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}