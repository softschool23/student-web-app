"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/src/lib/utils";

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  length?: number;
  disabled?: boolean;
}

const OTPInput = ({
  value,
  onChange,
  error,
  length = 6,
  disabled = false,
}: OTPInputProps) => {
  const [otp, setOtp] = useState(value || "");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return; // Only allow digits

    const newOtp = otp.split("");
    newOtp[index] = digit;
    const newOtpString = newOtp.join("");

    setOtp(newOtpString);
    onChange(newOtpString);

    // Move focus to next input if digit is entered
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current field is empty, move to previous field and clear it
        const newOtp = otp.split("");
        newOtp[index - 1] = "";
        const newOtpString = newOtp.join("");
        setOtp(newOtpString);
        onChange(newOtpString);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current field
        const newOtp = otp.split("");
        newOtp[index] = "";
        const newOtpString = newOtp.join("");
        setOtp(newOtpString);
        onChange(newOtpString);
      }
    }
    // Handle arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digitRegex = new RegExp(`^\\d{${length}}$`);
    if (digitRegex.test(pastedData)) {
      setOtp(pastedData);
      onChange(pastedData);
      inputRefs.current[length - 1]?.focus(); // Focus last input
    }
  };

  return (
    <div className="mb-3 md:mb-4">
      <label className="block text-xs md:text-sm font-medium mb-2 md:mb-3 text-gray-700 dark:text-gray-300">
        OTP Code
      </label>
      <div className="flex gap-1.5 md:gap-2 justify-center">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={otp[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 text-center text-base md:text-lg font-semibold rounded-lg border-2 transition-colors",
              "bg-white dark:bg-gray-800",
              "text-gray-900 dark:text-gray-100",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            autoComplete="off"
          />
        ))}
      </div>
      {error && (
        <p className="text-xs mt-2 text-red-500 text-center">{error}</p>
      )}
    </div>
  );
};

export default OTPInput;
