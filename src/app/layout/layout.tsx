import { Outlet } from "react-router";
import { Sidebar } from "../../widgets/sidebar";
import styles from "./layout.module.css";

function Layout() {
  return (
    <div className={styles.app_container}>
      <Sidebar />
      <main className={styles.pages_container}><Outlet/></main>
    </div>
  );
}

export default Layout;
