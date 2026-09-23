import { Outlet, useLocation } from "react-router";
import { MobileHeader, MobileNavbar, Sidebar } from "../";
import { Suspense, useEffect, useRef, useState } from "react";
import { PageLoader } from "@/shared/ui/Loader/PageLoader";
import { useGlobalStore } from "@/shared/store";
import { api } from "@/shared/api/api.handlers";

export function SidebarLayout() {
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 930);

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth <= 930);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isAuthed) {
      api.getMe();
    }
  }, [isAuthed]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const main = mainRef.current;
    if (!main) return;
    if (location.pathname === "/") {
      main.style.overflowX = "hidden";
    } else {
      main.style.overflowX = "";
    }
  }, [location]);

  return (
    <div className="w-full min-h-screen flex max-sm:flex-col">
      <div className="block max-sm:hidden">
        <Sidebar />
      </div>
      <div className="hidden max-sm:block">
        <MobileHeader />
      </div>
      <main
        ref={mainRef}
        style={{
          marginLeft: isCompact
            ? "40px"
            : isSidebarHidden
              ? "calc(68px + 40px)"
              : "calc(270px + 40px)",
          transition: "margin-left 300ms ease-in-out",
        }}
        className="
          w-full
          grow
          max-w-full
          p-7.5
          max-sm:mb-16
          max-sm:ml-0!
          max-sm:p-4
        "
      >
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <div className="hidden max-sm:block">
        <MobileNavbar />
      </div>
    </div>
  );
}

export default SidebarLayout;
