import { useQuery } from "@tanstack/react-query";
import { getSubjects } from "@/src/lib/api/student";

export const subjectQueryKeys = {
  list: ["student", "subjects"] as const,
};

export const useSubjects = () => {
  return useQuery({
    queryKey: subjectQueryKeys.list,
    queryFn: getSubjects,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
