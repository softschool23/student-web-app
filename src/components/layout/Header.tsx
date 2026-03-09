"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { getRoutes } from "@/src/lib/routes";
import { useSidebarStore } from "@/src/lib/stores/sidebarStore";
import { useSchool } from "@/src/lib/context/SchoolContext"; // zustand store
import Logo from "../shared/Logo";
import type { StudentProfile } from "@/src/types";

interface HeaderProps {
  title: string;
  student?: StudentProfile;
}

const Header = ({ title, student }: HeaderProps) => {
  const { toggleOpen } = useSidebarStore();
  const { shortName, school } = useSchool();
  const routes = getRoutes(shortName);

  const displayName = student
    ? `${student.firstName} ${student.lastName}`.trim()
    : null;
  const initials = displayName
    ? displayName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 py-4 md:py-5 lg:py-[15px]">
        {/* Mobile Menu Button + Page Title */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleOpen}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 -ml-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <Logo
            size="sm"
            className="hidden lg:block"
            logoUrl={school.logo}
            alt={school.name}
          />
        </div>

        {/* User Avatar */}
        <Link
          href={routes.main.profile}
          className="flex items-center gap-2 md:gap-3 group"
        >
          <div className="text-right hidden sm:block">
            {displayName ? (
              <>
                <p className="text-xs md:text-sm lg:text-[16px] font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors capitalize">
                  {displayName}
                </p>
                <p className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-wide">
                  {student?.studentNumber}
                </p>
              </>
            ) : (
              <p className="text-xs md:text-sm lg:text-[16px] font-medium text-muted-foreground">
                Loading...
              </p>
            )}
          </div>
          <div
            className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0",
              "bg-primary-500 text-white font-semibold text-sm md:text-base",
              "group-hover:bg-primary-600 dark:group-hover:bg-primary-400 transition-colors cursor-pointer",
            )}
            title="View Profile"
          >
            {initials}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
