import { NavLink } from "react-router";
import { authedNavLinks, publicNavLinks } from "./Sidebar.constants";
import logo from "/sh_logo_white.png";
import { Divider } from "@heroui/divider";
import { useEffect } from "react";
import { useGlobalStore } from "@/shared/store";
import { GlobalSearch, Profile } from "./_components";
import { cn } from "@/shared/utils/clx";

export function Sidebar() {
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const user = useGlobalStore((state) => state.user);
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const setIsSidebarHidden = useGlobalStore((state) => state.setIsSidebarHidden);
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
        bg-(--sidebar-bg) 
        rounded-xl
      "
    >
      <div className="relative p-5">
        <div className="flex flex-col gap-3 mb-2 text-white w-full">
          <img src={logo} className="w-[60px]" />
          <GlobalSearch />
        </div>

        <Divider className={cn("bg-[#404040]")}/>

        <div className="h-full mt-5">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `
                    flex items-center gap-2 px-2 py-2 rounded-xl text-white transition 
                    hover:bg-(--primary-color)
                    ${isActive ? "bg-(--primary-color) text-yellow-400 pointer-events-none" : ""}
                    ${isSidebarHidden ? 'justify-center' : ''}
                  `
                }
              >
                <link.icon />
                {!isSidebarHidden && <span>{link.name}</span>}
              </NavLink>
            ))}
          </nav>
          {isAuthed && user && (
            <div className="fixed bottom-8 left-0 w-full">
              <Divider className="bg-[#404040] mb-5" />
              <Profile />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
