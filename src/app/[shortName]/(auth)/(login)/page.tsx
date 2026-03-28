"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input, Button } from "@/src/components";
import type { LoginCredentials } from "@/src/types";
import { getRoutes } from "@/src/lib/routes";
import { useSchool } from "@/src/lib/context/SchoolContext";
import { useLogin } from "@/src/lib/queries/useLogin";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
}) satisfies z.ZodType<LoginCredentials>;

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { shortName, school } = useSchool();
  const routes = getRoutes(shortName);
  const { mutateAsync: loginMutation } = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginMutation({
        identifier: data.studentId,
        password: data.password,
        refreshTokenExpiry: "7d",
        organisationId: school._id,
      });
      router.push(routes.main.dashboard);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Invalid credentials. Please try again.";
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 md:p-8 rounded-xl flex flex-col gap-4 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
    >
      <div className="mb-2">
        <h2 className="text-lg lg:text-xl font-bold text-center text-gray-900 dark:text-gray-100">
          Welcome back
        </h2>
        <p className="text-center text-sm text-muted-foreground mt-1">
          {school.name}
        </p>
      </div>

      <Input
        label="Student ID"
        variant="floating"
        {...register("studentId")}
        error={errors.studentId?.message}
      />
      <div className="flex flex-col mb-6 relative">
        <Input
          label="Password"
          type="password"
          variant="floating"
          showPasswordToggle={true}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
