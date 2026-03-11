import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Carefully curated materials for lasting elegance."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable shipping across Bangladesh."
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy."
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout with SSL encryption."
  }
];

export function BrandValues() {
  return (
    <section className="py-16 bg-muted/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm border border-border/50 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-foreground/80 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-[250px]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
