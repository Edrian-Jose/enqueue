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

export default function Navbar(props) {
  const router = useRouter();
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
    if (auth) {
      setUser(jwt_decode(auth));
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
