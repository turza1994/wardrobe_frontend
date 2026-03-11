import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | ShareWardrobe",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an Account"
      description="Join our dynamic fashion community today"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/auth/login"
    >
      <RegisterForm />
    </AuthCard>
  );
}
