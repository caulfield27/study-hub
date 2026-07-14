import { LAYOUT_MODE } from "./layout.config";
import { SidebarLayout } from "./_components/sidebarLayout/SidebarLayout";
import { HeaderLayout } from "./_components/headerLayout/HeaderLayout";

function Layout() {
  return LAYOUT_MODE === "header" ? <HeaderLayout /> : <SidebarLayout />;
}

export default Layout;
