'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Zap, TrendingUp, Star } from 'lucide-react';

interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string | null;
  backgroundColor: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
}

const FALLBACK_BANNERS: BannerData[] = [
  {
    id: 'hero-1',
    title: 'Boost Your Social Presence',
    subtitle: 'Get real followers, likes & views delivered instantly. Trusted by 50,000+ customers across India.',
    buttonText: 'Get Started →',
    buttonLink: '/instagram',
    imageUrl: null,
    backgroundColor: 'from-violet-600 via-indigo-600 to-blue-700',
    icon: <TrendingUp className="w-5 h-5" />,
    accentColor: 'bg-white text-indigo-700 hover:bg-indigo-50',
    glowColor: 'bg-indigo-400',
  },
  {
    id: 'hero-2',
    title: 'Instagram Growth Made Easy',
    subtitle: 'Real Indian followers, organic likes & story views. No password needed — 100% safe & secure.',
    buttonText: 'View Plans →',
    buttonLink: '/instagram',
    imageUrl: null,
    backgroundColor: 'from-pink-600 via-rose-600 to-orange-500',
    icon: <Sparkles className="w-5 h-5" />,
    accentColor: 'bg-white text-rose-600 hover:bg-rose-50',
    glowColor: 'bg-rose-400',
  },
  {
    id: 'hero-3',
    title: 'Flash Sale — Flat 30% Off',
    subtitle: 'Limited time offer on all Instagram & YouTube packages. Order now before the deal expires!',
    buttonText: 'Shop Now →',
    buttonLink: '/instagram',
    imageUrl: null,
    backgroundColor: 'from-amber-500 via-orange-500 to-red-600',
    icon: <Zap className="w-5 h-5" />,
    accentColor: 'bg-white text-orange-700 hover:bg-orange-50',
    glowColor: 'bg-amber-400',
  },
];

export default function Banner() {
  const [banners] = useState<BannerData[]>(FALLBACK_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % banners.length);
  }, [currentIndex, banners.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + banners.length) % banners.length);
  }, [currentIndex, banners.length, goToSlide]);

  // Auto-play
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [banners.length, isPaused, nextSlide]);

  if (banners.length === 0) return null;

  const banner = banners[currentIndex];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
        {/* Main banner area */}
        <div
          className={`relative w-full bg-gradient-to-br ${banner.backgroundColor} transition-all duration-700 ease-in-out`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large glow circle */}
            <div
              className={`absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 ${banner.glowColor} rounded-full opacity-20 blur-3xl`}
            />
            {/* Small glow circle */}
            <div
              className={`absolute -bottom-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 ${banner.glowColor} rounded-full opacity-15 blur-3xl`}
            />
            {/* Dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Floating shapes */}
            <div className="absolute top-8 right-[15%] w-3 h-3 bg-white/20 rounded-full animate-pulse" />
            <div className="absolute bottom-12 right-[25%] w-2 h-2 bg-white/15 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 left-[10%] w-2.5 h-2.5 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Content */}
          <div className="relative z-10 px-5 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 flex flex-col justify-center min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full">
                {banner.icon}
                <span>SocialBoost</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Services Live
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight max-w-xl mb-2 sm:mb-3">
              {banner.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium leading-relaxed max-w-lg mb-5 sm:mb-6">
              {banner.subtitle}
            </p>

            {/* CTA + Trust badge row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                href={banner.buttonLink}
                className={`inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 ${banner.accentColor} font-bold rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]`}
              >
                {banner.buttonText}
              </Link>

              <div className="flex items-center gap-1.5 text-white/60 text-[11px] sm:text-xs">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="ml-1 font-medium">4.9/5</span>
                <span className="hidden sm:inline">• Trusted by 50K+ users</span>
              </div>
            </div>
          </div>

          {/* Right-side floating stats card (desktop only) */}
          <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-2.5">
            {[
              { value: '50K+', label: 'Customers', icon: '👥' },
              { value: '99%', label: 'Delivery', icon: '⚡' },
              { value: '24/7', label: 'Support', icon: '💬' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 flex items-center gap-3 min-w-[150px] hover:bg-white/15 transition-colors duration-300"
              >
                <span className="text-xl">{stat.icon}</span>
                <div>
                  <div className="text-white font-bold text-sm">{stat.value}</div>
                  <div className="text-white/50 text-[10px] font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 z-20"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 z-20"
              aria-label="Next banner"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}
      </div>

      {/* Carousel dots */}
      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-3 sm:mt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-400 ${index === currentIndex
                  ? 'bg-indigo-500 w-7 sm:w-8'
                  : 'bg-slate-300 hover:bg-slate-400 w-1.5 sm:w-2'
                }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
