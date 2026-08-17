import { useQuery } from "@tanstack/react-query";

import { getStudentPortalSchool } from "@/src/network/school";

export const studentPortalSchoolQueryKey = [
  "student-portal",
  "school",
] as const;

export const useStudentPortalSchool = () =>
  useQuery({
    queryKey: studentPortalSchoolQueryKey,
    queryFn: getStudentPortalSchool,
    staleTime: 1000 * 60 * 5,
  });
