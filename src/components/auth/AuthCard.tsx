"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  className,
}: AuthCardProps) {
  return (
    <Card className={cn("w-full max-w-md mx-auto border-none shadow-xl bg-white/90 backdrop-blur-sm", className)}>
      <CardHeader className="space-y-3 text-center">
        <div className="flex justify-center mb-2">
          {/* Default Logo Placeholder */}
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
            <span className="text-pink-600 font-bold text-xl">W</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">{title}</CardTitle>
        {description && <CardDescription className="text-gray-500">{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {(footerText || footerLinkText) && (
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {footerText}{" "}
            {footerLinkText && footerLinkHref && (
              <Link href={footerLinkHref} className="font-medium text-pink-600 hover:text-pink-500 hover:underline transition-colors">
                {footerLinkText}
              </Link>
            )}
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
