import type { HolidayItem } from "@/src/types";

import { academicApiClient } from "./config";

export const getHolidays = async (
  organisationId: string,
): Promise<HolidayItem[]> => {
  const { data } = await academicApiClient.get<HolidayItem[]>(
    `/holidays/organisation/${organisationId}`,
  );
  return data;
};
