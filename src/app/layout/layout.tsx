import { LAYOUT_MODE } from "./layout.config";
import { SidebarLayout } from "./_components/sidebarLayout/SidebarLayout";
import { HeaderLayout } from "./_components/headerLayout/HeaderLayout";
import { useGlobalStore } from "@/shared/store";
import { AuthModal } from "./_components";

function Layout() {
  const authModalOpen = useGlobalStore((state) => state.authModalOpen);
  return (
    <>
      {authModalOpen && <AuthModal />}
      {LAYOUT_MODE === "header" ? <HeaderLayout /> : <SidebarLayout />}
    </>
  );
}

export default Layout;
