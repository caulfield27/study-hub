import type { RawAxiosRequestHeaders } from "axios";

export type IMethod = "get" | "post" | "put" | "putch" | "delete";

export interface SendRequestParams{
    method: IMethod;
    url: string;
    data?: unknown;
    headers?: RawAxiosRequestHeaders;
}