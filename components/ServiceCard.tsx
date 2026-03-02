

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
      return <FaTiktok className={`${base} text-black`} />;
    case 'twitter':
      return <FaXTwitter className={`${base} text-black`} />;
    case 'spotify':
      return <FaSpotify className={`${base} text-green-600`} />;
    default:
      return null;
  }
}

function getGradient(slug: string) {
  switch (slug) {
    case 'instagram':
      return "from-pink-600 to-purple-600";
    case 'youtube':
      return "from-red-600 to-red-700";
    case 'facebook':
      return "from-blue-600 to-blue-700";
    case 'tiktok':
      return "from-gray-900 to-black";
    case 'twitter':
      return "from-gray-700 to-gray-800";
    case 'spotify':
      return "from-green-600 to-green-700";
    default:
      return "from-slate-700 to-slate-800";
  }
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/${service.slug}`} className="block">
      <div
        className={`
          flex flex-col items-center justify-center text-center
          p-3 sm:p-6
          rounded-xl
          bg-gradient-to-br ${getGradient(service.slug)}
          border border-white/10
          hover:border-white/20
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg
        `}
      >
        {/* ICON */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white shadow mb-2 sm:mb-4">
          {getPlatformIcon(service.slug)}
        </div>

        {/* TITLE */}
        <h3 className="text-xs sm:text-lg font-semibold text-white">
          {service.name}
        </h3>

        {/* DESKTOP CONTENT ONLY */}
        <div className="hidden sm:block">
          <p className="text-white/90 text-sm mt-2 mb-4">
            {service.description}
          </p>

          <div className="flex items-center justify-between text-sm font-medium text-white">
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