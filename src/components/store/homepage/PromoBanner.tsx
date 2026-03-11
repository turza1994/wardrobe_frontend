import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PromoBanner() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] my-16 md:my-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop"
          alt="Festive Collection Sale"
          fill
          className="object-cover object-[center_30%]"
        />
        {/* Soft elegant overlay */}
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center">
        <div className="max-w-xl text-white">
          <span className="text-sm md:text-base font-semibold tracking-widest uppercase mb-4 block text-white/90">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight mb-6 leading-none">
            Up to 50% Off Festive Collection
          </h2>
          <p className="text-base md:text-lg mb-8 font-light text-white/80">
            Elevate your wardrobe with our latest arrivals. Free shipping on all orders over ৳2000.
          </p>
          <Button 
            asChild
            size="lg" 
            className="rounded-none bg-white text-black hover:bg-white/90 transition-all font-medium px-8 h-12"
          >
            <Link href="/products?category=festive&sale=true">
              Shop The Sale
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
