import styles from "./navbar.module.css";
import Link from "next/link";
import AppLogo from "../../elements/AppLogo/AppLogo";
import DefaultNav from "./DefaultNav";
import LoginNav from "./LoginNav";
import RegisterNav from "./RegisterNav";
import { useRouter } from "next/router";
import UserNav from "./UserNav";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/state";

export default function Navbar(props) {
  const router = useRouter();
  const globals = useAppContext();
  let [user, setUser] = useState("");
  const Nav = () => {
    if (user.name) {
      return <UserNav user={user} />;
    } else if (router.pathname == "/login") {
      return <LoginNav />;
    } else if (router.pathname == "/register") {
      return <RegisterNav />;
    } else {
      return <DefaultNav />;
    }
  };
  useEffect(function () {
    const auth = localStorage.getItem("auth");

    const customerNotAllowedPaths = ["/dashboard", "/register2"];
    const providerNotAllowedPaths = ["/search", "/"];
    const provider2NotAllowedPaths = ["/register2"];
    const NotAllowedPaths = ["/login", "/register"];
    if (auth) {
      const userData = jwt_decode(auth);
      setUser(userData);
      globals.sharedState.setUser(userData);
      const path = router.pathname;
      console.log(path);
      const conditions = [
        userData.type == "customer" && customerNotAllowedPaths.includes(path),
        userData.type == "provider" && providerNotAllowedPaths.includes(path),
        userData.type == "provider" &&
          userData.completed &&
          provider2NotAllowedPaths.includes(path),
        NotAllowedPaths.includes(path),
      ];

      if (conditions.includes(true)) {
        router.back();
      }
    }
  }, []);
  return (
    <div className={styles.navbar}>
      <div className={styles.navdiv}>
        <Link href="/">
          <a>
            <AppLogo />
          </a>
        </Link>
      </div>
      <div className={styles.navdiv}>
        <Nav />
      </div>
    </div>
  );
}
