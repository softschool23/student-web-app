"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, Button } from "@/src/components";
import type { LoginCredentials } from "@/src/types";
import { routes } from "@/src/lib/routes";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  studentId: z.string("Student ID is required"),
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

  const onSubmit = async (data: LoginFormValues) => {
    // Handle login logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        "p-8 rounded-xl flex flex-col gap-4 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
      }
    >
      <h2
        className={
          "text:lg lg:text-xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
        }
      >
        Welcome back
      </h2>

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
