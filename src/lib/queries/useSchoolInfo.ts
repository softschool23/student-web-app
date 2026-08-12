import { fetchSchoolBasicInfo } from "@/src/network/school";
import { useQuery } from "@tanstack/react-query";

export const schoolQueryKeys = {
  basicInfo: (shortName: string) =>
    ["school", shortName, "basic-info"] as const,
};

export const useSchoolInfo = (shortName: string) => {
  return useQuery({
    queryKey: schoolQueryKeys.basicInfo(shortName),
    queryFn: () => fetchSchoolBasicInfo(shortName),
    enabled: !!shortName,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
