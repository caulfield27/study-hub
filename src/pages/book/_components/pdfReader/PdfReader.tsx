import { useEffect, useRef } from "react";
import type { Props } from "./PdfReader.types";
import { Button } from "@heroui/button";
import { Maximize } from "lucide-react";
import { useI18n } from "@/shared/i18n";

export const PdfReader = ({ name, href, onClose }: Props) => {
  const { t } = useI18n();
  const bookFrame = useRef<HTMLIFrameElement | null>(null);

  function handleFullScreen() {
    const el = bookFrame.current;
    if (!el) return;

    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-neutral-900 bg-opacity-90 z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between max-md:flex-col-reverse max-md:items-start max-md:gap-4">
          <h3 className="text-lg font-semibold text-neutral-900">{t("library.readingNow", { name })}</h3>
          <div className="flex flex-row gap-2.5">
            <Button onPress={handleFullScreen} color="primary" startContent={<Maximize />}>
              {t("library.fullscreen")}
            </Button>
            <Button onPress={onClose}>{t("library.close")}</Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            ref={bookFrame}
            src={href}
            className="w-full h-full"
            title={name}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
