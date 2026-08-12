"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartPulse, Save, ShieldCheck, UserRound } from "lucide-react";
import { z } from "zod";

import {
  Button,
  Input,
  PictureUpload,
  Select,
  Textarea,
} from "@/src/components";
import dayjs from "@/src/lib/dayjs";
import { useUpdateStudentProfile } from "@/src/lib/queries/useProfile";
import type {
  CollegeStudentProfile,
  UpdateCollegeStudentProfilePayload,
} from "@/src/types";

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number must contain at least 7 characters")
  .max(20, "Phone number cannot exceed 20 characters")
  .regex(
    /^\+?[0-9 ()-]+$/,
    "Phone number can only contain numbers, spaces, brackets, +, and -",
  );

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  middleName: z.string().trim().max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  phoneNumber: phoneSchema,
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => dayjs(value).isValid(), "Enter a valid date")
    .refine(
      (value) => !dayjs(value).isAfter(dayjs(), "day"),
      "Date of birth cannot be in the future",
    ),
  gender: z.enum(["male", "female"], {
    message: "Select a gender",
  }),
  contactAddress: z
    .string()
    .trim()
    .min(1, "Contact address is required")
    .max(500),
  guardian: z.object({
    fullName: z
      .string()
      .trim()
      .min(1, "Guardian's full name is required")
      .max(200),
    relationship: z
      .string()
      .trim()
      .min(1, "Relationship is required")
      .max(100),
    email: z.string().trim().email("Enter a valid guardian email address"),
    phoneNumber: phoneSchema,
  }),
  knownHealthStatus: z.string().trim().max(1000),
  photo: z
    .string()
    .trim()
    .refine(
      (value) => !value || z.string().url().safeParse(value).success,
      "Enter a valid photo URL",
    ),
}) satisfies z.ZodType<UpdateCollegeStudentProfilePayload>;

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  student: CollegeStudentProfile;
}

interface FormSectionTitleProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const getDefaultValues = (
  student: CollegeStudentProfile,
): ProfileFormValues => ({
  firstName: student.firstName ?? "",
  middleName: student.middleName ?? "",
  lastName: student.lastName ?? "",
  email: student.email ?? "",
  phoneNumber: student.phoneNumber ?? "",
  dateOfBirth: student.dateOfBirth
    ? dayjs(student.dateOfBirth).format("YYYY-MM-DD")
    : "",
  gender: student.gender.toLowerCase() === "female" ? "female" : "male",
  contactAddress: student.contactAddress ?? "",
  guardian: {
    fullName: student.guardian?.fullName ?? "",
    relationship: student.guardian?.relationship ?? "",
    email: student.guardian?.email ?? "",
    phoneNumber: student.guardian?.phoneNumber ?? "",
  },
  knownHealthStatus: student.knownHealthStatus ?? "",
  photo: student.photo ?? "",
});

const FormSectionTitle = ({
  icon: Icon,
  title,
  description,
}: FormSectionTitleProps) => (
  <div className="mb-5 flex items-start gap-3 border-b border-border pb-4">
    <div className="rounded-lg bg-primary-50 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const ProfileForm = ({ student }: ProfileFormProps) => {
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateStudentProfile();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: getDefaultValues(student),
  });

  useEffect(() => {
    reset(getDefaultValues(student));
  }, [reset, student]);

  const onSubmit = (values: ProfileFormValues) => {
    if (isPhotoUploading) return;

    updateProfile(values, {
      onSuccess: () => reset(values),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
        <FormSectionTitle
          icon={UserRound}
          title="Personal information"
          description="Update the contact and personal details associated with your account."
        />
        <div className="grid gap-x-5 md:grid-cols-2 lg:grid-cols-3">
          <Input
            label="First name"
            autoComplete="given-name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="Middle name"
            autoComplete="additional-name"
            {...register("middleName")}
            error={errors.middleName?.message}
          />
          <Input
            label="Last name"
            autoComplete="family-name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Phone number"
            type="tel"
            autoComplete="tel"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
          <Input
            label="Date of birth"
            type="date"
            {...register("dateOfBirth")}
            error={errors.dateOfBirth?.message}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                label="Gender"
                options={genderOptions}
                value={genderOptions.find(
                  (option) => option.value === field.value,
                )}
                onChange={(option) => field.onChange(option?.value)}
                error={errors.gender?.message}
              />
            )}
          />
          <div className="mb-4 md:col-span-2 lg:col-span-3">
            <Controller
              name="photo"
              control={control}
              render={({ field }) => (
                <PictureUpload
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.photo?.message}
                  disabled={isPending}
                  onUploadingChange={setIsPhotoUploading}
                />
              )}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Textarea
              label="Contact address"
              autoComplete="street-address"
              {...register("contactAddress")}
              error={errors.contactAddress?.message}
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
        <FormSectionTitle
          icon={ShieldCheck}
          title="Guardian information"
          description="Keep your guardian or emergency contact details current."
        />
        <div className="grid gap-x-5 md:grid-cols-2">
          <Input
            label="Full name"
            {...register("guardian.fullName")}
            error={errors.guardian?.fullName?.message}
          />
          <Input
            label="Relationship"
            {...register("guardian.relationship")}
            error={errors.guardian?.relationship?.message}
          />
          <Input
            label="Email address"
            type="email"
            {...register("guardian.email")}
            error={errors.guardian?.email?.message}
          />
          <Input
            label="Phone number"
            type="tel"
            {...register("guardian.phoneNumber")}
            error={errors.guardian?.phoneNumber?.message}
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
        <FormSectionTitle
          icon={HeartPulse}
          title="Health information"
          description="Share any known health status the school should be aware of."
        />
        <Textarea
          label="Known health status"
          placeholder="Enter health information, or leave blank if none"
          {...register("knownHealthStatus")}
          error={errors.knownHealthStatus?.message}
        />
      </section>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={isPending}
          disabled={!isDirty || isPending || isPhotoUploading}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
