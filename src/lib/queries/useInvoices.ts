import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/src/lib/api/invoices";
import type { InvoiceStatusFilter } from "@/src/lib/api/invoices";

export const invoiceQueryKeys = {
  list: (status: InvoiceStatusFilter) => ["invoices", "list", status] as const,
};

export const useInvoices = (status: InvoiceStatusFilter = "ALL") => {
  return useQuery({
    queryKey: invoiceQueryKeys.list(status),
    queryFn: () => getInvoices({ status }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
