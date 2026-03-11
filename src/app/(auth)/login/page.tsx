import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ShareWardrobe",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Enter your mobile number and password to login"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthCard>
  );
}
