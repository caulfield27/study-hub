import { NavLink } from "react-router";
import { navLinks } from "./Sidebar.constants";
import logo from "/sh_logo_white.png";
import { useGlobalStore } from "@/shared/store";
import { Divider } from "@heroui/divider";
import { useEffect } from "react";

export function Sidebar() {
  const { isAuthed } = useGlobalStore();

  useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      if (window.innerWidth <= 930) {
        root.style.setProperty("--sidebar-width", "fit-content");
      } else {
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
        z-10 
        min-h-[95vh] 
        w-(--sidebar-width) 
        bg-(--sidebar-bg) 
        rounded-xl
      "
    >
      <div className="relative p-5">
        {/* Header */}
        <div className="flex flex-row gap-3 mb-5 pr-10 max-[930px]:pr-0 items-center text-white">
          <img src={logo} className="w-[60px]" />
        </div>

        <Divider className="bg-[#404040]" />

        {/* Content */}
        <div className="mt-5">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `
                    flex items-center max-[930px]:justify-center gap-2 px-2 py-2 rounded-xl text-white transition 
                    hover:bg-[#db4422]
                    ${
                      isActive
                        ? "bg-[#db4422] text-yellow-400 pointer-events-none"
                        : ""
                    }
                  `
                }
              >
                <link.icon />
                <span className="block max-[930px]:hidden">{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User */}
        <div className="text-white mt-5">{!isAuthed}</div>
      </div>
    </aside>
  );
}
