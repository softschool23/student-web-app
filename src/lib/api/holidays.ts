import { academicApiClient } from "./axios";
import type { HolidayItem } from "@/src/types";

export const getHolidays = async (
  organisationId: string,
): Promise<HolidayItem[]> => {
  const { data } = await academicApiClient.get<HolidayItem[]>(
    `/holidays/organisation/${organisationId}`,
  );
  return data;
};
