import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { OTPVerificationForm } from "@/components/auth/OTPVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP | ShareWardrobe",
};

export default function VerifyOtpPage() {
  return (
    <AuthCard
      title="Verify Your Mobile"
      description="Enter the 6-digit code sent to your mobile number"
    >
      <Suspense fallback={<div className="text-center py-6 text-pink-600 animate-pulse">Loading verification details...</div>}>
        <OTPVerificationForm />
      </Suspense>
    </AuthCard>
  );
}
