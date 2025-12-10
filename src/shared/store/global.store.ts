import { create } from "zustand";
import { isAuthed } from "../utils/auth";
import type { User } from "../types/types";

interface IStates {
  isAuthed: boolean;
  user: User | null;
}

type Actions = {
  setIsAuthed: (payload: boolean) => void;
  setUser: (user: User) => void;
};

export const useGlobalStore = create<IStates & Actions>((set) => ({
  isAuthed: isAuthed(),
  user: null,
  setUser: (user) => set({ user }),
  setIsAuthed: (payload) => set({ isAuthed: payload }),
}));
