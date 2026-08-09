import type { ElementType } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  Receipt,
} from "lucide-react";

import { getRoutes } from "@/src/lib/routes";
import {
  StudentOrganisationType,
  type StudentProfile,
} from "@/src/types";

export interface StudentPortalSubNavItem {
  label: string;
  href: string;
  icon?: ElementType;
}

export interface StudentPortalNavItem {
  label: string;
  href: string;
  icon: ElementType;
  children?: StudentPortalSubNavItem[];
}

interface StudentPortalAccess {
  navItems: StudentPortalNavItem[];
  allowedRoutes: string[];
}

export const getStudentOrganisationType = (student?: {
  org_type?: unknown;
}): StudentOrganisationType =>
  student?.org_type === StudentOrganisationType.College
    ? StudentOrganisationType.College
    : StudentOrganisationType.K12;

export const getStudentIdentifier = (student: StudentProfile): string =>
  student.org_type === StudentOrganisationType.College
    ? student.registrationNumber
    : student.studentNumber;

export const getStudentPortalAccess = (
  shortName: string,
  organisationType: StudentOrganisationType,
): StudentPortalAccess => {
  const routes = getRoutes(shortName);

  if (organisationType === StudentOrganisationType.College) {
    const navItems: StudentPortalNavItem[] = [
      {
        label: "Dashboard",
        href: routes.main.dashboard,
        icon: LayoutDashboard,
      },
      {
        label: "Course Registration",
        href: routes.main.courseRegistration,
        icon: ClipboardCheck,
      },
    ];

    return {
      navItems,
      allowedRoutes: navItems.map((item) => item.href),
    };
  }

  const navItems: StudentPortalNavItem[] = [
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
      label: "Holidays",
      href: routes.main.holidays,
      icon: Calendar,
    },
  ];

  return {
    navItems,
    allowedRoutes: navItems.map((item) => item.href),
  };
};

export const isStudentPortalRouteAllowed = (
  pathname: string,
  allowedRoutes: string[],
): boolean =>
  allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
