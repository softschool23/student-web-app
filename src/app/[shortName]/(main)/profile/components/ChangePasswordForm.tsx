"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { z } from "zod";

import { Button, Input, PasswordStrengthIndicator } from "@/src/components";
import { useChangePassword } from "@/src/lib/queries/useProfile";
import {
  getPasswordStrength,
  strongPasswordSchema,
} from "@/src/lib/validation/password";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((values) => values.newPassword !== values.oldPassword, {
    message: "New password must be different from your current password",
    path: ["newPassword"],
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
  const { mutate: changePassword, isPending } = useChangePassword();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const newPassword = useWatch({
    control,
    name: "newPassword",
    defaultValue: "",
  });
  const passwordStrength = getPasswordStrength(newPassword);

  const onSubmit = ({
    oldPassword,
    newPassword,
  }: ChangePasswordFormValues) => {
    changePassword(
      { oldPassword, newPassword },
      { onSuccess: () => reset() },
    );
  };

  return (
    <section className="max-w-2xl rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
      <div className="mb-6 flex items-start gap-3 border-b border-border pb-4">
        <div className="rounded-lg bg-primary-50 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Change password</h2>
          <p className="text-sm text-muted-foreground">
            Use a strong password that you do not use for another account.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Current password"
          type="password"
          autoComplete="current-password"
          showPasswordToggle
          {...register("oldPassword")}
          error={errors.oldPassword?.message}
        />
        <Input
          label="New password"
          type="password"
          autoComplete="new-password"
          showPasswordToggle
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
        <PasswordStrengthIndicator
          password={newPassword}
          passwordStrength={passwordStrength}
        />
        <Input
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          showPasswordToggle
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <div className="flex justify-end pt-2">
          <Button type="submit" loading={isPending} disabled={isPending}>
            Change password
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
