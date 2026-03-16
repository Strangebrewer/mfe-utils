import { create } from 'zustand';

export interface UserStore {
  user?: Record<string, any> | null;
  setUser: (user: Record<string, any>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user: Record<string, any>) => set({ user }),
  clearUser: () => set({ user: null }),
}));
