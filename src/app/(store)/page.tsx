import { Suspense } from 'react';
import { HeroSlider } from '@/components/store/homepage/HeroSlider';
import { CategoryGrid } from '@/components/store/homepage/CategoryGrid';
import { FeaturedProducts } from '@/components/store/homepage/FeaturedProducts';
import { BestSellers } from '@/components/store/homepage/BestSellers';
import { PromoBanner } from '@/components/store/homepage/PromoBanner';
import { SocialProof } from '@/components/store/homepage/SocialProof';
import { BrandValues } from '@/components/store/homepage/BrandValues';
import { NewsletterSignup } from '@/components/store/homepage/NewsletterSignup';
import { getCategories, getProducts } from '@/services/product.service';

export const metadata = {
  title: 'ShareWardrobe - Modern Women\'s Fashion & Ethnic Wear',
  description: 'Discover the latest trends in women\'s fashion. Shop elegant dresses, timeless ethnic wear, jewelry, and accessories.',
};

// Data fetching components to enable streaming with Suspense
async function CategoriesSection() {
  let categories;
  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Failed to load categories', error);
    return null; // Graceful fallback
  }

  return <CategoryGrid categories={categories} />;
}

async function FeaturedSection() {
  let newArrivals;
  try {
    newArrivals = await getProducts({ 
      sort: 'newest', 
      limit: 8 
    });
  } catch (error) {
    console.error('Failed to load new arrivals', error);
    return null;
  }

  return <FeaturedProducts products={newArrivals} />;
}

async function TrendingSection() {
  let bestSellers;
  try {
    // In a real app we might fetch by 'isFeatured=true' or top sales. 
    // Here we'll simulate by fetching top rated
    bestSellers = await getProducts({ 
      sort: 'rating', 
      limit: 8 
    });
  } catch (error) {
    console.error('Failed to load best sellers', error);
    return null;
  }

  return <BestSellers products={bestSellers} />;
}

function SectionSkeleton({ height = "400px" }: { height?: string }) {
  return (
    <div 
      className="w-full bg-muted/20 animate-pulse my-12 max-w-7xl mx-auto px-4" 
      style={{ height }}
    />
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeroSlider />
      
      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <FeaturedSection />
      </Suspense>
      
      <PromoBanner />

      <Suspense fallback={<SectionSkeleton height="600px" />}>
        <TrendingSection />
      </Suspense>

      <SocialProof />
      
      <BrandValues />
      
      <NewsletterSignup />
    </div>
  );
}
