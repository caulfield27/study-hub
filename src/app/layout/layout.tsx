import { Outlet } from "react-router";
import { MobileNavbar, Sidebar } from "./_components";

function Layout() {
  return (
    <div className="w-full min-h-screen flex">
      <div className="block max-sm:hidden">
        <Sidebar />
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
        <Outlet />
      </main>
      <div className="hidden max-sm:block">
        <MobileNavbar/>
      </div>
    </div>
  );
}

export default Layout;
