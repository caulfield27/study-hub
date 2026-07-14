import { NavLink, useLocation } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/utils/clx";
import type { ILinks } from "../../nav-links.constants";

interface Props {
  links: ILinks[];
  className?: string;
}

export function HeaderNav({ links, className }: Props) {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav className={cn("items-center gap-1", className)}>
      {links.map((link) => {
        const isActive = link.path === pathname;
        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={cn(
              "relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium theme-text-muted transition-colors duration-200",
              !isActive && "hover:text-(--foreground)",
              isActive && "text-white!",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="header-active-pill"
                className="absolute inset-0 rounded-xl bg-(--primary-color) -z-10"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
              />
            )}
            <link.icon className="shrink-0 w-4 h-4" />
            <span className="whitespace-nowrap">{t(link.labelKey)}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
