import { z } from "zod";

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  requirements: PasswordRequirement[];
}

export const strongPasswordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .regex(/[a-z]/, "Password must contain a lowercase letter")
  .regex(/[A-Z]/, "Password must contain an uppercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[^A-Za-z0-9]/, "Password must contain a special character");

export const getPasswordStrength = (password: string): PasswordStrength => {
  const requirements: PasswordRequirement[] = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One lowercase letter", met: /[a-z]/.test(password) },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    {
      label: "One special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
  const score = requirements.filter((requirement) => requirement.met).length;

  if (score === requirements.length) {
    return {
      score,
      label: "Strong",
      color: "bg-green-500",
      requirements,
    };
  }

  if (score >= 3) {
    return {
      score,
      label: "Medium",
      color: "bg-yellow-500",
      requirements,
    };
  }

  return {
    score,
    label: "Weak",
    color: "bg-red-500",
    requirements,
  };
};
