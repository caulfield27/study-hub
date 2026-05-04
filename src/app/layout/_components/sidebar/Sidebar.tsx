import { NavLink, useLocation, useNavigate } from "react-router";
import { authedNavLinks, publicNavLinks } from "./Sidebar.constants";
import logo from "/sh_logo_white.png";
import logo_black from "/sh_logo.png";
import { Divider } from "@heroui/divider";
import { useEffect } from "react";
import { useGlobalStore } from "@/shared/store";
import { GlobalSearch, Profile } from "./_components";
import { cn } from "@/shared/utils/clx";
import { useI18n } from "@/shared/i18n";
import { LanguageSelect } from "@/shared/ui/LanguageSelect/LanguageSelect";
import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";
import { useTheme } from "@/shared/theme";

export function Sidebar() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const user = useGlobalStore((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const setIsSidebarHidden = useGlobalStore(
    (state) => state.setIsSidebarHidden,
  );
  const links = isAuthed ? authedNavLinks : publicNavLinks;

  useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      if (window.innerWidth <= 930) {
        setIsSidebarHidden(true);
        root.style.setProperty("--sidebar-width", "fit-content");
      } else {
        setIsSidebarHidden(false);
        root.style.setProperty("--sidebar-width", "270px");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside
      className="
        fixed 
        top-1/2 
        -translate-y-1/2 
        left-5 
        z-100
        min-h-[95vh] 
        w-(--sidebar-width) 
        border
        theme-surface-soft
        rounded-xl
      "
    >
      <div className="relative p-5">
        <div className="flex flex-col gap-3 mb-2 theme-text w-full">
          <div
            role="button"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={theme === "light" ? logo_black : logo} className="w-15" />
          </div>
          <GlobalSearch />
        </div>

        <Divider className={cn("theme-border")} />

        <div className="h-full mt-5">
          <nav className="flex flex-col gap-5">
            {links.map((link) => {
              const isActive = link.path === pathname;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-2 py-2 rounded-xl theme-text transition hover:bg-(--primary-color) hover:text-white!",
                    isActive &&
                      "bg-(--primary-color) pointer-events-none text-white!",
                    isSidebarHidden && "justify-center",
                  )}
                >
                  <link.icon />
                  {!isSidebarHidden && <span>{t(link.labelKey)}</span>}
                </NavLink>
              );
            })}
          </nav>
          {!isSidebarHidden && (
            <div className="mt-6 flex flex-col gap-3">
              <LanguageSelect className="w-full" />
              <ThemeToggle className="w-full" />
            </div>
          )}
          {isAuthed && user && (
            <div className="fixed bottom-8 left-0 w-full">
              <Divider className="theme-border mb-5" />
              <Profile />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
