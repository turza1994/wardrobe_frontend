"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatCurrency";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  itemCount: number;
  onCheckout?: () => void;
  checkoutUrl?: string;
  isCheckoutPage?: boolean;
  className?: string;
}

export function OrderSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  total,
  itemCount,
  onCheckout,
  checkoutUrl = "/checkout",
  isCheckoutPage = false,
  className,
}: OrderSummaryProps) {
  return (
    <Card className={cn("sticky top-24", className)}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping estimate</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : formatCurrency(shipping)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax estimate</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm font-medium text-success">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        
        <Separator className="my-4" />
        
        <div className="flex justify-between text-base font-semibold">
          <span>Order Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
      
      {!isCheckoutPage && (
        <CardFooter className="flex-col gap-4">
          {onCheckout ? (
            <Button className="w-full" size="lg" onClick={onCheckout}>
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="w-full" size="lg" asChild>
              <Link href={checkoutUrl}>
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          
          <div className="flex items-center justify-center text-xs text-muted-foreground">
            <Lock className="mr-1 h-3 w-3" />
            Secure Checkout
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
