"use client";

import Modal from "./Modal";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface JsonViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  jsonData: string | object;
}

const JsonViewerModal = ({
  isOpen,
  onClose,
  title = "Request Details",
  jsonData,
}: JsonViewerModalProps) => {
  const [copied, setCopied] = useState(false);

  // Parse and format JSON
  const formattedJson =
    typeof jsonData === "string"
      ? JSON.stringify(JSON.parse(jsonData), null, 2)
      : JSON.stringify(jsonData, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description="View the complete request payload and headers"
      size="xl"
    >
      <div className="relative">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={cn(
            "absolute top-2 right-2 z-10",
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium",
            "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600",
            "text-gray-700 dark:text-gray-300 transition-colors"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* JSON Display */}
        <pre
          className={cn(
            "bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto",
            "text-sm font-mono leading-relaxed",
            "max-h-[60vh] overflow-y-auto",
            "border border-gray-700 dark:border-gray-800"
          )}
        >
          <code>{formattedJson}</code>
        </pre>
      </div>
    </Modal>
  );
};

export default JsonViewerModal;
