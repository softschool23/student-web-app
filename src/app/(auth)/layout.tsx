import { ReactNode } from "react";
import { Logo } from "@/src/components";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-lg flex flex-col items-center gap-6">
        <Logo size="lg" priority />

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
