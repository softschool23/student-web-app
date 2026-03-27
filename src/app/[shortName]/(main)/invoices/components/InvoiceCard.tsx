"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { Invoice, InvoiceStatus, SchoolBasicInfo } from "@/src/types";
import PaymentModal from "./PaymentModal";

const DownloadReceiptButton = dynamic(() => import("./ReceiptPDF"), {
  ssr: false,
});

interface InvoiceCardProps {
  invoice: Invoice;
  school: SchoolBasicInfo;
}

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) => dayjs(date).format("D MMM YYYY");

const statusConfig: Record<
  InvoiceStatus,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  PAID: {
    label: "Paid",
    icon: CheckCircle,
    className:
      "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  },
  UNPAID: {
    label: "Unpaid",
    icon: XCircle,
    className:
      "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
  },
  PARTIALLY_PAID: {
    label: "Partial",
    icon: Clock,
    className:
      "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  },
};

const InvoiceCard = ({ invoice, school }: InvoiceCardProps) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const {
    status,
    sessionId,
    termId,
    items,
    totalAmount,
    amountPaid,
    outstandingAmount,
    createdAt,
    minimumPartialAmount,
  } = invoice;

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
            {sessionId.name} &mdash;{" "}
            <span className="capitalize">{termId.name} Term</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(createdAt)}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border w-fit",
            config.className,
          )}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Items
        </p>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {items.map((item) => (
            <div
              key={item.code}
              className="flex items-center justify-between py-1.5"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {item.title}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatAmount(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Amounts */}
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatAmount(totalAmount)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Paid</span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            {formatAmount(amountPaid)}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Outstanding</span>
          <span
            className={cn(
              "font-bold",
              outstandingAmount > 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400",
            )}
          >
            {formatAmount(outstandingAmount)}
          </span>
        </div>
        {status === "UNPAID" && minimumPartialAmount > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
            Minimum partial payment:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formatAmount(minimumPartialAmount)}
            </span>
          </p>
        )}
      </div>

      {(status === "PAID" || status === "PARTIALLY_PAID") && (
        <DownloadReceiptButton invoice={invoice} school={school} />
      )}

      {(status === "UNPAID" || status === "PARTIALLY_PAID") && (
        <button
          type="button"
          onClick={() => setIsPaymentOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Pay Now
        </button>
      )}

      <PaymentModal
        invoice={invoice}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </div>
  );
};

export default InvoiceCard;
