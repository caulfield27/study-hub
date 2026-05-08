export const getFile = (src: string) => {
  return (import.meta.env?.VITE_BASE_CLAUDFLARE_MEDIA_PATH ?? "")+src;
};
