"use client";

import { usePathname } from "next/navigation";

import Sidebar from "@/src/components/layout/Sidebar";
import Header from "@/src/components/layout/Header";
import { cn } from "@/src/lib/utils";

const getPageTitle = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0 || segments[0] === "dashboard") {
    return "Dashboard";
  }

  // Convert pathname to title (e.g., /users/all -> Users - All)
  const mainSegment = segments[0];
  const subSegment = segments[1];

  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (subSegment) {
    return `${formatSegment(mainSegment)} - ${formatSegment(subSegment)}`;
  }

  return formatSegment(mainSegment);
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="h-screen bg-background dark:bg-gray-950 flex flex-col overflow-hidden">
      {/* Header */}
      <Header title={pageTitle} userEmail="user@example.com" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div
          className={cn(
            "flex-1 flex flex-col overflow-hidden transition-all duration-300",
            "w-full lg:w-auto"
          )}
        >
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 lg:p-8 space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
