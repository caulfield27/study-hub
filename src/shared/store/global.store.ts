import { create } from "zustand";

interface IStates {
  snackbar: {
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  };
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
