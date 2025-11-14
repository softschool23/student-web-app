"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import Button from "@/src/components/forms/button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
  isLoading?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) => {
  const icons = {
    danger: XCircle,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle,
  };

  const iconColors = {
    danger: "text-red-600 dark:text-red-500",
    warning: "text-yellow-600 dark:text-yellow-500",
    info: "text-blue-600 dark:text-blue-500",
    success: "text-green-600 dark:text-green-500",
  };

  const iconBgColors = {
    danger: "bg-red-100 dark:bg-red-900/20",
    warning: "bg-yellow-100 dark:bg-yellow-900/20",
    info: "bg-blue-100 dark:bg-blue-900/20",
    success: "bg-green-100 dark:bg-green-900/20",
  };

  const Icon = icons[variant];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <Dialog.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
            "w-full mx-4 max-w-md",
            "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
        >
          {/* Body */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={cn(
                  "shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                  iconBgColors[variant]
                )}
              >
                <Icon className={cn("w-6 h-6", iconColors[variant])} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {title}
                </Dialog.Title>
                {description && (
                  <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </Dialog.Description>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {cancelText}
              </Button>
              <Button
                type="button"
                variant={variant === "danger" ? "secondary" : "primary"}
                onClick={onConfirm}
                loading={isLoading}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmModal;
