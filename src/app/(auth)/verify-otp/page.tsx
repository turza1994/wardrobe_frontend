'use client';

import { useSearchParams } from 'next/navigation';
import { OTPInputForm } from '@/components/auth/OTPInputForm';
import { Suspense } from 'react';

// TODO: Design OTP verification page
function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') ?? '';

  return (
    <div>
      <h1>Verify OTP</h1>
      <p>Sent to: {mobile}</p>
      <OTPInputForm onComplete={(otp) => console.log('OTP:', otp)} />
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
