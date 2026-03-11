import { ReactNode } from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | ShareWardrobe",
  description: "Login or register to ShareWardrobe",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative background blur element */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Link href="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <MoveLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md z-10">
        {children}
      </div>
    </div>
  );
}
