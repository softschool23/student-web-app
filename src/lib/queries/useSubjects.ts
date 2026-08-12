import { useStudentQuery } from "@/src/lib/queries/useStudentQuery";
import { getSubjects } from "@/src/network/student";

export const subjectQueryKeys = {
  list: ["student", "subjects"] as const,
};

export const useSubjects = () => {
  return useStudentQuery({
    queryKey: subjectQueryKeys.list,
    queryFn: getSubjects,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
