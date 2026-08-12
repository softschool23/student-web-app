import { create } from "zustand";

import type { StudentProfile } from "@/src/types";

interface UserState {
  user: StudentProfile | null;
  setUser: (user: StudentProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
