import axios from "axios";
import { getToken, logout } from "../utils/auth";

export const base_url =
  import.meta.env?.VITE_BASE_API_URL;

export const publicRequest = axios.create({
  baseURL: base_url + "/api"
});

export const privateRequest = axios.create({
  baseURL: base_url + "/api"
});

privateRequest.interceptors.request.use((request) => {
  request.headers["Authorization"] = getToken();
  return request;
});

privateRequest.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.status === 401) {
      logout();
    }
  }
);
