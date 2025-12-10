import type { AxiosResponse } from "axios";
import { privateRequest, publicRequest } from "./api.config";
import { type SendRequestParams } from "./api.types";
import { apiRoutes } from "./api.routes";
import { useGlobalStore } from "../store";

export const api = {
  sendRequest: async function (
    params: [SendRequestParams, "public" | "private"]
  ) {
    try {
      const [config, type] = params;
      const { method, url, data, headers } = config;
      const apiConfig: SendRequestParams = {
        method,
        url,
      };
      if (data) apiConfig["data"] = data;
      if (headers) apiConfig["headers"] = headers;

      const requestHandler =
        type === "private" ? privateRequest : publicRequest;
      const response: AxiosResponse<any> = await requestHandler(apiConfig);
      return response.data;
    } catch (err) {
      console.error("send request err:", err);
      throw err;
    }
  },
  getMe: async function () {
    const { setUser } = useGlobalStore.getState();
    privateRequest
      .get(apiRoutes.me)
      .then((res) => setUser(res.data?.data ?? []))
      .catch(console.error);
  },
};
