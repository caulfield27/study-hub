import { Outlet, useLocation } from "react-router";
import { Suspense, useEffect, useRef } from "react";
import { PageLoader } from "@/shared/ui/Loader/PageLoader";
import { useGlobalStore } from "@/shared/store";
import { api } from "@/shared/api/api.handlers";
import { MobileHeader, MobileNavbar } from "../";
import { Header } from "../header";

export function HeaderLayout() {
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
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="hidden max-sm:block">
        <MobileHeader />
      </div>
      <main
        ref={mainRef}
        className="
          w-full
          grow
          max-w-full
          p-7.5
          max-sm:mb-16
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

export default HeaderLayout;
