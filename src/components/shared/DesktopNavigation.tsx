"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const categories = [
  { title: "Women", href: "/categories/women", description: "Dresses, tops, pants, and more for women." },
  { title: "Men", href: "/categories/men", description: "Shirts, pants, jackets, and more for men." },
  { title: "Accessories", href: "/categories/accessories", description: "Bags, jewelry, hats, and other accessories." },
  { title: "Footwear", href: "/categories/footwear", description: "Sneakers, boots, heels, and everyday shoes." },
];

export function DesktopNavigation() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/products"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Latest Collection
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Discover the newest arrivals and seasonal trends curated just for you.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <ListItem href="/sale" title="On Sale">
                  Get up to 50% off on selected styles.
                </ListItem>
              </li>
              <li>
                <ListItem href="/new-arrivals" title="New Arrivals">
                  Fresh fashion added daily.
                </ListItem>
              </li>
              <li>
                <ListItem href="/brands" title="Top Brands">
                  Shop your favorite designer labels.
                </ListItem>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
