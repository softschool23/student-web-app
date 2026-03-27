"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  BookOpen,
  Calendar,
  UserCheck,
  FileText,
  Award,
  Receipt,
} from "lucide-react";

import { getRoutes } from "@/src/lib/routes";
import { useSidebarStore } from "@/src/lib/stores/sidebarStore";
import { useSchool } from "@/src/lib/context/SchoolContext"; // zustand store

interface SubNavItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  children?: SubNavItem[];
}

const Sidebar = () => {
  const { shortName } = useSchool();
  const routes = getRoutes(shortName);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: routes.main.dashboard,
      icon: LayoutDashboard,
    },
    {
      label: "Subjects",
      href: routes.main.subjects,
      icon: BookOpen,
    },
    {
      label: "Assignments",
      href: routes.main.assignments,
      icon: FileText,
    },
    {
      label: "Results",
      href: routes.main.results,
      icon: Award,
    },
    {
      label: "Invoices",
      href: routes.main.invoices,
      icon: Receipt,
    },
    {
      label: "Attendance",
      href: routes.main.attendance,
      icon: UserCheck,
    },
    {
      label: "Holidays",
      href: routes.main.holidays,
      icon: Calendar,
    },
  ];
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { isOpen, isCollapsed, toggleCollapsed, setOpen } = useSidebarStore();

  // Close mobile sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, setOpen]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isParentActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white dark:bg-gray-900 h-screen sticky top-0 flex flex-col border-r border-gray-200 dark:border-gray-700",
          "transition-all duration-300 ease-in-out",
          // Mobile: slide in from left
          "fixed lg:sticky z-50 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop: collapse functionality
          isCollapsed ? "lg:w-20" : "lg:w-64",
          // Always full width on mobile when open
          "w-64",
        )}
      >
        {/* Header with Logo and Close/Toggle buttons */}
        <div
          className={cn(
            "px-4 lg:px-6 border-b lg:hidden border-gray-200 dark:border-gray-700 flex items-center justify-between",
            isCollapsed ? "py-[27px]" : "py-[26px]",
          )}
        >
          {/* Mobile Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Desktop Collapse Toggle */}
        <button
          onClick={toggleCollapsed}
          className={cn(
            "hidden lg:block p-2 rounded-lg absolute right-0 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all",
            isCollapsed && "mx-auto",
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight className="w-5 h-5" />
          ) : (
            <ChevronsLeft className="w-5 h-5" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 lg:py-6 px-2 lg:px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isItemActive = isParentActive(item);
              const isExpanded = expandedItems.includes(item.label);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <li key={item.label}>
                  {/* Main Nav Item */}
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg",
                        "text-sm font-medium transition-all duration-200",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        isItemActive
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300",
                        isCollapsed && "lg:justify-center",
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 shrink-0" />
                        <span
                          className={cn(
                            "transition-opacity duration-300",
                            isCollapsed && "lg:hidden",
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                      {!isCollapsed && (
                        <>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg",
                        "text-sm font-medium transition-all duration-200",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        isItemActive
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300",
                        isCollapsed && "lg:justify-center",
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span
                        className={cn(
                          "transition-opacity duration-300",
                          isCollapsed && "lg:hidden",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )}

                  {/* Sub Nav Items */}
                  {hasChildren && !isCollapsed && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                        {item.children?.map((child) => {
                          const ChildIcon = child.icon;
                          const isChildActive = isActive(child.href);

                          return (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg",
                                  "text-sm transition-all duration-200",
                                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                                  isChildActive
                                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium"
                                    : "text-gray-600 dark:text-gray-400",
                                )}
                              >
                                {ChildIcon && <ChildIcon className="w-4 h-4" />}
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
