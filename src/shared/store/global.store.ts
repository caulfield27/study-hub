import { create } from "zustand";

interface IStates {
  snackbar: {
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  };
  isAuthed: boolean;
  setIsAuthed: (payload: boolean) => void;
}

type Actions = {
  openSnackbar: (msg: string, type: "success" | "error") => void;
  closeSnackbar: () => void;
};

export const useGlobalStore = create<IStates & Actions>((set) => ({
  snackbar: {
    isOpen: false,
    message: "",
    type: "success",
  },
  isAuthed: !!localStorage.getItem("token"),
  setIsAuthed: (payload) => set({ isAuthed: payload }),
  openSnackbar: (msg, type) =>
    set({
      snackbar: {
        isOpen: true,
        message: msg,
        type,
      },
    }),
  closeSnackbar: () =>
    set({
      snackbar: {
        isOpen: false,
        message: "",
        type: "success",
      },
    }),
}));
