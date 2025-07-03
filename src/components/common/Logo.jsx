import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className={styles.logoLink}>
      <img src="/icon.png" alt="Wanderra logo" className={styles.logo} />
      <span className={styles.logoText}>Wanderra</span>
    </Link>
  );
}

export default Logo;
