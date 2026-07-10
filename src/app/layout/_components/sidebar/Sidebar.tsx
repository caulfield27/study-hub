import { NavLink, useLocation, useNavigate } from "react-router";
import { authedNavLinks, publicNavLinks } from "./Sidebar.constants";
import logo from "/sh_logo_white.png";
import logo_black from "/sh_logo.png";
import { Divider } from "@heroui/divider";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/shared/store";
import { GlobalSearch, Profile } from "./_components";
import { cn } from "@/shared/utils/clx";
import { useI18n } from "@/shared/i18n";
import { useTheme } from "@/shared/theme";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { AvatarSkeleton } from "@/shared/skeletons/profile/AvatarSkeleton";

export function Sidebar() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const user = useGlobalStore((state) => state.user);
  const meLoading = useGlobalStore((state) => state.meLoading);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const setIsSidebarHidden = useGlobalStore(
    (state) => state.setIsSidebarHidden,
  );
  const [isCompact, setIsCompact] = useState(false);
  const links = isAuthed ? authedNavLinks : publicNavLinks;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 930) {
        setIsCompact(true);
        setIsSidebarHidden(true);
      } else {
        setIsCompact(false);
        setIsSidebarHidden(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const isOpen = !isSidebarHidden;

  return (
    <>
      {isCompact && isSidebarHidden && (
        <button
          onClick={handleToggle}
          className={cn(
            "fixed top-5 left-5 z-100",
            "flex items-center justify-center w-8 h-8 rounded-lg theme-text theme-surface-soft border",
            "hover:bg-(--primary-color) hover:text-white transition-colors duration-200",
          )}
        >
          <PanelRightClose />
        </button>
      )}
      {isCompact && (
        <div
          onClick={() => setIsSidebarHidden(true)}
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
            transition: "opacity 300ms ease-in-out",
          }}
          className="fixed inset-0 z-90 bg-black/40 backdrop-blur-xs"
        />
      )}

      <aside
        style={{
          width: isOpen ? "270px" : isCompact ? "0px" : "68px",
          transition: "width 300ms ease-in-out",
        }}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 left-5 min-h-[95vh]",
          "border theme-surface-soft rounded-xl overflow-hidden",
          isCompact ? "z-100" : "z-50",
          !isOpen && isCompact && "border-0",
        )}
      >
        <div
          className="p-4"
          style={{ width: isCompact ? "270px" : isOpen ? "270px" : "68px" }}
        >
          <div className="flex items-center justify-between mb-2 theme-text">
            {(isOpen || !isCompact) && (
              <>
                {isOpen && (
                  <div
                    role="button"
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    <img
                      src={theme === "light" ? logo_black : logo}
                      className="w-15"
                    />
                  </div>
                )}
              </>
            )}

            <button
              onClick={handleToggle}
              className={cn(
                "cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg shrink-0 theme-text",
                "hover:text-white transition-colors duration-200",
              )}
            >
              {isOpen ? <PanelLeftClose /> : <PanelRightClose />}
            </button>
          </div>

          {isOpen && <GlobalSearch />}

          <Divider className="theme-border my-3" />

          <nav className="flex flex-col gap-3">
            {links.map((link) => {
              const isActive = link.path === pathname;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-2 py-2 rounded-xl theme-text transition-colors hover:bg-(--primary-color) hover:text-white!",
                    isActive &&
                      "bg-(--primary-color) pointer-events-none text-white!",
                    !isOpen && !isCompact && "justify-center",
                  )}
                >
                  <link.icon className="shrink-0 w-5 h-5" />
                  {isOpen && (
                    <span className="whitespace-nowrap">
                      {t(link.labelKey)}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
          <div className="fixed bottom-8 left-0 w-full">
            {meLoading ? (
              <AvatarSkeleton />
            ) : (
              isAuthed &&
              user && (
                <>
                  <Divider className="theme-border mb-5" />
                  <Profile />
                </>
              )
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
