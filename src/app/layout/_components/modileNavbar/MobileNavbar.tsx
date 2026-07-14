import { NavLink, useLocation } from "react-router";

import { cn } from "@/shared/utils/clx";
import { authedNavLinks } from "../../nav-links.constants";
import { useI18n } from "@/shared/i18n";

export const MobileNavbar = () => {
  const { t } = useI18n();
  const { pathname } = useLocation();
  return (
    <nav
      className="fixed bottom-0 left-0 h-13.75 w-full flex flex-row shadow-[0px_3px_12px_0px_#00000014]
        theme-surface-soft border-t theme-border z-20"
    >
      {authedNavLinks.map((item) => {
        const isActive = pathname === item.path;
        return (
          <NavLink
            key={item.path}
            className={cn(
              "py-1.5 w-[33.3%] text-(--foreground) text-[12px] flex flex-col justify-center items-center",
              isActive && "text-primary",
            )}
            to={item.path}
          >
            <item.icon
              className={cn("text-(--foreground)", isActive && "text-primary")}
            />
            <span>{t(item.labelKey)}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
