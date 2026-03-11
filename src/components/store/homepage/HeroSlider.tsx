'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Lifestyle high-quality fashion images (placeholders using Unsplash)
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop', // Woman in stylish dress outdoord
    title: 'New Summer Elegance',
    subtitle: 'Discover light, breathable fabrics designed for the modern woman. Perfect for your sunlit days and warm evenings.',
    cta: 'Explore Collection',
    href: '/products?category=dresses',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1583391733958-d25e6192d3e0?q=80&w=1974&auto=format&fit=crop', // Elegant ethnic/traditional wear
    title: 'Timeless Ethnic Charm',
    subtitle: 'Embrace heritage with our hand-crafted sarees and festive wear. Bring elegance to every celebration.',
    cta: 'Shop Ethnic',
    href: '/products?category=ethnic',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop', // High fashion model portrait
    title: 'The Signature Series',
    subtitle: 'Curated premium styles that define confidence. Stand out with our exclusive western wear collection.',
    cta: 'View Premium',
    href: '/products?category=western',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1974&auto=format&fit=crop', // Accessories/Jewelry focus
    title: 'Complete Your Look',
    subtitle: 'Minimalist jewelry and statement bags to elevate your everyday outfit.',
    cta: 'Shop Accessories',
    href: '/products?category=accessories',
  },
];

const AUTOPLAY_INTERVAL = 6000;

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section 
      className="relative w-full h-[100dvh] overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out z-0",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Background Image with Ken Burns effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className={cn(
                "object-cover object-[center_20%] transition-transform duration-[10000ms] ease-out",
                index === currentSlide ? "scale-105" : "scale-100"
              )}
              sizes="100vw"
            />
          </div>

          {/* Overlay Gradient (darker at bottom to ensure text readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
            <div className="max-w-2xl text-white">
              <div
                className={cn(
                  "overflow-hidden transition-all duration-700 delay-100 opacity-0 translate-y-8",
                  index === currentSlide && "opacity-100 translate-y-0"
                )}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight mb-4">
                  {slide.title}
                </h1>
              </div>
              
              <div
                className={cn(
                  "overflow-hidden transition-all duration-700 delay-300 opacity-0 translate-y-8",
                  index === currentSlide && "opacity-100 translate-y-0"
                )}
              >
                <p className="text-base md:text-xl text-white/90 mb-8 max-w-lg font-light leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-700 delay-500 opacity-0 translate-y-8",
                  index === currentSlide && "opacity-100 translate-y-0"
                )}
              >
                <Button 
                  asChild
                  size="lg" 
                  className="rounded-none bg-white text-black hover:bg-white/90 hover:scale-105 transition-all w-full sm:w-auto text-base tracking-wide h-14 px-8 border border-white"
                >
                  <Link href={slide.href}>
                    {slide.cta}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (Desktop) */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-10 pointer-events-none hidden md:flex">
        <button
          onClick={prevSlide}
          className="pointer-events-auto rounded-full w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 opacity-0 md:group-hover:opacity-100 border border-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto rounded-full w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all duration-300 opacity-0 md:group-hover:opacity-100 border border-white/10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-1 transition-all duration-300 ease-out",
              index === currentSlide
                ? "w-8 bg-white opacity-100"
                : "w-2 bg-white/50 hover:bg-white/80 opacity-60 rounded-full"
            )}
            style={{ 
              borderRadius: index === currentSlide ? '4px' : '9999px' 
            }}
          />
        ))}
      </div>
    </section>
  );
}
