import { getHolidays } from "@/src/network/holidays";
import { useStudentQuery } from "@/src/lib/queries/useStudentQuery";

export const holidayQueryKeys = {
  list: ["holidays"] as const,
};

export const useHolidays = () => {
  return useStudentQuery({
    identifiers: ["organisationId"],
    queryKey: holidayQueryKeys.list,
    queryFn: ({ organisationId }) => getHolidays(organisationId),
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
};
