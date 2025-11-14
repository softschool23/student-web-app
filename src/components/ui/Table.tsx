"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { LucideIcon } from "lucide-react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
}

interface EmptyStateProps {
  icon?: LucideIcon;
  message?: string;
  colSpan: number;
  className?: string;
}

interface TableContainerProps {
  children: React.ReactNode;
  pagination?: React.ReactNode;
  className?: string;
}

// Main Table
const Table = ({ children, className }: TableProps) => {
  return <table className={cn("w-full", className)}>{children}</table>;
};

// Table Header
const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <thead
      className={cn(
        "bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {children}
    </thead>
  );
};

// Table Body
const TableBody = ({ children, className }: TableBodyProps) => {
  return (
    <tbody
      className={cn("divide-y divide-gray-200 dark:divide-gray-800", className)}
    >
      {children}
    </tbody>
  );
};

// Table Row
const TableRow = ({
  children,
  className,
  onClick,
  hoverable = true,
}: TableRowProps) => {
  return (
    <tr
      onClick={onClick}
      className={cn(
        hoverable && "hover:bg-gray-50 dark:hover:bg-gray-800/50",
        "transition-colors",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </tr>
  );
};

// Table Head Cell
const TableHead = ({ children, className, align = "left" }: TableHeadProps) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <th
      className={cn(
        "px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
        alignClass[align],
        className
      )}
    >
      {children}
    </th>
  );
};

// Table Cell
const TableCell = ({
  children,
  className,
  align = "left",
  colSpan,
}: TableCellProps) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <td
      colSpan={colSpan}
      className={cn("px-6 py-4", alignClass[align], className)}
    >
      {children}
    </td>
  );
};

// Empty State Component
const TableEmptyState = ({
  icon: Icon,
  message = "No data found",
  colSpan,
  className,
}: EmptyStateProps) => {
  return (
    <TableRow hoverable={false}>
      <TableCell
        colSpan={colSpan}
        align="center"
        className={cn("py-12", className)}
      >
        {Icon && (
          <Icon className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
        )}
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </TableCell>
    </TableRow>
  );
};

// Table Container with Pagination
const TableContainer = ({
  children,
  pagination,
  className,
}: TableContainerProps) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">{children}</div>
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
          {pagination}
        </div>
      )}
    </div>
  );
};

// Export all components
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmptyState,
  TableContainer,
};

export default Table;
