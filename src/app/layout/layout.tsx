import { Outlet } from "react-router";
import { MobileHeader, MobileNavbar, Sidebar } from "./_components";
import { Suspense, useEffect } from "react";
import { PageLoader } from "@/shared/ui/Loader/PageLoader";
import { useGlobalStore } from "@/shared/store";
import { api } from "@/shared/api/api.handlers";

function Layout() {
  const isAuthed = useGlobalStore((state) => state.isAuthed);

  useEffect(() => {
    if (isAuthed) {
      api.getMe();
    }
  }, [isAuthed]);

  return (
    <div className="w-full min-h-screen flex max-sm:flex-col">
      <div className="block max-sm:hidden">
        <Sidebar />
      </div>
      <div className="hidden max-sm:block">
        <MobileHeader />
      </div>
      <main
        className="
          w-full 
          grow 
          ml-[calc(var(--sidebar-width)+20px)] 
          px-[50px] 
          py-[30px]
          max-[930px]:ml-[100px]
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
