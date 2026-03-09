import { useMe } from "@/src/lib/queries/useMe";
import { useCurrentSession } from "@/src/lib/queries/useCurrentSession";
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

  return {
    student,
    sessionControl,
    isLoading: isStudentLoading || isSessionLoading,
    isStudentLoading,
    isSessionLoading,
    isError: isStudentError || isSessionError,
    error: studentError ?? sessionError,
  };
};
