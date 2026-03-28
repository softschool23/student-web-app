declare module "@paystack/inline-js" {
  interface ResumeCallbacks {
    onSuccess?: (transaction: { reference: string }) => void;
    onCancel?: () => void;
    onLoad?: (data: unknown) => void;
    onError?: (error: unknown) => void;
  }

  class PaystackPop {
    constructor();
    resumeTransaction(accessCode: string, callbacks?: ResumeCallbacks): void;
    newTransaction(options: Record<string, unknown>): void;
  }

  export default PaystackPop;
}
