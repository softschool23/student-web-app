"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { cn } from "@/src/lib/utils";
import { getRoutes } from "@/src/lib/routes";
import { useSidebarStore } from "@/src/lib/stores/sidebarStore";
import { useSchool } from "@/src/lib/context/SchoolContext";
import Logo from "../shared/Logo";
import type { StudentProfile } from "@/src/types";

interface HeaderProps {
  title: string;
  student?: StudentProfile;
}

const Header = ({ student }: HeaderProps) => {
  const { toggleOpen } = useSidebarStore();
  const { shortName, school } = useSchool();
  const routes = getRoutes(shortName);
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Remove all cookies
    Object.keys(Cookies.get()).forEach((key) => Cookies.remove(key));
    router.replace(routes.auth.login);
  };

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

        {/* User Avatar with Dropdown */}
        <div
          ref={dropdownRef}
          className="relative flex items-center gap-2 md:gap-3"
        >
          <div className="text-right hidden sm:block">
            {displayName ? (
              <>
                <p className="text-xs md:text-sm lg:text-[16px] font-medium text-gray-900 dark:text-gray-100 capitalize">
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

          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0",
              "bg-primary-500 text-white font-semibold text-sm md:text-base",
              "hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors cursor-pointer",
            )}
            title="Account"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {initials}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
              {displayName && (
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {student?.studentNumber}
                  </p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
