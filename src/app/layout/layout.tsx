import { Outlet, useLocation } from "react-router";
import { MobileHeader, MobileNavbar, Sidebar } from "./_components";
import { Suspense, useEffect, useRef } from "react";
import { PageLoader } from "@/shared/ui/Loader/PageLoader";
import { useGlobalStore } from "@/shared/store";
import { api } from "@/shared/api/api.handlers";

function Layout() {
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

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
        className="
          w-full 
          grow 
          max-w-full
          ml-[calc(var(--sidebar-width)+20px)] 
          px-12.5 
          py-7.5
          max-[930px]:ml-25
          max-sm:mb-16
          max-sm:ml-0
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

export default Layout;
