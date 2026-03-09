"use client";

import { usePathname } from "next/navigation";

import Sidebar from "@/src/components/layout/Sidebar";
import Header from "@/src/components/layout/Header";
import { cn } from "@/src/lib/utils";
import { useMe } from "@/src/lib/queries/useMe";

const getPageTitle = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);

  // segments[0] is the shortName, so page segments start at index 1
  const pageSegments = segments.slice(1);

  if (pageSegments.length === 0 || pageSegments[0] === "dashboard") {
    return "Dashboard";
  }

  // Convert pathname to title (e.g., /nis/subjects -> Subjects)
  const mainSegment = pageSegments[0];
  const subSegment = pageSegments[1];

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
  const { data: student } = useMe();

  return (
    <div className="h-screen bg-background dark:bg-gray-950 flex flex-col overflow-hidden">
      {/* Header */}
      <Header title={pageTitle} student={student} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div
          className={cn(
            "flex-1 flex flex-col overflow-hidden transition-all duration-300",
            "w-full lg:w-auto",
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
