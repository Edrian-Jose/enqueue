import React from "react";
import styles from "./AppLogo.module.scss";
export default function AppLogo() {
  return (
    <React.Fragment>
      <img src="/favicon.svg" alt="App Logo" className={styles.appLogoStyle} />
      <span className={styles.appNameStyle}>EnQueue</span>
    </React.Fragment>
  );
}
