"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Box, 
  LayoutDashboard, 
  Settings, 
  ShoppingBag, 
  Users 
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const adminNavigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Products", href: "/dashboard/products", icon: Box },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b h-16 flex items-center justify-center">
        <div className="flex items-center gap-2 overflow-hidden px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold">SW</span>
          </div>
          <span className="truncate font-semibold text-lg group-data-[collapsible=icon]:hidden">
            Admin Panel
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="mt-4 px-2">
          {adminNavigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  tooltip={item.name}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2 overflow-hidden group-data-[collapsible=icon]:hidden">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground truncate">admin@sharewardrobe.com</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
