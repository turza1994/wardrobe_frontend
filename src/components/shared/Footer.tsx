import Link from "next/link";
import { Container } from "./Container";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                SW.
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Your premium peer-to-peer fashion marketplace. Buy, sell, or rent high-quality wardrobe essentials.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/categories/women" className="hover:text-foreground transition-colors">Women</Link></li>
              <li><Link href="/categories/men" className="hover:text-foreground transition-colors">Men</Link></li>
              <li><Link href="/categories/accessories" className="hover:text-foreground transition-colors">Accessories</Link></li>
              <li><Link href="/sale" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShareWardrobe. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground border-l pl-4 hidden md:flex">
            <span>Bangladesh</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30 self-center"></span>
            <span>BDT (৳)</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
