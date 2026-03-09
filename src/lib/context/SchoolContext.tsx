import { create } from "zustand";
import type { SchoolBasicInfo } from "@/src/types";

interface SchoolStoreState {
  school: SchoolBasicInfo | null;
  shortName: string;
  setSchool: (school: SchoolBasicInfo, shortName: string) => void;
  clearSchool: () => void;
}

export const useSchoolStore = create<SchoolStoreState>((set) => ({
  school: null,
  shortName: "",
  setSchool: (school, shortName) => set({ school, shortName }),
  clearSchool: () => set({ school: null, shortName: "" }),
}));

/** Convenience hook — throws if called before school data is loaded. */
export const useSchool = () => {
  const school = useSchoolStore((s) => s.school);
  const shortName = useSchoolStore((s) => s.shortName);

  if (!school) {
    throw new Error("useSchool must be used after school data has been loaded");
  }

  return { school, shortName };
};
