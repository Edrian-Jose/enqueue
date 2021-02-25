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
  let [user, setUser] = useState(null);
  const Nav = () => {
    if (user && user.name) {
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
    const redirects = {
      customer: "/",
      provider: "/dashboard",
      provider2: "/register2",
      provider3: "/register3",
    };
    const customerNotAllowedPaths = ["/dashboard", "/register2"];
    const providerNotAllowedPaths = ["/search", "/"];
    const provider2NotAllowedPaths = ["/register2"];
    const provider3NotAllowedPaths = ["/register3"];
    const providerIncNotAllowedPaths = ["/dashboard"];
    const NotAllowedPaths = ["/login", "/register"];
    const NoAuthNotAllowedPaths = ["/settings", "/dashboard", "/register2"];
    if (auth) {
      const userData = jwt_decode(auth);
      setUser(userData);
      globals.methods.setUser(userData);
      const path = router.pathname;
      const conditions = [
        userData.type == "customer" && customerNotAllowedPaths.includes(path),
        userData.type == "provider" && providerNotAllowedPaths.includes(path),
        userData.type == "provider" &&
          userData.completed != 2 &&
          providerIncNotAllowedPaths.includes(path),
        userData.type == "provider" &&
          userData.completed > 0 &&
          provider2NotAllowedPaths.includes(path),
        userData.type == "provider" &&
          userData.completed > 1 &&
          provider3NotAllowedPaths.includes(path),
        NotAllowedPaths.includes(path),
      ];

      if (conditions.includes(true)) {
        if (history.length > 2) {
          router.back();
        } else {
          if (userData.type == "provider" && userData.completed == 0) {
            router.replace(redirects["provider2"]);
          } else if (userData.type == "provider" && userData.completed == 1) {
            router.replace(redirects["provider3"]);
          } else {
            router.replace(redirects[userData.type]);
          }
        }
      }
    } else {
      const path = router.pathname;
      if (NoAuthNotAllowedPaths.includes(path)) {
        if (history.length > 2) {
          router.back();
        } else {
          router.replace("/");
        }
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
