'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
}

export default function Banner() {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners');
        const result = await response.json();
        if (result.success && result.data) {
          setBanners(result.data);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading || banners.length === 0) {
    return (
      <div className="w-full h-48 sm:h-64 md:h-80 bg-gradient-to-r from-slate-700 to-slate-800 animate-pulse" />
    );
  }

  const banner = banners[currentIndex];

  return (
    <div className="w-full">
      {/* Main Banner Carousel */}
      <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl">
        {/* Banner Background with gradient overlay */}
        <div
          className={`relative w-full h-48 sm:h-64 md:h-96 bg-gradient-to-r ${banner.backgroundColor} flex items-center justify-center overflow-hidden`}
        >
          {/* Background Image - Hidden on mobile, visible on larger screens */}
          {banner.imageUrl && (
            <div className="absolute inset-0 opacity-40 sm:opacity-60">
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content Container - Responsive layout */}
          <div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 sm:gap-6">
            {/* Left side - Image (visible only on desktop) */}
            <div className="hidden sm:flex sm:w-1/3 md:w-2/5 h-full items-center justify-start">
              {banner.imageUrl && (
                <div className="relative w-full h-full">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              )}
            </div>

            {/* Right side - Text Content */}
            <div className="flex-1 sm:w-2/3 md:w-3/5 flex flex-col justify-center items-start sm:items-center md:items-start gap-2 sm:gap-4">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-200 uppercase tracking-wide leading-tight text-balance">
                {banner.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-white font-semibold uppercase leading-tight text-balance">
                {banner.subtitle}
              </p>

              {/* CTA Button */}
              <Link
                href={banner.buttonLink}
                className="mt-3 sm:mt-4 px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-black text-white font-bold rounded-full hover:bg-slate-900 transition-colors duration-300 text-sm sm:text-base md:text-lg whitespace-nowrap"
              >
                {banner.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators - Only show if multiple banners */}
      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-3 sm:mt-4 px-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? 'bg-blue-500 w-6 sm:w-8'
                  : 'bg-slate-400 hover:bg-slate-500'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
