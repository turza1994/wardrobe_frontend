"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OTPInput } from "./OTPInput";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/authStore";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must contain only digits"),
});

type OTPValues = z.infer<typeof otpSchema>;

export function OTPVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile");
  
  const [isLoading, setIsLoading] = useState(false);
  const setTokens = useAuthStore((state) => state.setTokens);

  const form = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: OTPValues) {
    if (!mobile) {
      toast.error("Mobile number is missing. Please register again.");
      router.push("/auth/register");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.verifyOtp({ mobile, otp: data.otp });
      setTokens(response.accessToken, response.refreshToken, response.user);
      
      toast.success("Verification successful!");
      
      // Redirect based on role
      if (response.user.role === "customer") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Handle case where mobile is missing in search params
  if (!mobile) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-500">Invalid verification request.</p>
        <Button variant="outline" onClick={() => router.push("/auth/register")}>
          Go back to Register
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center text-sm text-gray-500 mb-6">
          <p>We've sent a 6-digit code to</p>
          <p className="font-semibold text-gray-900 mt-1">{mobile}</p>
        </div>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <OTPInput 
                  value={field.value} 
                  onChange={field.onChange} 
                  disabled={isLoading} 
                />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-full py-6 mt-6 transition-all hover:shadow-md"
          disabled={isLoading || form.watch("otp").length !== 6}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Account
        </Button>
      </form>
    </Form>
  );
}
