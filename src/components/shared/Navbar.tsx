"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MobileNavigation />
            
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                ShareWardrobe
              </span>
            </Link>
            
            <div className="hidden md:ml-6 md:block">
              <DesktopNavigation />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4 md:justify-end">
            <div className="hidden sm:flex relative w-full max-w-sm items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full bg-muted/50 pl-9 md:w-[300px] lg:w-[400px]"
              />
            </div>
            
            <ThemeToggle />

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative group">
                <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                  variant="destructive"
                >
                  3
                </Badge>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="ghost" size="icon" className="group">
                <User className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
