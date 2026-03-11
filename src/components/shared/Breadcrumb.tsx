'use client';
"use client";

import * as React from "react";
import Link from "next/link";

import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrentPage = item.isCurrentPage || isLast;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href || "#"}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
