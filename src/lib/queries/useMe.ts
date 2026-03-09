import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getMe } from "@/src/lib/api/student";

export const studentQueryKeys = {
  me: ["student", "me"] as const,
};

export const useMe = () => {
  const isAuthenticated = !!Cookies.get("accessToken");

  return useQuery({
    queryKey: studentQueryKeys.me,
    queryFn: getMe,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // let the axios interceptor handle 401 retries
  });
};
