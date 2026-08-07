import { useQuery } from "@tanstack/react-query";

import { getAccessToken } from "@/src/network/config";
import { getMe } from "@/src/network/student";

export const studentQueryKeys = {
  me: ["student", "me"] as const,
};

export const useMe = () => {
  const isAuthenticated = !!getAccessToken();

  return useQuery({
    queryKey: studentQueryKeys.me,
    queryFn: getMe,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // let the axios interceptor handle 401 retries
  });
};
