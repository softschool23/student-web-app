import { useCurrentSession } from "@/src/lib/queries/useCurrentSession";
import { useSubjects } from "@/src/lib/queries/useSubjects";

export const useDashboard = () => {
  const {
    data: sessionControl,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionError,
  } = useCurrentSession();

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
