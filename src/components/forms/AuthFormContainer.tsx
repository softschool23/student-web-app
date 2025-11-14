"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface AuthFormContainerProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

const AuthFormContainer = ({
  children,
  onSubmit,
  className,
}: AuthFormContainerProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "p-6 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl lg:rounded-4xl flex flex-col gap-3 md:gap-4 w-full bg-white dark:bg-gray-800 shadow-lg",
        className
      )}
    >
      {children}
    </form>
  );
};

export default AuthFormContainer;
