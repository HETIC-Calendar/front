import { create } from "zustand";
import type { User } from "@/lib/types";

interface StoreState {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
  hasRole: (role: string) => boolean;
  authLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
  hasRole: (role: string) => get().user?.type === role,
  authLoading: true,
  setAuthLoading: (loading: boolean) => set({ authLoading: loading })
}));
