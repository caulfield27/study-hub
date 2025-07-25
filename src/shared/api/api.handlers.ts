import type { AxiosResponse } from "axios";
import { request } from "./api.config";
import { type SendRequestParams } from "./api.types";

export async function sendRequest({method, url, data, headers} : SendRequestParams) {
    try{
        const apiConfig:SendRequestParams = {
            method,
            url,
        };
        if(data) apiConfig["data"] = data;
        if(headers) apiConfig["headers"] = headers;
        
        const response: AxiosResponse<any> = await request(apiConfig);
        return response.data;
    }catch(err){
        console.error("send request err:", err);
        throw err;
    }
}