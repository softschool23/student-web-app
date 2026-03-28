"use client";

import { ReactNode } from "react";
import { Logo } from "@/src/components";
import { useSchool } from "@/src/lib/context/SchoolContext"; // zustand store

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { school } = useSchool();

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg flex flex-col items-center gap-6 px-4">
        <Logo size="lg" priority logoUrl={school.logo} alt={school.name} />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
