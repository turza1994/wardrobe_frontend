"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPInputFormProps {
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

export function OTPInputForm({ onComplete, disabled }: OTPInputFormProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        onComplete={onComplete}
        disabled={disabled}
        autoFocus
      >
        <InputOTPGroup className="gap-2">
          <InputOTPSlot index={0} className="w-12 h-14 text-xl rounded-md border" />
          <InputOTPSlot index={1} className="w-12 h-14 text-xl rounded-md border" />
          <InputOTPSlot index={2} className="w-12 h-14 text-xl rounded-md border" />
          <InputOTPSlot index={3} className="w-12 h-14 text-xl rounded-md border" />
          <InputOTPSlot index={4} className="w-12 h-14 text-xl rounded-md border" />
          <InputOTPSlot index={5} className="w-12 h-14 text-xl rounded-md border" />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm text-muted-foreground mt-2">
        Enter the 6-digit code sent to your phone.
      </div>
    </div>
  );
}
