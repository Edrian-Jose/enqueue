import styles from "./navbar.module.css";

import AppLogo from "../../elements/AppLogo/AppLogo";
import SearchBar from "../../elements/SearchBar/SearchBar";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navdiv}>
        <AppLogo />
      </div>
      <div className={styles.navdiv}>
        <SearchBar />
        <a href="#">
          <span className={styles.signAction}>
            <img src="/icons/login-black.svg" alt="Login" />
            <span>Log In</span>
          </span>
        </a>
        <a href="#">
          <span className={styles.signAction}>
            <img src="/icons/signup-black.svg" alt="Sign Up" />
            <span>Sign Up</span>
          </span>
        </a>
      </div>
    </div>
  );
}
