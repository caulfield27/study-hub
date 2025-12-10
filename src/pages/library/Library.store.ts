import { create } from "zustand";
import type { IBook } from "./Library.types";

interface IStates {
  currentBook: IBook | null;
}

type Actions = {
  setCurrentBook: (payload: IBook | null) => void;
};

export const useLibrary = create<IStates & Actions>((set) => ({
  currentBook: null,
  setCurrentBook: (payload) => set(() => ({ currentBook: payload })),
}));