import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { InvoiceSummary } from "@/src/types";

interface InvoiceSummaryCardProps {
  summary: InvoiceSummary;
  totalInvoices: number;
}

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const InvoiceSummaryCard = ({
  summary,
  totalInvoices,
}: InvoiceSummaryCardProps) => {
  const stats = [
    {
      label: "Total Billed",
      value: formatAmount(summary.totalAmount),
      icon: DollarSign,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Total Paid",
      value: formatAmount(summary.totalPaid),
      icon: TrendingUp,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Outstanding",
      value: formatAmount(summary.totalOutstanding),
      icon: AlertCircle,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Summary
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {totalInvoices} invoice{totalInvoices !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-gray-800 p-3 md:p-4"
            >
              <div className={cn("rounded-lg p-2 shrink-0", stat.bgColor)}>
                <Icon className={cn("w-5 h-5", stat.iconColor)} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {stat.label}
                </p>
                <p className="text-sm md:text-base font-bold text-gray-900 dark:text-white truncate">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvoiceSummaryCard;
