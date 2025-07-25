import axios from "axios";

export const base_url = import.meta.env?.BASE_API_URL ?? "http://localhost:3000";

export const request = axios.create({
    baseURL: base_url+"/api"
});