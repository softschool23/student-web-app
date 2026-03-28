import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { initializePayment, verifyPayment } from "@/src/lib/api/invoices";

export const useInitializePayment = () => {
  return useMutation({
    mutationFn: ({
      invoiceId,
      amount,
    }: {
      invoiceId: string;
      amount: number;
    }) => initializePayment(invoiceId, amount),
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reference: string) => verifyPayment(reference),
    onSuccess: () => {
      // Invalidate all invoice list queries so the UI refreshes
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Payment verified successfully!");
    },
    onError: () => {
      toast.error("Payment verification failed. Please contact support.");
    },
  });
};
