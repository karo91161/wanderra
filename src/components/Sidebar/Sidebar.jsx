import styles from "./Sidebar.module.css";
import Logo from "../common/Logo";
import AppNav from "../AppNav/AppNav";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default SideBar;
