"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close sheet when routing changes
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col">
        <SheetHeader className="text-left border-b pb-4">
          <SheetTitle className="text-xl">ShareWardrobe</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto py-4">
          <Accordion type="single" collapsible className="w-full h-full">
            <AccordionItem value="shop" className="border-b-0">
              <AccordionTrigger className="text-base font-medium py-3">Shop</AccordionTrigger>
              <AccordionContent className="pb-4 pl-4 flex flex-col gap-3">
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
                <Link href="/new-arrivals" className="text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
                <Link href="/sale" className="text-destructive font-medium hover:opacity-80 transition-opacity">Sale</Link>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="categories" className="border-b-0">
              <AccordionTrigger className="text-base font-medium py-3">Categories</AccordionTrigger>
              <AccordionContent className="pb-4 pl-4 flex flex-col gap-3">
                <Link href="/categories/women" className="text-muted-foreground hover:text-foreground transition-colors">Women</Link>
                <Link href="/categories/men" className="text-muted-foreground hover:text-foreground transition-colors">Men</Link>
                <Link href="/categories/accessories" className="text-muted-foreground hover:text-foreground transition-colors">Accessories</Link>
                <Link href="/categories/footwear" className="text-muted-foreground hover:text-foreground transition-colors">Footwear</Link>
              </AccordionContent>
            </AccordionItem>
            
            <div className="py-3">
              <Link href="/about" className="text-base font-medium block hover:underline">
                About Us
              </Link>
            </div>
          </Accordion>
        </div>
        
        <div className="border-t pt-4 mt-auto flex items-center justify-between">
          <ThemeToggle />
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign up</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
