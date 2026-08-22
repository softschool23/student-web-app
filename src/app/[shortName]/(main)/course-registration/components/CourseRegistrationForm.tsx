"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { Button, ConfirmModal } from "@/src/components";
import { CourseEnrollmentMode, type AvailableCourseItem } from "@/src/types";
import CourseCard from "./CourseCard";
import RegistrationSummary from "./RegistrationSummary";

const formSchema = z.object({
  selectedCourseIds: z.array(z.string()),
});

type CourseRegistrationFormValues = z.infer<typeof formSchema>;

interface CourseRegistrationFormProps {
  courses: AvailableCourseItem[];
  sessionName: string;
  semesterName: string;
  canEdit: boolean;
  maxCreditUnits: number;
  isSaving: boolean;
  canSubmit: boolean;
  isSubmitting: boolean;
  onSave: (selectedCourseIds: string[]) => Promise<void>;
  onSubmit: () => Promise<void>;
}

const createFormSchema = (
  courses: AvailableCourseItem[],
  maxCreditUnits: number,
) => {
  const creditUnitsById = new Map(
    courses.map((item) => [item.course._id, item.course.creditUnit]),
  );

  return formSchema.superRefine(({ selectedCourseIds }, context) => {
    const selectedCreditUnits = selectedCourseIds.reduce(
      (total, courseId) => total + (creditUnitsById.get(courseId) ?? 0),
      0,
    );

    if (selectedCreditUnits > maxCreditUnits) {
      context.addIssue({
        code: "custom",
        path: ["selectedCourseIds"],
        message: `Selected courses cannot exceed ${maxCreditUnits} credit units.`,
      });
    }
  });
};

const CourseRegistrationForm = ({
  courses,
  sessionName,
  semesterName,
  canEdit,
  maxCreditUnits,
  isSaving,
  canSubmit,
  isSubmitting,
  onSave,
  onSubmit,
}: CourseRegistrationFormProps) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const initialSelectedCourseIds = useMemo(
    () =>
      courses.filter((item) => item.selected).map((item) => item.course._id),
    [courses],
  );
  const schema = useMemo(
    () => createFormSchema(courses, maxCreditUnits),
    [courses, maxCreditUnits],
  );
  const creditUnitsById = useMemo(
    () =>
      new Map(courses.map((item) => [item.course._id, item.course.creditUnit])),
    [courses],
  );

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CourseRegistrationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { selectedCourseIds: initialSelectedCourseIds },
  });

  useEffect(() => {
    reset({ selectedCourseIds: initialSelectedCourseIds });
  }, [initialSelectedCourseIds, reset]);

  const selectedCourseIds = useWatch({
    control,
    name: "selectedCourseIds",
  });
  const selectedCourseIdSet = useMemo(
    () => new Set(selectedCourseIds),
    [selectedCourseIds],
  );
  const selectedCreditUnits = selectedCourseIds.reduce(
    (total, courseId) => total + (creditUnitsById.get(courseId) ?? 0),
    0,
  );
  const isOverCreditLimit = selectedCreditUnits > maxCreditUnits;

  const handleToggleCourse = (item: AvailableCourseItem) => {
    if (!canEdit || item.enrollmentMode === CourseEnrollmentMode.AutoAdd) {
      return;
    }

    const courseId = item.course._id;
    const isSelected = selectedCourseIdSet.has(courseId);
    const nextSelectedCourseIds = isSelected
      ? selectedCourseIds.filter((id) => id !== courseId)
      : [...selectedCourseIds, courseId];
    const nextCreditUnits = nextSelectedCourseIds.reduce(
      (total, id) => total + (creditUnitsById.get(id) ?? 0),
      0,
    );

    if (nextCreditUnits > maxCreditUnits) {
      setError("selectedCourseIds", {
        message: `Adding this course would exceed the ${maxCreditUnits}-credit limit.`,
      });
      return;
    }

    clearErrors("selectedCourseIds");
    setValue("selectedCourseIds", nextSelectedCourseIds, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleSave = async ({
    selectedCourseIds: courseIds,
  }: CourseRegistrationFormValues) => {
    try {
      await onSave(courseIds);
      reset({ selectedCourseIds: courseIds });
    } catch {
      // The mutation displays the API error and the current selection is kept.
    }
  };

  const handleFinalSubmit = async () => {
    try {
      await onSubmit();
      setIsSubmitModalOpen(false);
    } catch {
      // The mutation displays the API error and keeps the modal open.
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
      <RegistrationSummary
        sessionName={sessionName}
        semesterName={semesterName}
        selectedCourseCount={selectedCourseIds.length}
        selectedCreditUnits={selectedCreditUnits}
        maxCreditUnits={maxCreditUnits}
      />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {canEdit ? "Available courses" : "Registered courses"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {canEdit
            ? "Automatically added courses are locked. Other courses can be selected or removed while registration is editable."
            : "These are the courses included in your registration for this academic period."}
        </p>
      </div>

      <div className="space-y-3">
        {courses.map((item) => (
          <CourseCard
            key={item.course._id}
            item={item}
            isSelected={selectedCourseIdSet.has(item.course._id)}
            disabled={
              !canEdit ||
              item.enrollmentMode === CourseEnrollmentMode.AutoAdd ||
              isSaving
            }
            onToggle={handleToggleCourse}
          />
        ))}
      </div>

      {errors.selectedCourseIds?.message && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.selectedCourseIds.message}
        </p>
      )}
      {isOverCreditLimit && !errors.selectedCourseIds?.message && (
        <p className="text-sm text-red-600 dark:text-red-400">
          The current selection exceeds the {maxCreditUnits}-credit limit.
        </p>
      )}

      {canEdit && (
        <div className="sticky bottom-0 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/95 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {selectedCourseIds.length} course
              {selectedCourseIds.length === 1 ? "" : "s"} selected
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedCreditUnits} of {maxCreditUnits} credit units
            </p>
            {canSubmit && (
              <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                Save your changes before final submission.
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button
              type="submit"
              loading={isSaving}
              disabled={isOverCreditLimit || isSaving || isSubmitting}
              className="w-full gap-2 sm:w-auto"
            >
              <Save className="h-4 w-4" />
              Save selection
            </Button>
            {canSubmit && (
              <Button
                type="button"
                disabled={
                  isOverCreditLimit ||
                  isSaving ||
                  isSubmitting ||
                  selectedCourseIds.length === 0
                }
                className="w-full gap-2 sm:w-auto"
                onClick={() => setIsSubmitModalOpen(true)}
              >
                <Send className="h-4 w-4" />
                Submit registration
              </Button>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => void handleFinalSubmit()}
        title="Submit course registration?"
        description="Your saved course selection will be submitted for final review. Confirm that all selected courses are correct before continuing."
        confirmText="Submit registration"
        variant="success"
        isLoading={isSubmitting}
      />
    </form>
  );
};

export default CourseRegistrationForm;
