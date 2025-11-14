"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide -mb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap",
                "text-sm md:text-base font-medium",
                isActive
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-600 dark:text-gray-400",
                !tab.disabled &&
                  !isActive &&
                  "hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600",
                tab.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              {tab.badge !== undefined && tab.badge !== "" && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                    isActive
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface TabPanelProps {
  children: ReactNode;
  value: string;
  activeTab: string;
}

export const TabPanel = ({ children, value, activeTab }: TabPanelProps) => {
  if (value !== activeTab) return null;

  return <div className="animate-in fade-in duration-200">{children}</div>;
};
