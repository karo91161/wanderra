import styles from "./Sidebar.module.css";
import Logo from "./common/Logo";
import AppNav from "./AppNav";
import Footer from "./common/Footer";

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <Footer />
    </div>
  );
}

export default SideBar;
