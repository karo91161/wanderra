import SideBar from "../components/Sidebar/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map/Map";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
