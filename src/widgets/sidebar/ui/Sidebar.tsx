import { NavLink } from "react-router";
import { navLinks } from "../config/data";
import styles from "./Sidebar.module.css";
import logo from "/sh_logo_white.png";

// const icons = [<HomeIcon/>,<LocalLibraryIcon/>,<QuizIcon/>,<SchoolIcon/>,<PersonIcon/>,<LoginIcon/>]

export function Sidebar() {
  // const {dropdown, setDropdown} = useBooks((state)=> state
  // const toggleTheme = useTheme((state)=> state.toggleTheme)
  // const theme = useTheme((state)=> state.theme)

  // const handleTheme = ()=>{
  //     toggleTheme()
  //     setToStorage('theme', theme ? 'light' : 'dark')
  // }

  return (
    <aside className={styles.sidebar_container}>
      <div className={styles.sidebar_wrapper}>
        {/* <div className={dropdown ? styles.dropdown_active : styles.dropdown}> */}
        {/* <div className={styles.dropdown}></div>
                    {navLinks.map((link) => {
                        return <NavLink to={link.path} key={link.path} className={({isActive, isPending})=> isPending ? `${styles.nav_item} ${styles.pending}` : isActive ?  `${styles.nav_item} ${styles.active}` : styles.nav_item}>
                            {link.icon} {link.name} 
                        </NavLink>
                    })} */}
        {/* <button 
                    style={{marginTop:'10px'}}
                    className={!theme ? `${styles.theme_btn}` : `${styles.theme_btn} ${styles.theme_active}`} onClick={handleTheme}>
                        <img className={styles.theme_icon} src="/sun.png" alt="sun" />
                        <img className={styles.theme_icon} src="/moon.png" alt="moon" />
                    </button> */}
        {/* <div className={styles.x_wrap}>
                        <button className={styles.x} onClick={() => { setDropdown(false) }}>&#10006;</button>
                    </div> */}
        {/* </div> */}

        <div className={styles.sidebar_header} style={{ paddingRight: "40px" }}>
          <div className={styles.logo_wrap}>
            <img src={logo} />
            {/* <h3>StudyHub</h3> */}
          </div>
          {/* <div className={styles.dropdown_btn} onClick={() => { setDropdown(true) }}> */}
          {/* <div className={styles.dropdown_btn} onClick={() => {}}>
            &#9776; Menu
          </div> */}
        </div>
        <hr />
        <div className={styles.navigation_wrap}>
          {/* {navLinks.map((link) => {
                        const isActive = currentPage === link.path;
                        return <Link key={link.path} className={isActive ? 
                            `${styles.nav_item} ${styles.active}` : styles.nav_item}
                            href={link.path}>
                            {icons[key].logo}{link.name}
                        </Link>
                    
                    })} */}
          {navLinks.map((link) => {
            return (
              <NavLink
                to={link.path}
                key={link.path}
                className={({ isActive, isPending }) =>
                  isPending
                    ? `${styles.nav_item} ${styles.pending}`
                    : isActive
                    ? `${styles.nav_item} ${styles.active}`
                    : styles.nav_item
                }
              >
                {link.icon} {link.name}
              </NavLink>
            );
          })}
          {/* <button className={!theme ? `${styles.theme_btn}` : `${styles.theme_btn} ${styles.theme_active}`} onClick={handleTheme}>
                        <img className={styles.theme_icon} src="/sun.png" alt="sun" />
                        <img className={styles.theme_icon} src="/moon.png" alt="moon" />
                    </button> */}
        </div>
      </div>
    </aside>
  );
}
