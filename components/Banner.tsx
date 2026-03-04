'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string | null;
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
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Skeleton while loading
  if (loading) {
    return (
      <div className="w-full rounded-xl overflow-hidden border border-gray-200 bg-white">
        <div className="relative w-full h-48 sm:h-64 md:h-80 bg-gray-100 flex items-center px-6 sm:px-10 gap-6">
          {/* Left: image placeholder */}
          <div className="hidden sm:block w-1/3 h-3/4 bg-gray-200 rounded-lg animate-pulse" />
          {/* Right: text + button placeholders */}
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <div className="h-5 sm:h-7 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 sm:h-5 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 sm:h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 sm:h-12 w-40 sm:w-48 bg-gray-200 rounded-full animate-pulse mt-2" />
          </div>
        </div>
        {/* Carousel dots placeholder */}
        <div className="flex justify-center gap-2 py-3">
          <div className="h-2.5 w-7 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-2.5 w-2.5 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-2.5 w-2.5 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  // Hide entirely if no active banners
  if (banners.length === 0) {
    return null;
  }

  const banner = banners[currentIndex];

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl shadow-md">
        <div
          className={`relative w-full h-48 sm:h-64 md:h-96 bg-gradient-to-r ${banner.backgroundColor} flex items-center justify-center overflow-hidden`}
        >
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

          <div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 sm:gap-6">
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

            <div className="flex-1 sm:w-2/3 md:w-3/5 flex flex-col justify-center items-start sm:items-center md:items-start gap-2 sm:gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-200 uppercase tracking-wide leading-tight text-balance">
                {banner.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white font-semibold uppercase leading-tight text-balance">
                {banner.subtitle}
              </p>

              <Link
                href={banner.buttonLink}
                className="mt-3 sm:mt-4 px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-600 transition-colors duration-300 text-sm sm:text-base md:text-lg whitespace-nowrap shadow-md"
              >
                {banner.buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-3 sm:mt-4 px-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-amber-500 w-6 sm:w-8'
                : 'bg-gray-300 hover:bg-gray-400 w-2 sm:w-3'
                }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
