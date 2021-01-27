import styles from "./navbar.module.css";

import AppLogo from "../../elements/AppLogo/AppLogo";
import SearchBar from "../../elements/SearchBar/SearchBar";
import LogButton from "./../../elements/LogButton/LogButton";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navdiv}>
        <AppLogo />
      </div>
      <div className={styles.navdiv}>
        <SearchBar />
        <LogButton icon="/icons/login-black.svg" alt="Login" text="Login" />
        <LogButton
          icon="/icons/signup-black.svg"
          alt="Sign Up"
          text="Sign Up"
          textStyle={{
            color: "var(--secondary)",
          }}
        />
      </div>
    </div>
  );
}
