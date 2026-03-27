"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";
import Modal from "@/src/components/ui/Modal";
import { Input } from "@/src/components";
import type { Invoice } from "@/src/types";
import {
  useInitializePayment,
  useVerifyPayment,
} from "@/src/lib/queries/usePayment";

interface PaymentModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

const PaymentModal = ({ invoice, isOpen, onClose }: PaymentModalProps) => {
  const {
    totalAmount,
    amountPaid,
    outstandingAmount,
    minimumPartialAmount,
    _id,
  } = invoice;

  const [amountInput, setAmountInput] = useState<string>(
    String(outstandingAmount),
  );
  const [amountError, setAmountError] = useState<string>("");

  const { mutateAsync: initPayment, isPending: isInitializing } =
    useInitializePayment();
  const { mutateAsync: verifyPaymentMutation, isPending: isVerifying } =
    useVerifyPayment();

  const isProcessing = isInitializing || isVerifying;

  const validateAmount = (value: number): string => {
    if (isNaN(value) || value <= 0) return "Please enter a valid amount.";
    if (value > outstandingAmount)
      return `Amount cannot exceed the outstanding balance of ${formatAmount(outstandingAmount)}.`;
    if (minimumPartialAmount > 0 && value < minimumPartialAmount)
      return `Minimum payment is ${formatAmount(minimumPartialAmount)}.`;
    return "";
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setAmountInput(raw);
    if (amountError) setAmountError(validateAmount(Number(raw)));
  };

  const handlePay = async () => {
    const amount = Number(amountInput);
    const error = validateAmount(amount);
    if (error) {
      setAmountError(error);
      return;
    }

    try {
      const { accessCode } = await initPayment({
        invoiceId: _id,
        amount,
      });

      // Dynamically import Paystack to avoid SSR issues
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const popup = new PaystackPop();

      popup.resumeTransaction(accessCode, {
        onLoad: () => {
          onClose();
        },
        onSuccess: async (transaction) => {
          try {
            await verifyPaymentMutation(transaction.reference);
          } catch {
            // error toast handled in mutation
          }
        },
        onCancel: () => {
          toast.info("Payment cancelled.");
        },
        onError: () => {
          toast.error("An error occurred during payment. Please try again.");
        },
      });
    } catch (err) {
      console.error("Payment initialization failed:", err);
      toast.error("Failed to initialize payment. Please try again.");
    }
  };

  const detailRows = [
    { label: "Total Amount", value: formatAmount(totalAmount) },
    { label: "Amount Paid", value: formatAmount(amountPaid) },
    {
      label: "Remaining Balance",
      value: formatAmount(outstandingAmount),
      highlight: "text-red-600 dark:text-red-400",
    },
    ...(minimumPartialAmount > 0
      ? [
          {
            label: "Minimum Payment",
            value: `${formatAmount(minimumPartialAmount)} (${invoice.minimumPartialPercentage}%)`,
            highlight: "text-yellow-600 dark:text-yellow-400",
          },
        ]
      : []),
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Make Payment"
      description={`${invoice.sessionId.name} — ${invoice.termId.name} Term`}
      size="sm"
    >
      <div className="space-y-5">
        {/* Invoice Details */}
        <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Invoice Details
          </p>
          <div className="space-y-2">
            {detailRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {row.label}:
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    row.highlight ?? "text-gray-900 dark:text-white",
                  )}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick-fill Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setAmountInput(String(outstandingAmount));
              setAmountError("");
            }}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg border text-xs font-medium transition-colors",
              Number(amountInput) === outstandingAmount
                ? "bg-primary-600 border-primary-600 text-white"
                : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            Pay Full ({formatAmount(outstandingAmount)})
          </button>
          {minimumPartialAmount > 0 &&
            minimumPartialAmount < outstandingAmount && (
              <button
                type="button"
                onClick={() => {
                  setAmountInput(String(minimumPartialAmount));
                  setAmountError("");
                }}
                className={cn(
                  "flex-1 py-2 px-3 rounded-lg border text-xs font-medium transition-colors",
                  Number(amountInput) === minimumPartialAmount
                    ? "bg-primary-600 border-primary-600 text-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                )}
              >
                Pay Minimum ({formatAmount(minimumPartialAmount)})
              </button>
            )}
        </div>

        {/* Custom Amount Input */}
        <div>
          <Input
            label="Payment Amount (₦)"
            type="text"
            inputMode="numeric"
            value={amountInput}
            onChange={handleAmountChange}
            error={amountError}
            disabled={isProcessing}
            className="mb-0"
          />
        </div>

        {/* Pay Button */}
        <button
          type="button"
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {isInitializing ? "Initializing…" : "Verifying…"}
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              Pay {formatAmount(Number(amountInput) || 0)}
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
