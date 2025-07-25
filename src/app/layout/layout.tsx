import { Outlet } from "react-router";
import { Sidebar } from "../../widgets/sidebar";
import styles from "./layout.module.css";
import Snackbar from "@mui/material/Snackbar";
import { useGlobalStore } from "../../shared/store/global.store";

function Layout() {
  const { snackbar, closeSnackbar } = useGlobalStore();
  return (
    <>
      <div className={styles.app_container}>
        <Sidebar />
        <main className={styles.pages_container}>
          <Outlet />
        </main>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbar.isOpen}
        onClose={closeSnackbar}
        message={snackbar.message}
        autoHideDuration={5000}
        key={"top-right"}
        ContentProps={{
          sx: {
            backgroundColor: snackbar.type === "success" ? "#06923E" : "#DC3C22",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default Layout;
