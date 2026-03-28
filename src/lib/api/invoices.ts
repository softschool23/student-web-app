import { academicApiClient } from "./axios";
import type {
  InvoicesResponse,
  PaymentLinkResponse,
  VerifyPaymentResponse,
} from "@/src/types";

export type InvoiceStatusFilter = "ALL" | "PAID" | "UNPAID" | "PARTIALLY_PAID";

export interface GetInvoicesParams {
  status?: InvoiceStatusFilter;
}

export const getInvoices = async (
  params: GetInvoicesParams = {},
): Promise<InvoicesResponse> => {
  const queryParams: Record<string, string> = {};

  if (params.status && params.status !== "ALL") {
    queryParams.status = params.status;
  }

  const { data } = await academicApiClient.get<InvoicesResponse>(
    "/student-portal/invoices",
    { params: queryParams },
  );
  return data;
};

export const initializePayment = async (
  invoiceId: string,
  amount: number,
): Promise<PaymentLinkResponse> => {
  const { data } = await academicApiClient.post<PaymentLinkResponse>(
    `/student-portal/invoices/${invoiceId}/payment-link`,
    { amount },
  );
  return data;
};

export const verifyPayment = async (
  reference: string,
): Promise<VerifyPaymentResponse> => {
  const { data } = await academicApiClient.get<VerifyPaymentResponse>(
    `/student-portal/payments/verify/${reference}`,
  );
  return data;
};
