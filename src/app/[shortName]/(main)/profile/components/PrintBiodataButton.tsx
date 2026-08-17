"use client";

import dynamic from "next/dynamic";
import { RefreshCw } from "lucide-react";

import { Button } from "@/src/components";
import { useStudentPortalSchool } from "@/src/lib/queries/useStudentPortalSchool";
import type { CollegeStudentProfile } from "@/src/types";

interface PrintBiodataButtonProps {
  student: CollegeStudentProfile;
}

const StudentBiodataPDF = dynamic(() => import("./StudentBiodataPDF"), {
  ssr: false,
  loading: () => (
    <Button type="button" variant="outline" loading disabled>
      Preparing form…
    </Button>
  ),
});

const PrintBiodataButton = ({ student }: PrintBiodataButtonProps) => {
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
        Retry biodata form
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

  return <StudentBiodataPDF school={school} student={student} />;
};

export default PrintBiodataButton;
