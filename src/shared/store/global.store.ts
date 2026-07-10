import { create } from "zustand";
import { isAuthed } from "../utils/auth";
import type { User } from "../types/types";

interface IStates {
  meLoading: boolean;
  isAuthed: boolean;
  user: User | null;
  isSidebarHidden: boolean;
}

type Actions = {
  setIsAuthed: (payload: boolean) => void;
  setUser: (user: User) => void;
  setIsSidebarHidden: (hidden: boolean) => void;
  setMeLoading: (loading: boolean) => void;
};

export const useGlobalStore = create<IStates & Actions>((set) => ({
  meLoading: false,
  isSidebarHidden: window.innerWidth <= 930,
  isAuthed: isAuthed(),
  user: null,
  setMeLoading: (loading) => set({ meLoading: loading }),
  setIsSidebarHidden: (hidden) => set({ isSidebarHidden: hidden }),
  setUser: (user) => set({ user }),
  setIsAuthed: (payload) => set({ isAuthed: payload }),
}));
