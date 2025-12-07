import { NavLink, useLocation } from "react-router";

import { cn } from "@/shared/utils/clx";

import { navLinks } from "../sidebar/Sidebar.constants";

export const MobileNavbar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 h-[55px] w-full flex flex-row shadow-[0px_3px_12px_0px_#00000014] bg-(--sidebar-bg) z-10">
      {navLinks.map((item) => {
        const isActive = pathname === item.path;
        return (
          <NavLink
            key={item.path}
            className={cn(
              "py-1.5 w-[33.3%] text-(--foreground) text-[12px] flex flex-col justify-center items-center",
              isActive && "text-primary"
            )}
            to={item.path}
          >
            <item.icon
              className={cn("text-(--foreground)", isActive && "text-primary")}
            />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
