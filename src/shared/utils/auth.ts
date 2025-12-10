import { useGlobalStore } from "../store";

export function isAuthed(): boolean {
  return !!localStorage.getItem("token");
}

export function getToken(): string {
  return localStorage.getItem("token") ?? "";
}

export function logout() {
  const { setIsAuthed } = useGlobalStore.getState();
  localStorage.removeItem("token");
  setIsAuthed(false);
  window.location.href = "/auth";
}
