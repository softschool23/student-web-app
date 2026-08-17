"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";

import { PageHeader } from "@/src/components";
import {
  useAvailableCourses,
  useCourseRegistration,
  useSaveCourseRegistrationDraft,
  useSubmitCourseRegistration,
} from "@/src/lib/queries/useCourseRegistration";
import {
  useCurrentSession,
  useSessions,
  useTerms,
} from "@/src/lib/queries/useCurrentSession";
import { useMe } from "@/src/lib/queries/useMe";
import {
  StudentOrganisationType,
  type CourseRegistrationPeriodParams,
} from "@/src/types";
import PrintCourseRegistrationButton from "@/src/app/[shortName]/(main)/course-registration/components/PrintCourseRegistrationButton";
import CourseRegistrationForm from "./components/CourseRegistrationForm";
import CourseRegistrationFilters from "./components/CourseRegistrationFilters";
import CourseRegistrationFiltersSkeleton from "./components/CourseRegistrationFiltersSkeleton";
import CourseRegistrationSkeleton from "./components/CourseRegistrationSkeleton";
import CourseRegistrationState from "./components/CourseRegistrationState";
import RegistrationStatusBanner from "./components/RegistrationStatusBanner";

const CourseRegistrationPage = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string>();
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>();
  const [newRegistrationPeriod, setNewRegistrationPeriod] =
    useState<string>();
  const {
    data: student,
    isLoading: isStudentLoading,
    isError: isStudentError,
    refetch: refetchStudent,
  } = useMe();
  const isCollegeStudent =
    student?.org_type === StudentOrganisationType.College;

  const {
    data: sessionControl,
    isLoading: isSessionLoading,
    isError: isSessionError,
    refetch: refetchSession,
  } = useCurrentSession();

  const {
    data: sessions = [],
    isLoading: isSessionsLoading,
    isError: isSessionsError,
    refetch: refetchSessions,
  } = useSessions();
  const {
    data: terms = [],
    isLoading: isTermsLoading,
    isError: isTermsError,
    refetch: refetchTerms,
  } = useTerms();

  const sessionId =
    selectedSessionId ?? sessionControl?.currentSession._id ?? "";
  const semesterId =
    selectedSemesterId ?? sessionControl?.currentTerm._id ?? "";

  const params = useMemo<CourseRegistrationPeriodParams | undefined>(() => {
    if (!isCollegeStudent || !sessionId || !semesterId) return undefined;

    return {
      sessionId,
      semesterId,
    };
  }, [isCollegeStudent, semesterId, sessionId]);

  const {
    data: savedRegistrationData,
    isLoading: isRegistrationLoading,
    isError: isRegistrationError,
    refetch: refetchRegistration,
  } = useCourseRegistration(params);
  const registrationPeriod = `${sessionId}:${semesterId}`;
  const hasRegistration = !!savedRegistrationData?.registration;
  const isCreatingRegistration =
    newRegistrationPeriod === registrationPeriod && !hasRegistration;
  const shouldLoadAvailableCourses =
    !!params &&
    isCreatingRegistration &&
    !isRegistrationError;
  const {
    data: availableCoursesData,
    isLoading: isAvailableCoursesLoading,
    isError: isAvailableCoursesError,
    refetch: refetchAvailableCourses,
  } = useAvailableCourses(
    shouldLoadAvailableCourses ? params : undefined,
  );
  const { mutateAsync: saveDraft, isPending: isSaving } =
    useSaveCourseRegistrationDraft();
  const { mutateAsync: submitRegistration, isPending: isSubmitting } =
    useSubmitCourseRegistration();

  const registrationData = hasRegistration
    ? savedRegistrationData
    : isCreatingRegistration
      ? availableCoursesData
      : undefined;
  const isCoursesLoading =
    isRegistrationLoading ||
    (shouldLoadAvailableCourses && isAvailableCoursesLoading);
  const isCoursesError =
    isRegistrationError ||
    (shouldLoadAvailableCourses && isAvailableCoursesError);

  if (
    isStudentLoading ||
    (isCollegeStudent && isSessionLoading)
  ) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Course Registration"
          description="View or update your course registration for the selected academic period."
        />
        <CourseRegistrationFiltersSkeleton />
        <CourseRegistrationSkeleton />
      </div>
    );
  }

  if (isStudentError || !student) {
    return (
      <CourseRegistrationState
        variant="error"
        title="Unable to load your profile"
        description="Your student profile is required before course registration can be loaded."
        onAction={() => void refetchStudent()}
      />
    );
  }

  if (student.org_type !== StudentOrganisationType.College) {
    notFound();
  }

  if (isSessionError) {
    return (
      <CourseRegistrationState
        variant="error"
        title="Unable to load the current session"
        description="The active session and semester could not be loaded. Please try again."
        onAction={() => void refetchSession()}
      />
    );
  }

  if (isSessionsError || isTermsError) {
    return (
      <CourseRegistrationState
        variant="error"
        title="Unable to load academic periods"
        description="The available sessions and semesters could not be loaded. Please try again."
        onAction={() => {
          if (isSessionsError) void refetchSessions();
          if (isTermsError) void refetchTerms();
        }}
      />
    );
  }

  if (!sessionControl || !params) {
    return (
      <CourseRegistrationState
        variant="empty"
        title="No active session"
        description="Course registration will be available when your school configures an active session and semester."
      />
    );
  }

  const selectedSession = sessions.find((session) => session._id === sessionId);
  const selectedSemester = terms.find((term) => term._id === semesterId);
  const sessionName =
    selectedSession?.name ?? sessionControl.currentSession.name;
  const semesterName =
    selectedSemester?.name ?? sessionControl.currentTerm.name;
  const submittedRegistration =
    registrationData?.registration &&
    registrationData.registration.status.toLowerCase() !== "draft"
      ? registrationData.registration
      : undefined;
  const handleSave = (selectedCourseIds: string[]) =>
    saveDraft({ ...params, selectedCourseIds });
  const handleSubmit = () => {
    const draftId = savedRegistrationData?.registration?._id;

    if (!draftId) {
      return Promise.reject(
        new Error("Save the course registration before submitting it."),
      );
    }

    return submitRegistration(draftId);
  };

  const renderRegistration = () => {
    if (
      isCoursesError ||
      (isCreatingRegistration && !isCoursesLoading && !registrationData)
    ) {
      return (
        <CourseRegistrationState
          variant="error"
          title="Unable to load course registration"
          description="Your course registration could not be loaded. Please try again."
          onAction={() => {
            if (isRegistrationError) {
              void refetchRegistration();
              return;
            }

            void refetchAvailableCourses();
          }}
        />
      );
    }

    if (!registrationData) {
      const canStartRegistration =
        !savedRegistrationData ||
        (savedRegistrationData.registrationControl.enabled &&
          savedRegistrationData.canEdit);

      return (
        <>
          {savedRegistrationData && (
            <RegistrationStatusBanner
              enabled={savedRegistrationData.registrationControl.enabled}
              canEdit={savedRegistrationData.canEdit}
            />
          )}
          <CourseRegistrationState
            variant="empty"
            title="No course registration"
            description={
              canStartRegistration
                ? "You have not created a course registration for this academic period."
                : "There is no course registration for this academic period, and registration is not currently available."
            }
            actionLabel="Start course registration"
            onAction={
              canStartRegistration
                ? () => setNewRegistrationPeriod(registrationPeriod)
                : undefined
            }
          />
        </>
      );
    }

    const canEdit =
      registrationData.registrationControl.enabled &&
      registrationData.canEdit;
    const courses =
      registrationData.registration && !canEdit
        ? registrationData.courses.filter((course) => course.selected)
        : registrationData.courses;

    return (
      <>
        <RegistrationStatusBanner
          enabled={registrationData.registrationControl.enabled}
          canEdit={registrationData.canEdit}
          status={registrationData.registration?.status}
        />

        {courses.length === 0 ? (
          <CourseRegistrationState
            variant="empty"
            title={
              registrationData.registration
                ? "No registered courses"
                : "No courses available"
            }
            description={
              registrationData.registration
                ? "This registration does not contain any courses."
                : "There are no courses available for your academic level this semester."
            }
          />
        ) : (
          <CourseRegistrationForm
            courses={courses}
            sessionName={sessionName}
            semesterName={semesterName}
            canEdit={canEdit}
            maxCreditUnits={registrationData.maxCreditUnits}
            isSaving={isSaving}
            canSubmit={registrationData.registration?.status === "draft"}
            isSubmitting={isSubmitting}
            onSave={handleSave}
            onSubmit={handleSubmit}
          />
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Course Registration"
          description="View or update your course registration for the selected academic period."
        />
        {submittedRegistration && (
          <PrintCourseRegistrationButton
            registration={submittedRegistration}
            semesterName={semesterName}
            sessionName={sessionName}
            student={student}
          />
        )}
      </div>

      {isSessionsLoading || isTermsLoading ? (
        <CourseRegistrationFiltersSkeleton />
      ) : (
        <CourseRegistrationFilters
          sessions={sessions}
          terms={terms}
          sessionId={sessionId}
          semesterId={semesterId}
          onSessionChange={setSelectedSessionId}
          onSemesterChange={setSelectedSemesterId}
        />
      )}

      {isCoursesLoading ? (
        <CourseRegistrationSkeleton />
      ) : (
        renderRegistration()
      )}
    </div>
  );
};

export default CourseRegistrationPage;
