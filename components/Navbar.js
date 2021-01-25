import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navdiv}>
        <img src="/favicon.svg" alt="App Logo" className={styles.appLogo} />
        <span className={styles.appName}>EnQueue</span>
      </div>
      <div className={styles.navdiv}>
        <span className={styles.searchContainer}>
          <img
            src="/icons/search-black.svg"
            alt="Search Icon"
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="Search Services"
            className={styles.searchBar}
          />
        </span>
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
