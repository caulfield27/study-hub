import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { LanguageSelect } from "@/shared/ui/LanguageSelect/LanguageSelect";
import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";
import { useI18n } from "@/shared/i18n";
import { Settings } from "lucide-react";

export const UiSettings = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useI18n();
  return (
    <>
      <button
        className="
        fixed right-4 bottom-15 z-20
        w-12 h-12
        flex items-center justify-center
        rounded-full
        border 
        theme-surface-soft
        text-(--primary-color)"
        onClick={onOpen}
      >
        <Settings />
      </button>
      <Drawer isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
        <DrawerContent>
          <>
            <DrawerHeader className="flex flex-col gap-1">
              {t("common.interfaceTitle")}
            </DrawerHeader>
            <DrawerBody>
              <div className="flex flex-col gap-4">
                <LanguageSelect />
                <ThemeToggle />
              </div>
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
};
