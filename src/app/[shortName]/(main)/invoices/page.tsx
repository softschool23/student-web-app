"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AlertCircle, Receipt } from "lucide-react";
import { PageHeader, Select } from "@/src/components";
import { useInvoices } from "@/src/lib/queries/useInvoices";
import { useSchool } from "@/src/lib/context/SchoolContext";
import { useVerifyPayment } from "@/src/lib/queries/usePayment";
import type { InvoiceStatusFilter } from "@/src/lib/api/invoices";
import InvoiceSummaryCard from "./components/InvoiceSummaryCard";
import InvoiceCard from "./components/InvoiceCard";
import InvoiceListSkeleton from "./components/InvoiceListSkeleton";

const statusOptions = [
  { value: "ALL", label: "All" },
  { value: "PAID", label: "Paid" },
  { value: "PARTIALLY_PAID", label: "Partially Paid" },
  { value: "UNPAID", label: "Unpaid" },
];

const InvoicesPage = () => {
  const { school } = useSchool();
  const [statusFilter, setStatusFilter] = useState<InvoiceStatusFilter>("ALL");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { mutateAsync: verifyPayment } = useVerifyPayment();

  // Handle Paystack redirect fallback — verify if ?reference is present
  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) return;

    verifyPayment(reference).finally(() => {
      // Clear the reference from URL without a full reload
      router.replace(pathname);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isLoading, isError, error } = useInvoices(statusFilter);

  const selectedOption =
    statusOptions.find((o) => o.value === statusFilter) ?? statusOptions[0];

  const handleStatusChange = (
    option: { value: string; label: string } | null,
  ) => {
    if (option) {
      setStatusFilter(option.value as InvoiceStatusFilter);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <InvoiceListSkeleton />;
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            Failed to load invoices
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            {error instanceof Error
              ? error.message
              : "An error occurred while fetching your invoices. Please try again."}
          </p>
        </div>
      );
    }

    if (!data || data.invoices.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Receipt className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            No invoices found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            {statusFilter === "ALL"
              ? "You don't have any invoices yet."
              : `No ${statusFilter.toLowerCase().replace("_", " ")} invoices found.`}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <InvoiceSummaryCard
          summary={data.summary}
          totalInvoices={data.totalInvoices}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.invoices.map((invoice) => (
            <InvoiceCard key={invoice._id} invoice={invoice} school={school} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <PageHeader
          title="Invoices"
          description="View and manage your school invoices"
        />
        <div className="w-full sm:w-48 shrink-0">
          <Select
            options={statusOptions}
            value={selectedOption}
            onChange={handleStatusChange}
            placeholder="Filter by status"
          />
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default InvoicesPage;
