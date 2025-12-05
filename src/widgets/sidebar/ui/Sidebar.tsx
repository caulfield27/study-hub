import { NavLink } from "react-router";
import { navLinks } from "../config/data";
import styles from "./Sidebar.module.css";
import logo from "/sh_logo_white.png";
import { useGlobalStore } from "@/shared/store";

export function Sidebar() {
  const { isAuthed } = useGlobalStore();
  return (
    <aside className={styles.sidebar_container}>
      <div className={styles.sidebar_wrapper}>
        <div className={styles.sidebar_header} style={{ paddingRight: "40px" }}>
          <div className={styles.logo_wrap}>
            <img src={logo} />
          </div>
        </div>
        <hr />
        <div className={styles.sidebar_content}>
          <div className={styles.navigation_wrap}>
            {navLinks.map((link) => {
              return (
                <NavLink
                  to={link.path}
                  key={link.path}
                  className={({ isActive }) =>
                    isActive ? `${styles.nav_item} ${styles.active}` : styles.nav_item
                  }
                >
                  {link.icon} {link.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className={styles.user}>{!isAuthed}</div>
      </div>
    </aside>
  );
}
