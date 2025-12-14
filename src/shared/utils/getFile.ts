import { base_url } from "../api/api.config";

export const getFile = (src: string) => {
  return base_url + src;
};
