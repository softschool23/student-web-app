import { useStudentQuery } from "@/src/lib/queries/useStudentQuery";
import { getInvoices } from "@/src/network/invoices";
import type { InvoiceStatusFilter } from "@/src/network/invoices";

export const invoiceQueryKeys = {
  list: (status: InvoiceStatusFilter) => ["invoices", "list", status] as const,
};

export const useInvoices = (status: InvoiceStatusFilter = "ALL") => {
  return useStudentQuery({
    queryKey: invoiceQueryKeys.list(status),
    queryFn: () => getInvoices({ status }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
