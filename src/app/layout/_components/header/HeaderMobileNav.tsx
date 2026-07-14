import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { NavLink, useLocation } from "react-router";
import { Menu } from "lucide-react";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/utils/clx";
import type { ILinks } from "../../nav-links.constants";

interface Props {
  links: ILinks[];
  className?: string;
}

export function HeaderMobileNav({ links, className }: Props) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={t("nav.openMenu")}
        onClick={onOpen}
        className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-xl theme-text border theme-border hover:bg-(--surface-soft) transition-colors duration-200"
      >
        <Menu size={18} />
      </button>

      <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
        <DrawerContent>
          <>
            <DrawerHeader className="flex flex-col gap-1">
              {t("nav.menu")}
            </DrawerHeader>
            <DrawerBody>
              <nav className="flex flex-col gap-2 pb-4">
                {links.map((link) => {
                  const isActive = link.path === pathname;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl theme-text transition-colors duration-200 hover:bg-(--primary-color) hover:text-white!",
                        isActive && "bg-(--primary-color) text-white!",
                      )}
                    >
                      <link.icon className="shrink-0 w-5 h-5" />
                      <span>{t(link.labelKey)}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
