"use client";

import { cn } from "@/src/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  feedback: string[];
}

interface PasswordStrengthIndicatorProps {
  password: string;
  passwordStrength: PasswordStrength;
}

const PasswordStrengthIndicator = ({
  password,
  passwordStrength,
}: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Password Strength Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Password Strength:
          </span>
          <span
            className={cn(
              "text-sm font-medium",
              passwordStrength.score >= 4
                ? "text-green-600 dark:text-green-400"
                : passwordStrength.score >= 3
                ? "text-blue-600 dark:text-blue-400"
                : passwordStrength.score >= 2
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            {passwordStrength.label}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              passwordStrength.color
            )}
            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Password Requirements */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password Requirements:
        </p>
        <ul className="space-y-1">
          {passwordStrength.feedback.map((feedback, index) => (
            <li
              key={index}
              className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2"
            >
              {passwordStrength.score >= 4 ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              {feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
