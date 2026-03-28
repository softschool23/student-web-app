"use client";

import { use } from "react";
import { useSchoolInfo } from "@/src/lib/queries/useSchoolInfo";
import { useSchoolStore } from "@/src/lib/context/SchoolContext";
import { AlertCircle, RefreshCw } from "lucide-react";
import Image from "next/image";

interface ShortNameLayoutProps {
  children: React.ReactNode;
  params: Promise<{ shortName: string }>;
}

const SchoolLoadingScreen = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 animate-fade-in-out">
      <Image
        className="inset-0 object-cover"
        src={"/logo-loader.png"}
        alt="soft school"
        width={50}
        height={50}
      />
    </div>
  </div>
);

interface SchoolErrorScreenProps {
  shortName: string;
  message?: string;
}

const SchoolErrorScreen = ({ shortName, message }: SchoolErrorScreenProps) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="max-w-md w-full text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">School Not Found</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          {message ??
            `We couldn't load the portal for "${shortName}". Please check the school code and try again.`}
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  </div>
);

const ShortNameLayout = ({ children, params }: ShortNameLayoutProps) => {
  const { shortName } = use(params);
  const { data: school, isLoading, isError, error } = useSchoolInfo(shortName);
  const setSchool = useSchoolStore((s) => s.setSchool);

  if (isLoading) return <SchoolLoadingScreen />;

  if (isError || !school) {
    const axiosError = error as { response?: { status?: number } } | null;
    const is404 = axiosError?.response?.status === 404;
    return (
      <SchoolErrorScreen
        shortName={shortName}
        message={
          is404
            ? `No school found with the code "${shortName}". Please verify the link you were given.`
            : undefined
        }
      />
    );
  }

  // Set store synchronously before children render so useSchool() always has data
  setSchool(school, shortName);

  return <>{children}</>;
};

export default ShortNameLayout;
