"use client";

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string; // Additional class for the wrapper
  disabled?: boolean;
}

export function OTPInput({ value, onChange, maxLength = 6, className, disabled }: OTPInputProps) {
  return (
    <div className={cn("flex justify-center w-full", className)}>
      <InputOTP
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <InputOTPGroup className="gap-2">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={cn(
                "w-12 h-14 text-xl sm:w-14 sm:h-16 sm:text-2xl rounded-md border-gray-200 shadow-sm",
                "focus-visible:ring-pink-500 focus-visible:border-pink-500 bg-white"
              )}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
