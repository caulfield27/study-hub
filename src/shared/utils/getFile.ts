export const getFile = (src: string) => {
  if(!src) return src;
  return (import.meta.env?.VITE_BASE_CLAUDFLARE_MEDIA_PATH ?? "")+src;
};

export const getVideo = (src: string) => {
  return (import.meta.env?.VITE_BASE_CLAUDFLARE_VIDEO_PATH ?? "")+src;
}