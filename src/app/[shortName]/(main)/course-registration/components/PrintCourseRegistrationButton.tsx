"use client";

import dynamic from "next/dynamic";
import { RefreshCw } from "lucide-react";

import { Button } from "@/src/components";
import { useStudentPortalSchool } from "@/src/lib/queries/useStudentPortalSchool";
import type {
  CollegeStudentProfile,
  CourseRegistration,
} from "@/src/types";

interface PrintCourseRegistrationButtonProps {
  registration: CourseRegistration;
  semesterName: string;
  sessionName: string;
  student: CollegeStudentProfile;
}

const CourseRegistrationPDF = dynamic(() => import("./CourseRegistrationPDF"), {
  ssr: false,
  loading: () => (
    <Button type="button" variant="outline" loading disabled>
      Preparing form…
    </Button>
  ),
});

const PrintCourseRegistrationButton = ({
  registration,
  semesterName,
  sessionName,
  student,
}: PrintCourseRegistrationButtonProps) => {
  const { data: school, isLoading, isError, refetch } =
    useStudentPortalSchool();

  if (isError) {
    return (
      <Button
        type="button"
        variant="outline"
        className="shrink-0 gap-2"
        onClick={() => void refetch()}
      >
        <RefreshCw className="h-4 w-4" />
        Retry registration form
      </Button>
    );
  }

  if (isLoading || !school) {
    return (
      <Button type="button" variant="outline" loading disabled>
        Preparing form…
      </Button>
    );
  }

  return (
    <CourseRegistrationPDF
      registration={registration}
      school={school}
      semesterName={semesterName}
      sessionName={sessionName}
      student={student}
    />
  );
};

export default PrintCourseRegistrationButton;
