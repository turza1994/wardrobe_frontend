import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

// Using Unsplash fashion close-ups/lifestyle for insta-vibe
const instaImages = [
  'https://images.unsplash.com/photo-1434389678232-2b6d5194488b?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550614000-4b95d4ebae4e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=600&auto=format&fit=crop',
];

export function SocialProof() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-serif tracking-tight mb-3">
          #ShareWardrobeStyle
        </h2>
        <p className="text-muted-foreground font-light mb-6">
          Follow us on Instagram for daily inspiration. Tag us to be featured.
        </p>
        <Link 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors underline-offset-4 hover:underline"
        >
          <Instagram className="w-4 h-4" />
          @sharewardrobe
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
        {instaImages.map((src, idx) => (
          <Link 
            key={idx} 
            href="https://instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden bg-muted"
          >
            <Image
              src={src}
              alt={`Instagram post ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            {/* Hover overlay with Instagram Icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Instagram className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
