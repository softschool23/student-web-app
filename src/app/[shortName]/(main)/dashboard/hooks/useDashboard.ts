import { useMe } from "@/src/lib/queries/useMe";
import { useCurrentSession } from "@/src/lib/queries/useCurrentSession";
import { useSubjects } from "@/src/lib/queries/useSubjects";
import { useSchool } from "@/src/lib/context/SchoolContext";

export const useDashboard = () => {
  const { school } = useSchool();

  const {
    data: student,
    isLoading: isStudentLoading,
    isError: isStudentError,
    error: studentError,
  } = useMe();

  const {
    data: sessionControl,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionError,
  } = useCurrentSession(school._id);

  const {
    data: subjectsData,
    isLoading: isSubjectsLoading,
    isError: isSubjectsError,
    error: subjectsError,
  } = useSubjects();

  return {
    student,
    sessionControl,
    subjectsData,
    isLoading: isStudentLoading || isSessionLoading || isSubjectsLoading,
    isStudentLoading,
    isSessionLoading,
    isSubjectsLoading,
    isError: isStudentError || isSessionError || isSubjectsError,
    error: studentError ?? sessionError ?? subjectsError,
  };
};
