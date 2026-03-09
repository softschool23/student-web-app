import { useQuery } from "@tanstack/react-query";
import { getHolidays } from "@/src/lib/api/holidays";

export const holidayQueryKeys = {
  list: (organisationId: string) => ["holidays", organisationId] as const,
};

export const useHolidays = (organisationId: string) => {
  return useQuery({
    queryKey: holidayQueryKeys.list(organisationId),
    queryFn: () => getHolidays(organisationId),
    enabled: !!organisationId,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};
