import { useCurrentSession } from "@/src/lib/queries/useCurrentSession";
import { useSubjects } from "@/src/lib/queries/useSubjects";
import { useSchool } from "@/src/lib/context/SchoolContext";

export const useDashboard = () => {
  const { school } = useSchool();

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
    sessionControl,
    subjectsData,
    isLoading: isSessionLoading || isSubjectsLoading,
    isSessionLoading,
    isSubjectsLoading,
    isError: isSessionError || isSubjectsError,
    error: sessionError ?? subjectsError,
  };
};
